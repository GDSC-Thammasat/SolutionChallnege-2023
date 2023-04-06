import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBodyPart } from '../store/store';

import neckache from '../assets/images/neckache1.jpeg';
import backache from '../assets/images/backache1.jpeg';
import wristache from '../assets/images/wristache1.jpeg';

import '../style/page.css'
import '../style/button.css'

function QuestionBodypart() {

    const dispatch = useDispatch();

    const handleBodyPartClick = (e) => {
        const selectedValue = e.currentTarget.getAttribute('value');
        dispatch(setBodyPart(selectedValue));
    };

  return (
      <div className="bodypart-question">
      <section className="bodypart-question">
        <h2 className='bodypart-which'>Which part of your body are you experiencing pain?</h2>
        <div className="bodypart-choices">

            <Link to="/QuestionDiagnose">
                <label className="bodypart" onClick={handleBodyPartClick} value="neck" name="bodypart">        
                <span className='bodypart-text'>Neck</span>
                    <span className="bodypart-image" >
                        <img className="bodypart-image" src={neckache} alt="" height={400} />
                    </span>
                </label>
            </Link>

            <Link to="/QuestionDiagnose">
                <label className="bodypart" onClick={handleBodyPartClick} value="back" name="bodypart">    
                    <span className='bodypart-text'>Back</span>
                    <span className="bodypart-image" >
                        <img className="bodypart-image" src={backache} alt="" height={400} />
                    </span> 
                </label>
            </Link>

            <Link to="/QuestionDiagnose">
                <label className="bodypart" onClick={handleBodyPartClick} value="arm" name="bodypart">
                    <span className='bodypart-text'>Arm</span>
                    <span className="bodypart-image" >
                        <img className="bodypart-image" src={wristache} alt="" height={400} />
                    </span>   
                </label>
            </Link>

        </div>
      </section>
      </div>
  );
}

export default QuestionBodypart;
