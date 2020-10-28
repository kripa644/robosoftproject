import './TicTacToe.css';
import Button from './Button';
import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import useTicTacToe from './useTicTacToe';

const Square = ({ value, handleClick, highlight}) => {
    const classes = cn('square', {'highlightSquare': highlight});
    return (
        <button className= {classes} onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = ({ board, handleClick, winLine}) => {
    function renderSquare(i) {
        return (
        <Square 
            value={board[i]} 
            handleClick={() => handleClick(i)} 
            highlight={winLine && winLine.includes(i)}
        />);
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

const Game = () => {
    
    const {
        history,
        step,
        setStep,
        playerOne,
        setPlayerOne,
        setPlayerTwo,
        player,
        setPlayer,
        handleReset,
        computeWinner,
        processCurrentStepIndex,
    } = useTicTacToe();

    const {winner, winLine} = computeWinner(history[step]);

    const firstPlayerNameFieldRef = useRef(null);
    // const secondPlayerNameFieldRef = useRef(null);
    // console.log(firstPlayerNameFieldRef.current);
    // console.log(secondPlayerNameFieldRef.current);
    useEffect(() => {
        firstPlayerNameFieldRef.current.focus();
    }, []);    

    const handleClick = (i) => {
        console.log(`square ${i} is clicked`);

        processCurrentStepIndex(i);
    };
    

    function status() {

        if (step === 9 && winner === null) {
            return 'Draw';
        }
        else if (winner === null) {
            return `Next player: ${player ? player : ''}`;
        } 
        else {
            return `Player ${winner} won!`;
        }
    }


    function renderHistory() {
        return history.map((b, index) => (
            
            <li key={index}>
              <Button selected={index === step}
              onClick={() => setStep(index)}>
              {index === 0 ? 'Go to start of the game' : `Goto step ${index}`}
              </Button>
            </li>
        ));
    }

    return (
            <div className="game">
                <div className="game-board">
                    <Board winLine={winLine} board={history[step]} handleClick={handleClick} />
                </div>
                <div className="game-info">
                    <div>{status()}</div>
                    <ol>{renderHistory()}</ol>
                </div>
                <div className="name-inputs">
                <div>
                    <label>Player 1</label>
                    <input ref={firstPlayerNameFieldRef} type={'text'} onChange={(e) => {
                        // firstPlayerNameFieldRef.current = e.target.value;
                        setPlayerOne(e.target.value);
                        setPlayer(e.target.value)}} 
                        placeholder={'X'}
                        maxLength={1} /><br/>
                </div>
                <div>
                    <label>Player 2</label>
                    <input type={'text'} 
                        onChange={(e) => {
                            // secondPlayerNameFieldRef.current = e.target.value;
                            setPlayerTwo(e.target.value);
                            if(playerOne === e.target.value) {
                                alert('Player name has already taken');
                            }
                        }}
                        placeholder={'Y'} 
                        maxLength={1}
                    />
                </div>
                <div className={'resetButton'}>
                    <button type={'reset'} onClick={() => handleReset()}>Reset</button>
                </div>
                </div>
            </div>
    );
};

export default Game;