import React, { Component } from 'react';
import Logo from './Logo';
import './App.css';

class App extends Component {
  static requestData() {
    return fetch('http://localhost:8000/api/data')
      .then(res => res.json())
      .then(data => {
        return data.items;
      }).catch(err => {
        console.log('err', err);
      });
  }
  
  render() {
    const data = this.props.data || [];
    return (
      <div className="App">
        <header className="App-header">
          <Logo className="App-logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => {console.log('click')}}>
            Click me!
          </button>
          <ul>
            {data.map(chunk => (
              <li key={chunk.id}>{chunk.todo}</li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
