import React from "react";

import Exclassifier from '../../component/Exclassifier';
import MovenetComponent from '../../component/MovenetComponent';
import ProgressTab from '../../component/ProgressTab';

import '../../style/page.css'
import '../../style/button.css'

function DoExercise() {
    return (
            <body className="exercise">
                <ProgressTab/>
                <section className="function">
                <h1>Stretching...</h1>

                <div className='do-exercise'>
                    <div className="exclassifier">
                    <Exclassifier/>
                    </div>

                    <div className="movenet">
                        <MovenetComponent/>
                    </div>
                </div>
                </section>

            </body>
    )
    }
export default DoExercise