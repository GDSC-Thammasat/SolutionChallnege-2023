import React, { useRef , useState, useEffect} from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { Link } from 'react-router-dom';

import '../style/page.css'

var outputArray;
export function prediction(inputArray) {
  const runmodel = async () => {
    const model = await tf.loadLayersModel('http://localhost:3000/models/model.json');
    classify(model, inputArray);
  };
  const classify = async (model, inputArray) => {
    const outputData = await model.predict(inputArray);
    outputArray = Array.from(outputData.dataSync());
  };
  runmodel();
  return outputArray;
}

const POINTS = {
  NOSE : 0,
  LEFT_EYE : 1,
  RIGHT_EYE : 2,
  LEFT_EAR : 3,
  RIGHT_EAR : 4,
  LEFT_SHOULDER : 5,
  RIGHT_SHOULDER : 6,
  LEFT_ELBOW : 7,
  RIGHT_ELBOW : 8,
  LEFT_WRIST : 9,
  RIGHT_WRIST : 10,
  LEFT_HIP : 11,
  RIGHT_HIP : 12,
  LEFT_KNEE : 13,
  RIGHT_KNEE : 14,
  LEFT_ANKLE : 15,
  RIGHT_ANKLE : 16,
}

//Embedding Layer
function get_center_point(landmarks, left_bodypart, right_bodypart) {
  let left = tf.gather(landmarks, left_bodypart, 1)
  let right = tf.gather(landmarks, right_bodypart, 1)
  const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
  return center
  
}

function get_pose_size(landmarks, torso_size_multiplier=2.5) {
  let hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
  let shoulders_center = get_center_point(landmarks,POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
  let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
  let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
  pose_center_new = tf.expandDims(pose_center_new, 1)

  pose_center_new = tf.broadcastTo(pose_center_new,
      [1, 17, 2]
    )
    // return: shape(17,2)
  let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
  let max_dist = tf.max(tf.norm(d,'euclidean', 0))

  // normalize scale
  let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
  return pose_size
}

function normalize_pose_landmarks(landmarks) {
  let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
  pose_center = tf.expandDims(pose_center, 1)
  pose_center = tf.broadcastTo(pose_center, 
      [1, 17, 2]
    )
  landmarks = tf.sub(landmarks, pose_center)

  let pose_size = get_pose_size(landmarks)
  landmarks = tf.div(landmarks, pose_size)
  return landmarks
}

function landmarks_to_embedding(landmarks) {
  // normalize landmarks 2D
  landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0))
  let embedding = tf.reshape(landmarks, [1,34])
  return embedding
}

function calculateAngle(a, b, c) {
  a = Array.from(a); // First
  b = Array.from(b); // Mid
  c = Array.from(c); // End

  const radians = Math.atan2(c[1]-b[1], c[0]-b[0]) - Math.atan2(a[1]-b[1], a[0]-b[0]);
  let angle = Math.abs(radians*180.0/Math.PI);
  //Converting PI --> Degree
  if (angle > 180.0) {
    angle = 360-angle;
  }
  return angle;
}

function score_neck(angle){
    if(angle > 90){
      angle = 180 - angle;
    }
    if (angle < 70){
      return 50;
    }else if(angle > 70 && angle < 75){
      return 40;
    }else{
      return 30;
    }
}
function score_arm(angle){
  if (angle < 165){
    return 50;
  }else if(angle > 171 && angle < 165){
    return 40;
  }else{
    return 30;
  }
}


var color;
var pose_idx;
export  function Classifier(color_, pose_idx) {
  color = color_;
  var point_pose = pose['keypoints'];
  var input_model = [];
  for(let j=0; j< 17; j++){
    let i = j.toString();
    input_model.push([point_pose[i]['position']['x'], point_pose[i]['position']['y']]);
  }
  const processedInput = landmarks_to_embedding(input_model)
  const predictresult = prediction(processedInput);

  if(pose_idx == 0){
    const middle_sholder_x = (point_pose['5']['position']['x'] + point_pose['6']['position']['x'])/2
    const middle_sholder_y = (point_pose['5']['position']['y'] + point_pose['6']['position']['y'])/2
    const left_shoulder = [point_pose['5']['position']['x'], point_pose['5']['position']['y']];
    const right_shoulder = [point_pose['6']['position']['x'], point_pose['6']['position']['y']];
    const nose = [point_pose['0']['position']['x'], point_pose['0']['position']['y']];
    const angle_left = calculateAngle(left_shoulder, [middle_sholder_x, middle_sholder_y], nose);
    const angle_right = calculateAngle(right_shoulder, [middle_sholder_x, middle_sholder_y], nose);

    return [predictresult, score_neck(angle_left), score_neck(angle_right)];

  }else if(pose_idx == 1){
    const elbow_left = [point_pose['7']['position']['x'], point_pose['7']['position']['y']];
    const shoulder_left = [point_pose['5']['position']['x'], point_pose['5']['position']['y']];
    const hip_left = [point_pose['15']['position']['x'], point_pose['15']['position']['y']];

    const elbow_right = [point_pose['8']['position']['x'], point_pose['8']['position']['y']];
    const shoulder_right = [point_pose['6']['position']['x'], point_pose['6']['position']['y']];
    const hip_right = [point_pose['12']['position']['x'], point_pose['12']['position']['y']];

    const angle_left = calculateAngle(elbow_left, shoulder_left, hip_left);
    const angle_right = calculateAngle(elbow_right, shoulder_right, hip_right);

    return [predictresult, score_arm(angle_left), score_arm(angle_right)];
  }else{
    return [predictresult];
  }
}

var pose;
var confident;
const lineWidth = 3;
function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draw pose keypoints onto a canvas
 */
function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

function toTuple({ y, x }) {
  return [y, x];
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}
var confident = 0.3;
const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
  const ctx = canvas.current.getContext("2d");
  canvas.current.width = videoWidth;
  canvas.current.height = videoHeight;

  drawKeypoints(pose["keypoints"], confident, ctx);
  drawSkeleton(pose["keypoints"], confident, ctx);
};

function MovenetComponent() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runPosenet = async () => {
    const net = await posenet.load();
    //
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      pose = await net.estimateSinglePose(video);
      //console.log(pose)
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
    
  };
  runPosenet();

  return (
    <div className="camera">
        <Webcam
          mirrored={true}
          ref={webcamRef}
          style={{
            position: "fixed",
            zindex:9,
            marginLeft: "auto",
            marginRight: "auto",
            float: "right",
            right: "5%",
            borderRadius: "8px",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            position: "fixed",
            float: "right",
            right: "5%",
            transform: "scaleX(-1)",
          }}
        />
    </div>
  );
}

export default MovenetComponent