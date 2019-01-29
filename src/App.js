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
      play: false,
	  loop: false
    }
    this.clickPlay = this.clickPlay.bind(this);
	this.handleKeyPress = this.handleKeyPress.bind(this);
  }
	
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
	
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
	
  handleKeyPress(e) {
	if(document.getElementById(e.key.toUpperCase())) {
    	document.getElementById(e.key.toUpperCase()).play();
		document.getElementById("display").firstChild.innerText = document.getElementById(e.key.toUpperCase()).parentElement.id;
	}
  }
  
  clickPlay(event) {
    this.setState({
      play: true
    });
	event.target.firstChild.play();
	console.log(event);
	document.getElementById("display").firstChild.innerText = event.target.id;
  }
	
  render() {
    return (
      <div id="display">
        <h1>Casio SA-10 Drum Machine</h1>
        <div className="pad-container col-12">
	  				<div id="kick" className="drum-pad" onClick={this.clickPlay}>
						<audio autoPlay={this.state.play} loop={this.state.loop} src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fkick.wav?1548794293466" className="clip" id="Q"></audio>
						Q
					</div>
          <div id ="ride" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fride1.wav?1548794293997" className="clip" id="W"></audio>
						W
					</div>
          <div id="snare" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fsnare1.wav?1548794294391" className="clip" id="E"></audio>
						E
					</div>
          <div id="conga" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fconga1.wav?1548794296100" className="clip" id="A"></audio>
						A
					</div>
          <div id="lowTom" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Ftom2.wav?1548794295629" className="clip" id="S"></audio>
						S
					</div>
          <div id="highTom" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Ftom1.wav?1548794296668" className="clip" id="D"></audio>
						D
					</div>
          <div id="clap" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="Z"></audio>
						Z
					</div>
          <div id="cowBell" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="X"></audio>
						X
					</div>
          <div id="triangle" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className="clip" id="C"></audio>
						C
				</div>
        </div>
      </div>
    );
  }
}

/*
document.onkeypress = function (e) {
    e = e || window.event;
	if(document.getElementById(e.key.toUpperCase())) {
		for (let i = 0; i < document.querySelectorAll(".drum-pad").length; i++) {
			if(document.querySelectorAll(".drum-pad")[i].innerText === e.key.toUpperCase()) {
				document.querySelectorAll(".drum-pad")[i].firstChild.play();
			}
		}
	}
};
*/

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