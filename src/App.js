import React, { useState, useEffect } from 'react'
import imagesData from './data'
import Confetti from 'react-confetti'
import './styles.css'

function App() {

  const [data, setData] = useState(imagesData)
  const [times, setTimes] = useState(1)
  const [flippedImg, setFlippedImg] = useState('')
  const [start, setStart] = useState(false)
  const [win, setWin] = useState(false)
  const [attemps, setAttemps] = useState(0)

  useEffect(() => {
    setData(prev => prev.sort(() => Math.random() - 0.5))
  }, [])

  function handle(id, name) {
    setTimes(prev => prev + 1)
    setFlippedImg(name)

    if (times === 1) {
      setData(prev => prev.map(card => {
        return card.id === id ? { ...card, isWaiting: true } : card
      }))
    }
    else if (times === 2) {
      setAttemps(prev => prev + 1)
      setData(prev => prev.map(card => {
        return card.id === id ? { ...card, isWaiting: true } : card
      }))
      setTimeout(() => {
        if (flippedImg === name) {
          setData(prev => prev.map(card => {
            return card.name === flippedImg ?
              {
                ...card, isDone: true
              }
              :
              card
          }))
        }
        else {
          setData(prev => prev.map(card => {
            return {
              ...card,
              isWaiting: false
            }
          }
          ))
        }
        setWin(prev => data.filter(card => card.isDone === false).length === 2)
        setTimes(1)
        setFlippedImg('')
      }, 600);
    }
  }

  function reset() {
    setData(prev => prev.map(card => {
      return {
        ...card,
        isWaiting: false,
        isDone: false
      }
    }))
    setData(prev => prev.sort(() => Math.random() - 0.5))
    setTimes(1)
    setFlippedImg('')
    setWin(false)
  }


  return (
    <div className="App">
      {win && <Confetti />}
      <header className='header'>
        <h1>
          Memory Game
        </h1>
        {
          start && <p>Attemps : {attemps}</p>
        }
        {!start && <p>Train you memory and guess the similar images</p>}
      </header>
      {!start ?
        <div className='start-btn'>
          <h1 onClick={() => setStart(true)}>
            Start the game
          </h1>
          <img src="images/memory.jpg" alt="" />
        </div>
        :
        <div className="cards-container">
          {
            data.map(card => {
              const { id, name, image, isWaiting, isDone } = card
              return <div
                className={`card ${isWaiting ? 'fliped' : ''} ${isDone ? 'done' : ''}`}
                key={id}
                onClick={() => handle(id, name)}
              >
                <img src={image} alt="" />
                <div className="question">?</div>
              </div>
            })
          }
        </div>
      }
      {win && <div className='play-again'>
        <h1 onClick={reset}>
          Play Again
        </h1>
      </div>}
    </div>
  );
}

export default App;
