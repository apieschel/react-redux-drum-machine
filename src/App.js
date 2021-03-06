// Sources 
// https://www.codeproject.com/Articles/1202580/Build-a-Metronome-in-React

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
	    loop: false,
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    }
    this.triangleClick = new Audio('https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fstick.wav?1548794294318');
    this.cowbellClick = new Audio('https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fcowbell2.wav?1548794293518');
    this.clickPlay = this.clickPlay.bind(this);
	  this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBpmChange = this.handleBpmChange.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.playClick = this.playClick.bind(this);
  }
	
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
	
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
    
  handleStartStop(e) {
    if(this.state.playing) {
    // Stop the timer
    clearInterval(this.timer);
    this.setState({
      playing: false
    });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
        // Play a click "immediately" (after setState finishes)
      }, this.playClick);
    }
  }
  
  playClick() {
    const count = this.state.count; 
    const beatsPerMeasure = this.state.beatsPerMeasure;

    // The first beat will have a different sound than the others
    if(count % beatsPerMeasure === 0) {
      this.triangleClick.play();
    } else {
      this.cowbellClick.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }
	
  handleKeyPress(e) {
    if(document.getElementById(e.key.toUpperCase())) {
      document.getElementById(e.key.toUpperCase()).play();
      //document.getElementById(e.key.toUpperCase()).parentElement.style.background = "green";
      document.getElementById("display").firstChild.innerText = document.getElementById(e.key.toUpperCase()).parentElement.id;
    }
  }
  
  handleBpmChange(e) {
    const bpm = e.target.value;
    if(this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bpm: bpm
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm: bpm });
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
    const playing = this.state.playing;
    const bpm = this.state.bpm;
    
    return (
      <div id="display">
        <h1>Casio SA-10 Drum Machine</h1>
        <div className="pad-container col-12">
	  				<div id="KICK" className="drum-pad" onClick={this.clickPlay}>
						<audio autoPlay={this.state.play} loop={this.state.loop} src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fkick.wav?1548794293466" className="clip" id="Q"></audio>
						Q
					</div>
          <div id ="RIDE" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fride1.wav?1548794293997" className="clip" id="W"></audio>
						W
					</div>
          <div id="SNARE" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fsnare1.wav?1548794294391" className="clip" id="E"></audio>
						E
					</div>
          <div id="CONGO" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fconga1.wav?1548794296100" className="clip" id="A"></audio>
						A
					</div>
          <div id="LOWTOM" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Ftom2.wav?1548794295629" className="clip" id="S"></audio>
						S
					</div>
          <div id="HIGHTOM" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Ftom1.wav?1548794296668" className="clip" id="D"></audio>
						D
					</div>
          <div id="COWBELL" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fcowbell1.wav?1548794296801" className="clip" id="Z"></audio>
						Z
					</div>
          <div id="SHAKER" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Fshaker.wav?1548794293831" className="clip" id="X"></audio>
						X
					</div>
          <div id="TRIANGLE" className="drum-pad" onClick={this.clickPlay}>
						<audio src="https://cdn.glitch.com/24841964-d2fb-4c37-a68b-67ab4e207431%2Ftriangle1.wav?1548794295370" className="clip" id="C"></audio>
						C
				</div>
        </div>
        
         <div className="metronome">
            <div className="bpm-slider">
            <div className="bpm">{bpm} BPM</div>
              <input
                type="range"
                min="60"
                max="240"
                value={bpm}
                onChange={this.handleBpmChange}
                />
            </div>
            <button onClick={this.handleStartStop}>
              {playing ? 'Stop' : 'Metronome'}
            </button>
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