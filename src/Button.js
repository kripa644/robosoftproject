import cn from 'classnames';
import React from 'react';
import './TicTacToe.css';

export default function Button ({selected, onClick, children}) {
    const classes = cn({historyButtonSelected: selected});
    // let classes = `${selected} ? historyButtonSelected : undefined`;

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
}