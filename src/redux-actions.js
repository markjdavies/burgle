import { valueFromPath } from './word-utils';

export const START_GAME_REQUEST = 'START_GAME_REQUEST';
function startGameRequest() {
  return { type: START_GAME_REQUEST };
}

export const START_GAME_SUCCESS = 'START_GAME_SUCCESS';
function startGameSuccess(result) {
  return {
    type: START_GAME_SUCCESS,
    game: result,
  };
}

export const SCORE_RECEIVED = 'SCORE_RECEIVED';
function scoreReceived(score, wordValue) {
  return {
    type: SCORE_RECEIVED,
    wordValue: wordValue,
    score: score,
  }
}

export const START_GAME_FAILURE = 'START_GAME_FAILURE';
function startGameFailure() {
  return { type: START_GAME_FAILURE };
}


export function startGame() {
  return function (dispatch) {
    dispatch(startGameRequest())
    let url = `https://burgle.herokuapp.com/api/game`;
    return fetch(url, { method: 'POST' })
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(startGameSuccess(result))
        },
        (error) => {
          dispatch(startGameFailure());
        }
      )
  }
}

export function scoreWord(gameId, word) {
  return function (dispatch) {
    let url = `https://burgle.herokuapp.com/api/game/${gameId}/word`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(word),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(scoreReceived(result.score, word.value))
        },
      )
  }
}

export const RESET_WORD = 'RESET_WORD';
export function resetWord(newWordStarted) {
  return {
    type: RESET_WORD,
    newWordStarted: newWordStarted,
  }
}

export const START_BUILDING_WORD = 'START_BUILDING_WORD';
export function startBuildingWord() {
  return function (dispatch) {
    dispatch(resetWord(true));
  }
}

export const CONTINUE_WORD = 'CONTINUE_WORD';
export function continueWord(die) {
  return {
    type: CONTINUE_WORD,
    die: die,
  }
}

export function finishWord(die) {
  return function (dispatch, getState) {
    const state = getState();
    const gameId = state.game.id;
    const now = new Date();
    const gameEndTime = new Date(state.game.endTime);
    const wordPath = state.board.newWordPath;
    const word = {
      value: valueFromPath(wordPath),
      path: wordPath,
    };
    if (gameEndTime > now && wordPath.length >= 3) {
      if (!state.board.foundWords.some(x => x.value === word.value)) {
        dispatch(addWord(word));
        getScoreForNewWord(gameId, word, dispatch);
      }
    }
  }
  function getScoreForNewWord(gameId, word, dispatch) {
    dispatch(scoreWord(gameId, word));
  }
}

export const ADD_WORD = 'ADD_WORD';
export function addWord(word) {
  return {
    type: ADD_WORD,
    word: word,
  }
}

