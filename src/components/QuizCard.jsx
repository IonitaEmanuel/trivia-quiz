import React, {useEffect} from 'react';

const URL = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=base64'

const QuizCard = () => {
    const [questions, setQuestions] = React.useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [score, setScore] = React.useState(0);

    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data)=>{
                console.log(data);
                setQuestions(data.results);
                console.log(questions);
            })
    }, []);

    const handleAnswerClick = (answer) => {
        if(answer === questions[currentQuestionIndex].correct_answer) {
            setScore(score+1);
        }

        setCurrentQuestionIndex(currentQuestionIndex+1);
    }

    const restartQuiz = () => {
        fetch(URL)
            .then((response) => response.json())
            .then((data)=>{
                console.log(data);
                setQuestions(data.results);
                console.log(questions);
            })
        setCurrentQuestionIndex(0);
        setScore(0);
    }

    if(questions.length===0) {
        return <div>Loading...</div>
    }

    if(currentQuestionIndex >= questions.length) {
        return (
            <div className='flex flex-col items-center justify-center gap-4 bg-black text-white p-3 w-[500px] h-[200px] rounded-xl'>
                <h1 className='font-bold'>Quiz Completed</h1>
                <p className='text-2xl'>Your Score: {score}/{questions.length}</p>
                <button
                    className='bg-white text-black text-2xl p-2 hover:bg-gray-500 hover:text-white w-[200px] rounded-xl'
                    onClick={restartQuiz}>Restart Quiz</button>
            </div>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];

    const shuffle = [...currentQuestion.incorrect_answers]
    const correct_ans_index = Math.floor(Math.random()*4);
    shuffle.splice(correct_ans_index, 0, currentQuestion.correct_answer);

    return (
        <div className='flex flex-col bg-black text-white p-3 w-[500px] h-[400px] rounded-xl'>
            <h2 className='font-bold'>Question {currentQuestionIndex+1}</h2>
            <p className='text-xl h-[100px]'>{atob(currentQuestion.question)}</p>
            <ul className='mt-4 flex flex-col items-center gap-4'>
                {shuffle.map((ans)=>(
                    <li className='bg-white text-black pl-2 pr-2 text-xl w-[300px] flex flex-col items-center pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gray-500 hover:text-white'
                        key={ans} onClick={()=>handleAnswerClick(ans)}>
                        {atob(ans)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default QuizCard