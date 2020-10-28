import './TicTacToe.css';
import Button from './Button';
import React, { useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import computeWinner from './calculateWinner';
import {initialState, setPlayerX, setPlayerY, setCurrentPlayer, resetGame, playNextStep, gotoStep, ticTacToeReducer, reduceNextStep} from './useTicTacToeReducer';

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
        
    const [state, dispatch] = useReducer(ticTacToeReducer, initialState);

    let { history, step, currentPlayer, playerX, playerY} = state;

    const {winner, winLine} = computeWinner(history[step]);
    

    const firstPlayerNameFieldRef = useRef(null);

    useEffect(() => {
        firstPlayerNameFieldRef.current.focus();
    }, []);

    const handleClick = (i) => {
            dispatch(playNextStep(i));
    };
    

    function status() {

        if (step === 9 && winner === null) {
            return 'Draw';
        }
        else if (winner === null) {
            return `Next player: ${currentPlayer ? currentPlayer : ''}`;
        } 
        else {
            return `Player ${winner} won!`;
        }
    }


    function renderHistory() {
        return history.map((b, index) => (
            
            <li key={index}>
              <Button selected={index === step}
              onClick={() => dispatch(gotoStep(index))}>
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
                    <input ref={firstPlayerNameFieldRef} type={'text'} value={playerX} onChange={(e) => {
                        // firstPlayerNameFieldRef.current = e.target.value;
                        // setPlayerOne(e.target.value);
                        dispatch(setPlayerX(e.target.value));
                        dispatch(setCurrentPlayer(e.target.value))}} 
                        placeholder={'X'}
                        maxLength={1} /><br/>
                </div>
                <div>
                    <label>Player 2</label>
                    <input type={'text'} value={playerY}
                        onChange={(e) => {
                            // secondPlayerNameFieldRef.current = e.target.value;
                            if(playerX === e.target.value) {
                                alert('Player name has already taken');
                            }
                            dispatch(setPlayerY(e.target.value));
                        }}
                        placeholder={'Y'} 
                        maxLength={1}
                    />
                </div>
                <div className={'resetButton'}>
                    <input type={'reset'} value={"Reset"} onClick={() => dispatch(resetGame())}/>
                </div>
                </div>
            </div>
    );
};

export default Game;