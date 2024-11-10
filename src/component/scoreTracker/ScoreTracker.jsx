// src/App.js
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./ScoreTracker.css"

const ScoreTracker = () => {
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleVoiceCommand = (command) => {
    if (command.includes('team a')) {
      if (command.includes('score') || command.includes('point')) {
        setTeamA(teamA + 1);
      }
    } else if (command.includes('team b')) {
      if (command.includes('score') || command.includes('point')) {
        setTeamB(teamB + 1);
      }
    }
  };

  // This effect listens for the voice command and updates the score
  React.useEffect(() => {
    if (transcript) {
      if(transcript.toLowerCase()!="team a" || transcript.toLowerCase()!="team b"){
        resetTranscript();
        SpeechRecognition.startListening();
      }
      else{
        handleVoiceCommand(transcript.toLowerCase());
      }
    }
  }, [transcript, teamA, teamB, resetTranscript]);

  return (
    <div className="App">
      <h1>Table Tennis Score Tracker</h1>
      <div>
        <h2>Team A: {teamA}</h2>
        <h2>Team B: {teamB}</h2>
      </div>
      <div>
        <button onClick={() => SpeechRecognition.startListening()}>
          Start Listening
        </button>
        <button onClick={() => SpeechRecognition.stopListening()}>
          Stop Listening
        </button>
        {transcript}
      </div>
      <p>Say "team A score" or "team B score" to track the points.</p>
    </div>
  );
};

export default ScoreTracker;
