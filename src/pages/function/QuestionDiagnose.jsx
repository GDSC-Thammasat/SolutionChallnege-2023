import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setDiagnoseScore } from "../../store/store";
import { useDispatch } from "react-redux";
import ProgressTab from '../../component/ProgressTab';

import '../../style/page.css'
import '../../style/button.css'

function QuestionDiagnose() {
  const [answers, setAnswers] = useState({});
  const [canAnswerTwo, setCanAnswerTwo] = useState(false);
  const [canAnswerThree, setCanAnswerThree] = useState(false);
  const [canAnswerFour, setCanAnswerFour] = useState(false);
  const [canAnswerFive, setCanAnswerFive] = useState(false);
  const [sumOfAnswers, setSumOfAnswers] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // Compute the sum of all answers
    let sum = 0;
    for (let answer of Object.values(answers)) {
      sum += parseInt(answer);
    }
    setSumOfAnswers(sum * 2.5);
  }, [answers]);

  const handleAnswer = (questionNumber, answer, value) => {
    if (questionNumber === 3) {
      answer = answer / 2.5;
    }

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: answer,
    }));
    if (questionNumber === 1) {
      setCanAnswerTwo(true);
    } else if (questionNumber === 2) {
      setCanAnswerThree(true);
    } else if (questionNumber === 3) {
      setCanAnswerFour(true);
    } else if (questionNumber === 4) {
      setCanAnswerFive(true);
    }
  };

  const allAnswered = () => {
    return Object.keys(answers).length === 5;
  };

  const handleNextClick = () => {
    dispatch(setDiagnoseScore(sumOfAnswers));
    console.log(dispatch(sumOfAnswers))
    // navigate to the next page
  };

  return (
    <body>
      <ProgressTab/>
      <section className="function">
      <h1 className="header">Diagnose Form</h1>
        <section class="question" id="diagnose">
          <form action="">
            <div className="question" id="diagnose-1">
              <ul>
                <label for="q1" className="question"> 1. How long do you do the same activities or work?</label> <br />
                  <li><input type="radio" onClick={() => {handleAnswer(1, "0"); window.location.href='#diagnose-2';}} value="0" name="q1"/> Less Than 30 Minutes</li>
                  <li><input type="radio" onClick={() => {handleAnswer(1, "1"); window.location.href='#diagnose-2';}} value="1" name="q1"/> 30 Minutes - 1 Hour</li>
                  <li><input type="radio" onClick={() => {handleAnswer(1, "2"); window.location.href='#diagnose-2';}} value="2" name="q1"/> 1 Hours - 2 Hours</li>
                  <li><input type="radio" onClick={() => {handleAnswer(1, "3"); window.location.href='#diagnose-2';}} value="3" name="q1"/> 2 Hours - 3 Hours</li>
                  <li><input type="radio" onClick={() => {handleAnswer(1, "4"); window.location.href='#diagnose-2';}} value="4" name="q1"/> More Than 3 Hours</li>
                </ul>
            </div>

            <div className="question" id="diagnose-2">
              <ul>
              <label for="q2" className="question">2. How much rest do you get each day(Hrs.) </label> <br />

                <li><input type="radio" onClick={() => {handleAnswer(2, "0"); window.location.href='#diagnose-3';}}
                disabled={!canAnswerTwo} value="1" name="q2"/> Less Than 4 Hours</li>

                <li><input type="radio" onClick={() => {handleAnswer(2, "1"); window.location.href='#diagnose-3';}}
                disabled={!canAnswerTwo} value="1" name="q2"/> 4 - 5 Hours</li>

                <li><input type="radio" onClick={() => {handleAnswer(2, "2"); window.location.href='#diagnose-3';}}
                disabled={!canAnswerTwo} value="2" name="q2"/> 5 - 6 Hours</li>

                <li><input type="radio" onClick={() => {handleAnswer(2, "3"); window.location.href='#diagnose-3';}} 
                disabled={!canAnswerTwo} value="3" name="q2"/> 6 - 7 Hours</li>

                <li><input type="radio" onClick={() => {handleAnswer(2, "4"); window.location.href='#diagnose-3';}} 
                disabled={!canAnswerTwo} value="4" name="q2"/> More Than 7 Hours</li>

                </ul>
            </div>

            <div className="question" id="diagnose-3">
              <ul>
            <label for="q3" className="question">3. Pain score (Range 1-10) </label> <br />
            <select name="edu" id="" onChange={(e) => handleAnswer(3, e.target.value)}>
              <option disabled={!canAnswerThree} value="0">0</option>
              <option disabled={!canAnswerThree} value="1">1</option>
              <option disabled={!canAnswerThree} value="2">2</option>
              <option disabled={!canAnswerThree} value="3">3</option>
              <option disabled={!canAnswerThree} value="4">4</option>
              <option disabled={!canAnswerThree} value="5">5</option>
              <option disabled={!canAnswerThree} value="6">6</option>
              <option disabled={!canAnswerThree} value="7">7</option>
              <option disabled={!canAnswerThree} value="8">8</option>
              <option disabled={!canAnswerThree} value="9">9</option>
              <option disabled={!canAnswerThree} value="10">10</option>
            </select>
            </ul>
            </div>
            
            <div className="question" id="diagnose-4">
              <ul>
              <label for="q4" className="question">4. How long have you had pain? </label> <br />

              <li><input type="radio" onClick={() => {handleAnswer(4, "0"); window.location.href='#diagnose-5';}} 
              disabled={!canAnswerFour} value="0" name="q4"/> I have no pain.</li>

              <li><input type="radio" onClick={() => {handleAnswer(4, "1"); window.location.href='#diagnose-5';}} 
              disabled={!canAnswerFour} value="1" name="q4"/> Less Than 1 Month</li>

              <li><input type="radio" onClick={() => {handleAnswer(4, "2"); window.location.href='#diagnose-5';}} 
              disabled={!canAnswerFour} value="2" name="q4"/> 1 Month - 3 Months</li>

              <li><input type="radio" onClick={() => {handleAnswer(4, "3"); window.location.href='#diagnose-5';}} 
              disabled={!canAnswerFour} value="3" name="q4"/> 3 Months - 6 Months</li>

              <li><input type="radio" onClick={() => {handleAnswer(4, "4"); window.location.href='#diagnose-5';}} 
              disabled={!canAnswerFour} value="4" name="q4"/> More Than 6 Months</li>
              </ul>
            </div>

            <div className="question" id="diagnose-5">
              <ul>
              <label for="q5" className="question">5. How long will it take to rest for the pain to go away? </label> <br />

              <li><input type="radio" onClick={() => handleAnswer(5, "0")} 
              disabled={!canAnswerFive} value="0" name="q5"/> I have no pain.</li>

              <li><input type="radio" onClick={() => handleAnswer(5, "1")} 
              disabled={!canAnswerFive} value="1" name="q5"/> Less Than 30 Minutes</li>

              <li><input type="radio" onClick={() => handleAnswer(5, "2")} 
              disabled={!canAnswerFive} value="2" name="q5"/> 30 Minutes - 1 Hours</li>

              <li><input type="radio" onClick={() => handleAnswer(5, "3")} 
              disabled={!canAnswerFive} value="3" name="q5"/> 1 Hours - 3 Hours</li>

              <li><input type="radio" onClick={() => handleAnswer(5, "4")} 
              disabled={!canAnswerFive} value="4" name="q5"/> More Than 3 Hours</li>
              </ul>
              
            </div>

          </form>
        </section>
        <div>
              <Link to="/">
              <button class="button-pushable" id="back">
                    <span class="button-shadow"></span>
                    <span class="button-edge"></span>
                    <span class="button-front text">
                    Back
                    </span>
                </button>
              </Link>
              <Link to="/ExerciseList">
                {/* <button disabled={!allAnswered()} onClick={handleNextClick}>Next</button> */}
                <button disabled={!allAnswered()} class="button-pushable" id="next" onClick={handleNextClick}>
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

export default QuestionDiagnose;
