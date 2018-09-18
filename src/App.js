import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logo from './logo.svg';
import './App.css';
import './drum-machine.css';

// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = createStore(messageReducer);

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div id="display">
        <h1>Bang the Drum</h1>
        <div class="pad-container col-12">
          <div id="kick" class="drum-pad">Q</div>
          <div id ="ride" class="drum-pad">W</div>
          <div id="snare" class="drum-pad">E</div>
          <div id="crash" class="drum-pad">A</div>
          <div id="lowTom" class="drum-pad">S</div>
          <div id="highTom" class="drum-pad">D</div>
          <div id="clap" class="drum-pad">Z</div>
          <div id="cowBell" class="drum-pad">X</div>
          <div id="triangle" class="drum-pad">C</div>
        </div>
      </div>
    );
  }
}

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const NuProvider = Provider;
const NuConnect = connect;

// define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // complete the return statement:
    return (
      <NuProvider store={store}>
        <Container/>
      </NuProvider>
    )
  }
};

export default App;