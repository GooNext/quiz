import React from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends React.Component{

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Черный', id : 1},
                    {text: 'Синий', id : 2},
                    {text: 'Красный', id : 3},
                    {text: 'Зелёный', id : 4},
                ]
            },
            {
                question: 'Год основания СПБ',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1402', id : 1},
                    {text: '1992', id : 2},
                    {text: '1703', id : 3},
                    {text: '2001', id : 4},
                ]
            }
        ]
    }

    onAnswerClickhandler = answerId => {
        if (this.state.answerState){
           const key = Object.keys(this.state.answerState)[0] 
           if (this.state.answerState[key] === 'success'){
               return 
           }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {

            if(!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeOut = window.setTimeout(()=>{
                if(this.isQuizFinished()){
                    this.setState ({
                        isFinished: true
                    })
                
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeOut)
            },500)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render(){
        return(
            <div className = {classes.Quiz}>
                <div className = {classes.QuizWrapper}>
                    <h1>Выберите правильный ответ</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results = {this.state.results}
                            quiz = {this.state.quiz}
                            onRetry = {this.retryHandler}
                        />
                        : <ActiveQuiz
                        answers = {this.state.quiz[this.state.activeQuestion].answers}
                        question = {this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick = {this.onAnswerClickhandler}
                        quizLength = {this.state.quiz.length}
                        answerNumber = {this.state.activeQuestion + 1}
                        state = {this.state.answerState}
                    />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz