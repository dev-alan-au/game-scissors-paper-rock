import { handGesture, playerIndex } from './App';

interface GestureSelectionProp {
  setGesture: (handGesture: handGesture) => void;
  currentTurn: playerIndex;
}

export default function GestureSelection({ setGesture, currentTurn }: GestureSelectionProp) {
  return (
    <>
      <h1>Player { currentTurn }'s Turn</h1>
      <button onClick={() => setGesture('scissors')}>Scissors</button>
      <button onClick={() => setGesture('paper')}>Paper</button>
      <button onClick={() => setGesture('rock')}>Rock</button>
    </>
  )
}