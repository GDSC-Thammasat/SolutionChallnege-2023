import React, { useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { setStretchScore } from "../store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Classifier} from './MovenetComponent';

import '../style/page.css'

// neck
import downfacepress from '../assets/images/exerciselist/downfacepress.png';
import neckpull_left from '../assets/images/exerciselist/neckpull_left.png';
import neckpull_right from '../assets/images/exerciselist/neckpull_right.png';

// back
import spreadarms from '../assets/images/exerciselist/spreadarms.png';
import armcross_left from '../assets/images/exerciselist/armcross_left.png';
import armcross_right from '../assets/images/exerciselist/armcross_right.png';

// arm
import pullfinger_left from '../assets/images/exerciselist/pullfinger_left.png';
import pullfinger_right from '../assets/images/exerciselist/pullfinger_right.png';
import handabove_left from '../assets/images/exerciselist/handabove_left.png';
import handabove_right from '../assets/images/exerciselist/handabove_right.png';

// Database
const PoseList ={
  'neck' : [2, 2, 2],
  'back' : [9, 0, 1],
  'arm' : [7, 8, 3, 4],
}
const PoseStep = {
  // neck
  2 : 'Back Neck Stretch', 
  5 : 'Left Side Neck Stretch', 
  6 : 'Right Side Neck Stretch', 

  // back
  9 : 'Arm Spread', 
  0 : 'Left Shoulder Adductor Stretch', 
  1 : 'Right Shoulder Adductor Stretch', 

  // arm
  7 : 'Left Forearm Stretch', 
  8 : 'Right Forearm Stretch', 
  3 : 'Left Side Over Head Arm Stretch', 
  4 : 'Right Side Over Head Arm Stretch', 
}
const PoseImg = {
  // neck
  2 : downfacepress,
  5 : neckpull_left,
  6 : neckpull_right,

  // back
  9 : spreadarms,
  0 : armcross_left,
  1 : armcross_right,

  // arm
  7 : pullfinger_left,
  8 : pullfinger_right,
  3 : handabove_left,
  4 : handabove_right
}

const angle_pose = [0,1];


//Initialization
var status = 'Processing...';
var processing = true;
var pose_step = 0;
var posename;
var pose_img; 
var step_pose_lenght; 
var count_check = false;
var count = 0;
var result_log = [];
var idx =0 ;
var color = 'red';
var pose_number_ = 1;
const confident = 0.2;

function Steppose(pose_list) {
  posename = PoseStep[pose_list[pose_step]];
  pose_img = PoseImg[pose_list[pose_step]];
  step_pose_lenght = pose_list.length; 
  const pose_value = Classifier(color, pose_step);
  if (step_pose_lenght  === pose_step){
    processing = false;
    status = 'Finished ! ';
    posename = 'Finished !'
  }else{ 
    if (!count_check && pose_value[0][pose_step] > confident){
        result_log.push([pose_step, []]);
        count_check = true;
        color = 'blue';
      }
    if (count_check){
      count = count +1;
      status = 'Hold on '+ (10-count).toString() + ' seconds'; 
      result_log[idx][1].push(pose_value);
    }else{
      status = 'Processing';
    }
    if(count === 10){
      idx = idx + 1;
      count_check = false;
      count = 0;
      status = 'OK NEXT !';
      pose_step = pose_step + 1;
      pose_number_ = pose_number_ + 1
      color = 'red';
    }
  }
  return status;
}

function confident_score(confident){
  let greater_than_09 = 0;
  let confident_level = 0.9;
  for(let i =0; i< confident.length; i++){
    if(confident[i]> confident_level){
      greater_than_09 = greater_than_09 + 1;
    }
  }
  if(greater_than_09 > 5){
    return 50;
  }else if (greater_than_09 > 2 && greater_than_09 < 5){
    return 40;
  }else{
    return 30;
  }
}

var final_score = 0;;
var final_confident =0;
var check_score=true;
function scoring(log){
  let score =[];
  let con_score = [];
  let avg_final=0;
  for(let i =0; i< log.length; i++){
    let score_sum = 0;
    let con_sum =0;
    let con_avg=0;
    let score_avg=0;
    if(log[i][0] in angle_pose){
      for(let j=0; j< 10; j++){
        score_sum = score_sum + log[i][1][j][1] + log[i][1][j][2];
        con_sum = con_sum + log[i][1][j][0][0];
      }
      score_avg = score_sum/20;
      score.push(score_avg);
      con_avg = con_sum/10;
      con_score.push(con_avg);
    }else{
      for(let j=0; j< 10; j++){
        con_sum = con_sum + log[i][1][j][0][0];
      }
      score.push(0);
      con_avg = con_sum/10;
      con_score.push(con_avg);
    }
    avg_final = avg_final + score[i];
  }
  final_confident = confident_score(con_score);
  final_score = avg_final/log.length;

  check_score = false;
  return 1;
}

function Exclassifier(props) {

  const dispatch = useDispatch();

  const sendStretchScore = () => {
    dispatch(setStretchScore(final_score));
    console.log(dispatch(final_score))
  };
  const bodyPart = useSelector(state => state.bodyPart);
  const pose_list = PoseList[bodyPart];
  const [ status_, setStatus] = useState("Start");
  const [ img, setImg] = useState(PoseImg[pose_list[0]]);
  const [ posenumber, setPosenumber] = useState(pose_number_);
  const navigate = useNavigate();

  const changeFrame = () => {
    if (processing){
      setStatus(Steppose(pose_list));
      setImg(pose_img);
      
      setPosenumber(pose_number_);
    }else{
      if (check_score){
        scoring(result_log);
        console.log(final_score);
        console.log(final_confident);
        sendStretchScore();
      }
      navigate('/Summary');
    }
  }

  // const pose_number = 1;

  useEffect(() => {
    const interval = setInterval(changeFrame, 1000);
    return () => clearInterval(interval);
    // pose_number ++;
  }, []);

  return (
    <div className="exclassifier">
      <div className="exercise-picture">
        <span className="exercise-image" style={{height:"100px"}}>
        <img className="exercise-image" src={img} alt="" width={300}/>
        </span>
      </div>
      <div className="exercise-status">
        <p className="card-excerpt">{posenumber} of {pose_list.length}</p>
          <p className='card-title'>Pose name: {posename} </p>
          <p className="card-excerpt"> Status: {status_}</p>
      </div>
    </div>
  );
}
export default Exclassifier;

