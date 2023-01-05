import React from 'react'
import { useState } from 'react';
import Questionbank from './QuizData';
import QuizResult from './QuizResult';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useTimer } from 'react-timer-hook';

    
    
const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
    function MyTimer({ expiryTimestamp }) {
        const nextQuestion= currentQuestion+1;
        const {
          seconds,
        } = useTimer({ expiryTimestamp, onExpire: () => setCurrentQuestion(nextQuestion) });

        return (
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '80px'}}>
              <span>{seconds}</span>
            </div>
          </div>
        );
      }

const handleAnswerResponse=(isCorrect)=>
{
    if(isCorrect)
    {
        setScore(score+5);
        toast.success('Correct Answer!');
    }
    else{
        setScore(score-1);
        toast.error('Wrong Answer!');
    }

   const nextQuestion= currentQuestion+1;
   if(nextQuestion<Questionbank.length)
   {
    setCurrentQuestion(nextQuestion);
   }
   else{
    setShowScore(true);
   }
}

const resetQuiz=()=>
{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
}

    return (
        <div className='app'>
            <ToastContainer autoClose={4000} theme="colored" newestOnTop={true}/>
            {showScore ? (<QuizResult score={score} resetQuiz={resetQuiz}/>)
                : (
                    <>
                    <MyTimer expiryTimestamp={time} />
                        <div className='question-section'>
                            <div className='question-count'>
                               <span>{currentQuestion+1}</span>/{Questionbank.length}
                            </div>

                            <div className='question-text'>
                             {Questionbank[currentQuestion].Question}
                            </div>
                        </div>

                        <div className='answer-section'>
                          {Questionbank[currentQuestion].Answers.map((answer)=>
                          (
                              <button onClick={()=>handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</button>
                          ))}
                        </div>
                    </>
                )
            }

        </div>
    );
}

export default Quiz;