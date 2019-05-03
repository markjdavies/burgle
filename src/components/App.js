import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { startGame } from '../redux-actions.js';
import GameDisplay, { gameReducer } from './Game';
import { boardReducer } from './Board';
import './App.css';

const reducer = combineReducers({
  game: gameReducer,
  board: boardReducer,
});

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

class App extends React.Component {

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
    store.dispatch(startGame());
  };

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <GameDisplay />
        </Provider>
      </div>
    );
  };
}
export default App;
