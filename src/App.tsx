import { useState, useCallback, useEffect } from 'react';
import GestureSelection from './GestureSelection';
import Results from './Results';
import './App.css';

export type playerIndex = 0 | 1 | 2;
export type handGesture = 'scissors' | 'paper' | 'rock' | null;
export const BEST_OF_ROUNDS = 3;

export default function App() {
  // best of 3
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [currentTurn, setCurrentTurn] = useState<playerIndex>(1)
  const [player1Gestures, setPlayer1Gestures] = useState<handGesture[]>([]);
  const [player2Gestures, setPlayer2Gestures] = useState<handGesture[]>([]);
  
  const setGesture = useCallback((handGesture: handGesture) => {
    switch (true) {
      case currentTurn == 1 && currentRound < BEST_OF_ROUNDS:
        setPlayer1Gestures(player1Gestures => [...player1Gestures, handGesture]);
        setCurrentTurn(2);
        break;
      case currentTurn == 2 && currentRound < BEST_OF_ROUNDS:
        setPlayer2Gestures(player2Gestures => [...player2Gestures, handGesture]);
        setCurrentTurn(1);
        setCurrentRound(currentRound => currentRound + 1);
        break;
    }
  }, [currentTurn, currentRound]);

  useEffect(() => {
    console.log('updated', player1Gestures.length, player2Gestures.length)
    if(player1Gestures.length >= BEST_OF_ROUNDS && player2Gestures.length >= BEST_OF_ROUNDS) {
      setCurrentTurn(0);
    }
  }, [player1Gestures.length, player2Gestures.length]);

  const reset = () => {
    setCurrentRound(0);
    setCurrentTurn(1);
    setPlayer1Gestures([]);
    setPlayer2Gestures([]);
  }

  return (
    <>
      {
        currentTurn == 0 ?
          <Results player1Gestures={player1Gestures} player2Gestures={player2Gestures} reset={reset} /> :
          <GestureSelection setGesture={setGesture} currentTurn={currentTurn} />
      }
    </>
  )
}
