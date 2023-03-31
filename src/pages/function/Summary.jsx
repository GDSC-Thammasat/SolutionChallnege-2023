import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressTab from '../../component/ProgressTab';

import '../../style/page.css'
import '../../style/button.css'

function Summary() {

    const [studentId, setStudentId] = useState('');
    const [feedbackScore, setFeedbackScore] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const diagnoseScore = useSelector(state => state.diagnoseScore);
    const stretchScore = useSelector(state => state.stretchScore);

    const full_score = diagnoseScore + stretchScore

    let risk;

    if (full_score < 40) {
        risk = "Low";
    } else if (full_score < 70) {
        risk = "Medium";
    } else {
        risk = "High";
    }

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    }

    const handleFeedbackScoreChange = (event) => {
        setFeedbackScore(parseInt(event.target.value));
    }

    const handleFeedbackTextChange = (event) => {
        setFeedbackText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Save to the backend  Redux
        console.log("Student ID: ", studentId);
        console.log("Feedback Score: ", feedbackScore);
        console.log("Feedback Text: ", feedbackText);
    }

    const isFeedbackScoreValid = feedbackScore !== 0;

    return (
            <body>
                <ProgressTab/>
                <section className="function">
                    
                <h1>Recommendation</h1>
                    <section id="recommendation">
                        <div className="summary">
                            <p className="summary">From your exercise: You have {risk} level risk of Office Syndrome</p>
                        </div>
                        <div>
                            <p className="recommend">This our Recommendation.</p>
                            <p>
                                1. Office workers are advised to relieve muscle tension every 30 minutes, without interrupting the train of thought by setting an interval-timer and placing it across the room.  Then they must get up and can stretch while they walk to turn off the buzzer and reset the timer.
                            </p>
                            <p>
                                2. Exercise is the most important therapy.  Multiple modalities of exercise should be considered, including:
                                <ol>
                                    <li> Strength exercises:  Strengthening muscles can reduce the likelihood of them developing trigger points in the future.  Strengthening exercises includes high load, and low repetition of different groups of muscles.</li>
                                    <li> Endurance exercise: includes aerobic training such as running, swimming or biking, which strengthens both the cardiovascular system and multiple muscle groups.  A regular exercise program minimizes the chance of reactivating trigger points.</li>
                                    <li> Relaxation exercises: such as contract-relax and yoga can help decrease mental stress and relax the body.</li>
                                </ol>
                            </p>
                        </div>
                        </section>
                <section className="feedback" id="student-id">
                <label className="feedback"id="student-id">Please Fill the Student ID</label>
                    <input 
                        className="feedback"
                        id="student-id" 
                        placeholder="ex 6123456789" 
                        value={studentId} 
                        onChange={handleStudentIdChange}
                    />
                </section>

                <section className="feedback" id="feedback-score">
                    <ul className="feedback" id="feedback-score">
                        <label className="feedback" id="feedback-score">Please Rate your Satisfaction*</label>
                        <li><input type="radio" onChange={handleFeedbackScoreChange} value="0" /> 1</li>
                        <li><input type="radio" onChange={handleFeedbackScoreChange} value="1" /> 2</li>
                        <li><input type="radio" onChange={handleFeedbackScoreChange} value="2" /> 3</li>
                        <li><input type="radio" onChange={handleFeedbackScoreChange} value="3" /> 4</li>
                        <li><input type="radio" onChange={handleFeedbackScoreChange} value="4" /> 5</li>
                    </ul>
                </section>

                <section className="feedback" id="feedback-text">
                <label className="feedback" id="feedback-text">Feedback</label>
                    <input 
                        className="feedback"
                        id="feedback-text" 
                        placeholder="(Optional)" 
                        value={feedbackText} 
                        onChange={handleFeedbackTextChange}
                    />
                </section>

                <div>
                <Link to="/">
                    <button class="button-pushable" i="next" disabled={!isFeedbackScoreValid} onClick={handleSubmit} >
                        <span class="button-shadow"></span>
                        <span class="button-edge"></span>
                        <span class="button-front textd">
                            Finish!
                        </span>
                    </button>
                </Link>
                </div>
                </section>
            </body>
    )
    }
export default Summary