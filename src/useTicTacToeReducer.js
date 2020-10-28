import computeWinner from "./calculateWinner";

const SET_PLAYER_X_ACTION_TYPE = 'SET_PLAYER_X';
    const SET_PLAYER_Y_ACTION_TYPE = 'SET_PLAYER_Y';
    const SET_CURRENT_PLAYER_ACTION_TYPE = 'SET_CURRENT_PLAYER';
    const RESET_ACTION_TYPE = 'RESET';
    const PLAY_NEXT_STEP_ACTION_TYPE = 'PLAY_NEXT_STEP';
    const GOTO_STEP_ACTION_TYPE = 'GO_TO_STEP';

    const initialState = {
        history: [Array(9).fill(null)],
        playerX: 'X',
        playerY: 'Y',
        currentPlayer: 'X',
        step: 0,
        winningLine: [],
    };

    const setPlayerX = (playerName) => ({
        type: SET_PLAYER_X_ACTION_TYPE,
        playerName,
    });

    const setPlayerY = (playerName) => ({
        type: SET_PLAYER_Y_ACTION_TYPE,
        playerName,
    });

    const setCurrentPlayer = (playerName) => ({
        type: SET_CURRENT_PLAYER_ACTION_TYPE,
        playerName,
    });

    const resetGame = () => ({
        type: RESET_ACTION_TYPE,
        initialState,
    });

    const playNextStep = (index) => ({
        type: PLAY_NEXT_STEP_ACTION_TYPE,
        index,
    });

    const gotoStep = (step) => ({
        type: GOTO_STEP_ACTION_TYPE,
        step,
    });

    const ticTacToeReducer = (state, action) => {
        switch(action.type) {
            case SET_PLAYER_X_ACTION_TYPE:
                return {...state, playerX: action.playerName};
            case SET_PLAYER_Y_ACTION_TYPE:
                return {...state, playerY: action.playerName};
            case SET_CURRENT_PLAYER_ACTION_TYPE:
                return {...state, currentPlayer: action.playerName};
            case RESET_ACTION_TYPE:
                return action.initialState;
            case PLAY_NEXT_STEP_ACTION_TYPE:
                return reduceNextStep(state, action.index);
            case GOTO_STEP_ACTION_TYPE:
                if(action.step >= 0 && action.step < 10) {
                    return {...state, step: action.step};
                } else {
                    throw new Error('Steps needs to be within 0 and 10');
                    // return state;
                }
            default:
                return state;
        }
    };

    function reduceNextStep(state, index) {
        let {history, step, currentPlayer, playerX, playerY} = state;
        const prevHistory = history[step];
        const {winner} = computeWinner(prevHistory);

        const canInteract = () => step === history.length - 1;
    
        if(canInteract() && prevHistory[index] === null && winner === null) {
            
            const newHistory = [...prevHistory];
            newHistory[index] = currentPlayer;

            history = history.concat([newHistory]);

            currentPlayer = currentPlayer === playerX ? playerY : playerX;

            step = step + 1;

            return {...state, history, step, currentPlayer};
        }
        return {...state};
    }

export {initialState, setPlayerX, setPlayerY, setCurrentPlayer, resetGame, playNextStep, gotoStep, ticTacToeReducer, reduceNextStep};