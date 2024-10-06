import style from "./App.module.css"
import { useState, useEffect } from "react";
import Square from "./Components/Square";
import { Patterns } from "./Components/Patterns";

function App(){
  let boardlist = ["","","","","","","","",""];
  let [board, setboard] = useState(boardlist);
  let [player, setplayer] = useState("O");
  let [result, setResult] = useState({winner: "none", state: "none"});

  // using the useEffect hook method
  useEffect(() => {
    checkWinner();
    checkIfTie();

    // changing the symbol according to player so that one player can choose x and another choose o
    if(player == "X"){
      setplayer("O");
    }else{
      setplayer("X");
    }

  }, [board])

  useEffect(() =>{
    if(result.state != "none"){
      alert(`Congrats! Game is Over now: Winning Player is ${result.winner}`);
      restartGame();
    }
  }, [result])

  // creating a function for chooseSquare box
  const chooseSquare = (index) =>{

    // checking that player entered the symbol in a correct box or not 
      setboard(board.map((val, idx) => {
        if(idx == index && val == ""){
          return player;
        }

        return val;
      }));

  }

  // creating function to check the winner of game
  const checkWinner = () =>{
    Patterns.forEach((currentPattern) =>{
      const firstPlayer = board[currentPattern[0]];
      if(firstPlayer == ""){
        return;
      }
      let foundWinningpattern = true;
      currentPattern.forEach((pindex) =>{
        if (board[pindex] != firstPlayer){
          foundWinningpattern = false;
        }
      });

      if(foundWinningpattern){
        setResult({winner: player, state:"Won"});
      }
    });
  };

  // creating a function to check the game is tie or not
  const checkIfTie = ()=>{
    let filled = true;
    board.forEach((index) => {
      if(index == ""){
        filled = false;
      }
    });

    if(filled){
      setResult({winner: "No One", state:"Tie"});
    }
  };

  // restart the game 
  const restartGame = () =>{
    setboard(boardlist);
    setplayer("O");
  }

  return (
    <>
    <div className={style["App"]}>
      <div className={style["board"]}>
        {/* creating a row in a main box */}

        {/* row 1 */}
        <div className={style["row"]}>
          <Square value={board[0]} onchooseSquare={() => chooseSquare(0)}></Square>
          <Square value={board[1]} onchooseSquare={() => chooseSquare(1)}></Square>
          <Square value={board[2]} onchooseSquare={() => chooseSquare(2)}></Square>
        </div>

        {/* row 2 */}
        <div className={style["row"]}>
          <Square value={board[3]} onchooseSquare={() => chooseSquare(3)}></Square>
          <Square value={board[4]} onchooseSquare={() => chooseSquare(4)}></Square>
          <Square value={board[5]} onchooseSquare={() => chooseSquare(5)}></Square>
        </div>

        {/* row 3 */}
        <div className={style["row"]}>
          <Square value={board[6]} onchooseSquare={() => chooseSquare(6)}></Square>
          <Square value={board[7]} onchooseSquare={() => chooseSquare(7)}></Square>
          <Square value={board[8]} onchooseSquare={() => chooseSquare(8)}></Square>
        </div>
      </div>
    </div>
    </>
  )
}
export default App