import React, { Component } from 'react';
import Game from './Game';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        
        <Game />

      </div>
    );
  }
}


/* ****************************************************************************************** 
**    Context
** *****************************************************************************************/ 
// class ApiRootProvider extends React.Component {
//   constructor(props) {
//     super(props);
//     const localRoot = 'http://localhost:5000/api/';
//     const herokuRoot = 'https://burgle.herokuapp.com/api/';

//     this.changeRoot = () => {
//       this.setState(state => {
//         const newRoot = state.apiRoot === this.herokuRoot ? this.localRoot : this.herokuRoot;
//         return {
//           apiRoot: this.herokuRoot
//         };
//       });
//     };

//     this.state = {
//       apiRoot: herokuRoot,
//       changeRoot: this.changeRoot
//     };
    
//   }

//   render() {
//     return (
//       <ApiRootContext.Provider value={this.state}>
//         {this.props.children}
//       </ApiRootContext.Provider>
//     );
//   }
// }

/*
class ToggleServer extends React.Component {
  constructor(props){
    super(props);
    return (
      <ApiRootContext.Consumer>
        {serverVal => (
          <button onClick={serverVal.changeApiRoot}>Change server</button>
        )}
      </ApiRootContext.Consumer>
    )
  }
}
*/


export default App;
