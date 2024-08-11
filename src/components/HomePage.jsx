import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/board')
    }
  return (
    <>
    <div className="checkers-heading">
        <h3>Play Checkers!</h3>
        <button onClick={handleClick}>Click to Play</button>
      </div>
    </>
  )
}
