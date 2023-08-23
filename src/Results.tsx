import { playerIndex, handGesture, BEST_OF_ROUNDS } from "./App";

interface ResultsProp {
  player1Gestures: handGesture[];
  player2Gestures: handGesture[];
  reset: () => void;
}

export default function Results({ player1Gestures, player2Gestures, reset }: ResultsProp) {
  let player1Wins = 0;
  let player2Wins = 0;

  const compareGestures = (player1Gesture: handGesture, player2Gesture: handGesture) => {
    switch (true) {
      case (player1Gesture == player2Gesture):
        break;
      case (player1Gesture == 'scissors' && player2Gesture == 'paper'):
        player1Wins++;
        break;
      case (player1Gesture == 'scissors' && player2Gesture == 'rock'):
        player2Wins++;
        break;
      case (player1Gesture == 'paper' && player2Gesture == 'scissors'):
        player2Wins++;
        break;
      case (player1Gesture == 'paper' && player2Gesture == 'rock'):
        player1Wins++;
        break;
      case (player1Gesture == 'rock' && player2Gesture == 'scissors'):
        player1Wins++;
        break;
      case (player1Gesture == 'rock' && player2Gesture == 'paper'):
        player2Wins++;
        break;
    }
  }

  for(let i = 0; i < BEST_OF_ROUNDS; i++) {
    compareGestures(player1Gestures[i], player2Gestures[i]);
  }
  
  const winner: playerIndex = player1Wins > player2Wins ? 1 : player1Wins < player2Wins ? 2 : 0;

  return (
    <>
      <h1>Results</h1>
      {
        winner == 0 ? <h2>It's a draw!</h2> : <h2>Winner is Player {winner}</h2>
      }
      <div>
        <h2>Player 1</h2>
        {player1Gestures.join(' | ')}
      </div>
      <div>
        <h2>Player 2</h2>
        {player2Gestures.join(' | ')}
      </div>
      <button onClick={() => reset()}>Play Again</button>
    </>
  )
}