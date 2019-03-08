import React from 'react';
import './ScorecardWord.css';

class ScorecardWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: props.value,
          score: props.score,
          path: props.path
        }
      }
    
    componentDidMount() {
      /*
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `${this.context.apiRoot}game/${this.props.gameId}/word`;
      let url = proxyUrl + targetUrl;
      */
      let url = `https://burgle.herokuapp.com/api/game/${this.props.gameId}/word`;
      
      fetch(url, { method: 'POST', 
                  body: JSON.stringify(this.state),
                  headers:{
                    'Content-Type': 'application/json'
                  } })
        .then(res => res.json())
        .then(
        (result) => {
          this.setState({
            score: result.score
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    
    render() {
      let disallowedClass;
      if (this.state.score === 0) {
        disallowedClass = 'disallowed';
      }
      return (
        <tr className={`word-row ${disallowedClass}`}>
          <td>{ this.state.value }</td>
          <td>{ this.state.score }</td>
        </tr>
      )
    }
}
// ScorecardWord.contextType = ApiRootContext;
export default ScorecardWord;