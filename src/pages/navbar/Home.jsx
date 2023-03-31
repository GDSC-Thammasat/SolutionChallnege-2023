import React from "react";
// import { Link } from 'react-router-dom';
import QuestionBodypart from "../../component/QuestionBodyPart";
import '../../style/main.css'
import '../../style/button.css'

function Home() {
    return (
      <body id="home-page">
          <section>

          <QuestionBodypart/>

            {/* <p id="start"></p>
            
          <Link to="/QuestionBodypart">

              <button class="button-pushable" id="start">
              <span class="button-shadow"></span>
              <span class="button-edge"></span>
              <span class="button-front text">
                Start
              </span>
            </button>
          </Link> */}
        </section>

      </body>
    );
  }

export default Home