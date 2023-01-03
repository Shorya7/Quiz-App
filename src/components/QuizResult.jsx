import React from "react";
import Questionbank from "./QuizData";

const QuizResult=(props)=>{
    return(
        <div className='score-section'>
                    You have scored {props.score} out of {Questionbank.length*5}
                    <>
                       <button type="submit" onClick={props.resetQuiz}>Play Again!!</button>
                    </>
        </div>
    )
}
export default QuizResult;