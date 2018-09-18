import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
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
        <div className="pad-container col-12">
          <div id="kick" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="Q"></audio>
						Q
					</div>
          <div id ="ride" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="W"></audio>
						W
					</div>
          <div id="snare" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="E"></audio>
						E
					</div>
          <div id="crash" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="A"></audio>
						A
					</div>
          <div id="lowTom" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="S"></audio>
						S
					</div>
          <div id="highTom" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="D"></audio>
						D
					</div>
          <div id="clap" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="Z"></audio>
						Z
					</div>
          <div id="cowBell" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="X"></audio>
						X
					</div>
          <div id="triangle" className="drum-pad">
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="C"></audio>
						C
				</div>
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
const Container = NuConnect(mapStateToProps, mapDispatchToProps)(App);

class AppWrapper extends Component {
  render() {
    // complete the return statement:
    return (
      <NuProvider store={store}>
        <Container/>
      </NuProvider>
    )
  }
};

export default AppWrapper;