import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressTab from '../../component/ProgressTab';

import '../../style/page.css'
import '../../style/button.css'

// neck
import downfacepress from '../../assets/images/exerciselist/downfacepress.png';
import neckpull_left from '../../assets/images/exerciselist/neckpull_left.png';
import neckpull_right from '../../assets/images/exerciselist/neckpull_right.png';

// back
import spreadarms from '../../assets/images/exerciselist/spreadarms.png';
import armcross_left from '../../assets/images/exerciselist/armcross_left.png';
import armcross_right from '../../assets/images/exerciselist/armcross_right.png';

// arm
import pullfinger_left from '../../assets/images/exerciselist/pullfinger_left.png';
import pullfinger_right from '../../assets/images/exerciselist/pullfinger_right.png';
import handabove_left from '../../assets/images/exerciselist/handabove_left.png';
import handabove_right from '../../assets/images/exerciselist/handabove_right.png';

function ExerciseList() {
  const bodyPart = useSelector(state => state.bodyPart);

  const exercises = {
    neck: [
      { name: 'Back Neck Stretch', duration: '15-30 Seconds' ,img: downfacepress},
      { name: 'Left Side Neck Stretch', duration: '15-30 Seconds' ,img: neckpull_left},
      { name: 'Right Side Neck Stretch', duration: '15-30 Seconds' ,img: neckpull_right},
    ],
    back: [
      { name: 'Arm Spread', duration: '15-30 Seconds' ,img: spreadarms},
      { name: 'Left Shoulder Adductor Stretch', duration: '15-30 Seconds' ,img: armcross_left},
      { name: 'Right Shoulder Adductor Stretch', duration: '15-30 Seconds' ,img: armcross_right},
    ],
    arm: [
      { name: 'Left Forearm Stretch', duration: '15-30 Seconds' ,img: pullfinger_left},
      { name: 'Right Forearm Stretch', duration: '15-30 Seconds' ,img: pullfinger_right},
      { name: 'Left Side Over Head Arm Stretch', duration: '15-30 Seconds' ,img: handabove_left},
      { name: 'Right Side Over Head Arm Stretch', duration: '15-30 Seconds' ,img: handabove_right},
    ],
  };

  const muscles = {
    neck: [{muscle: 'Neck & Shoulder'}],
    back: [{muscle: 'Back'}],
    arm: [{muscle: 'Arm & Wrist'}]
  }

  const exerciseList = exercises[bodyPart];
  const musclesList = muscles[bodyPart];

  return (
    <body className="exercise">
      <ProgressTab/>
      <section className="function">
        <section className='exercise'>
          {musclesList.map((muscle, index) => (
          <h3 key = {index}> These are Exercises for {muscle.muscle}
          </h3>
          ))}

          <div className='article-container'>
          
            {exerciseList.map((exercise, index) => (
              <article className='article-card'>
                <figure className="exercise-image" key={index}>
                  <img src={exercise.img}  alt="" style={{ height: "200px" }}/> 
                </figure>
                <p className="exercise-name">{exercise.name}</p>
                <p className="exercise-duration">{exercise.duration}</p>
                </article>
          ))}
          </div>
        </section>

      <div>
        <Link to="/QuestionDiagnose">
                  {/* <button className='back'>Back</button> */}
                  <button class="button-pushable" id="back">
                      <span class="button-shadow"></span>
                      <span class="button-edge"></span>
                      <span class="button-front text">
                      Back
                      </span>
                  </button>
                  </Link>
          <Link to="/DoExercise">
          {/* <button>Next</button> */}
          <button class="button-pushable" id="next">
              <span class="button-shadow"></span>
              <span class="button-edge"></span>
              <span class="button-front text">
              Next
              </span>
          </button>
        </Link>
      </div>
      </section>
    </body>
  );
}

export default ExerciseList;