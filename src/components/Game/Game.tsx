import "../../index.css";
import Board from "../Board/Board";
import FallenSoldierBlock from "../FallenSoldiers/FallenSoldiers";
import initialiseChessBoard from "../../helpers/initialiseChessBoard";
import { useState } from "react";

export default function Game() {
  const [whiteFallenSoldiers, setWhiteFallenSoldiers] = useState([]);
  const [blackFallenSoldiers, setBlackFallenSoldiers] = useState([]);
  const [player, setPlayer] = useState(1);
  const [status, setStatus] = useState("");
  const [turn, setTurn] = useState("white");
  const [sourceSelection, setSourceSelection] = useState(-1);
  const [squares, setSquares] = useState(initialiseChessBoard());

  /**
   * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
   * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}
   */
  const isMoveLegal = (srcToDestPath: any) => {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  };

  const handleClick = (i: number) => {
    const squaresBuff = squares.slice();

    if (sourceSelection === -1) {
      if (!squaresBuff[i] || squaresBuff[i].player !== player) {
        setStatus(`Wrong selection. Now the player ${player} is walking`);
      } else {
        squaresBuff[i].style = {
          ...squaresBuff[i].style,
          backgroundColor: "RGB(111,143,114)",
        };

        // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        setStatus("Choose where you want to go");
        setSourceSelection(i);
      }
    } else if (sourceSelection > -1) {
      // ! delete squaresBuff[sourceSelection].style.backgroundColor;
      if (squaresBuff[i] && squaresBuff[i].player === player) {
        setStatus("Wrong choice. You can't make such a move.");
        setSourceSelection(-1);
      } else {
        const squaresBuff = squares.slice();
        const whiteFallenSoldiersBuff = whiteFallenSoldiers.slice();
        const blackFallenSoldiersBuff = blackFallenSoldiers.slice();
        const isDestEnemyOccupiedBuff = squaresBuff[i] ? true : false;
        const isMovePossible = squaresBuff[sourceSelection].isMovePossible(
          sourceSelection,
          i,
          isDestEnemyOccupiedBuff
        );
        const srcToDestPath = squaresBuff[sourceSelection].getSrcToDestPath(
          sourceSelection,
          i
        );
        const isMoveLegalBuff = isMoveLegal(srcToDestPath);

        if (isMovePossible && isMoveLegalBuff) {
          // ! Error
          if (squaresBuff[i] !== null) {
            console.log(squaresBuff);
            // if (squaresBuff[i].player === 1) {
            //   whiteFallenSoldiers.push(squaresBuff[i]);
            // } else {
            //   blackFallenSoldiers.push(squaresBuff[i]);
            // }
          }
          // console.log("whiteFallenSoldiers", whiteFallenSoldiersBuff);
          // console.log("blackFallenSoldiers", blackFallenSoldiersBuff);
          squaresBuff[i] = squaresBuff[sourceSelection];
          squaresBuff[sourceSelection] = null;

          setStatus("");
          setSourceSelection(-1);
          setSquares(squaresBuff);
          setPlayer(player === 1 ? 2 : 1);
          setTurn(turn === "white" ? "black" : "white");

          setWhiteFallenSoldiers(whiteFallenSoldiersBuff);
          setBlackFallenSoldiers(blackFallenSoldiersBuff);
        } else {
          setStatus(
            "Wrong selection. Choose valid source and destination again."
          );
          setSourceSelection(-1);
        }
      }
    }
  };

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i: number) => handleClick(i)} />
        </div>
        <div className="game-info">
          <h3>Turn</h3>
          <div id="player-turn-box" style={{ backgroundColor: turn }}></div>
          <div className="game-status">{status}</div>

          <div className="fallen-soldier-block">
            {
              <FallenSoldierBlock
                whiteFallenSoldiers={whiteFallenSoldiers}
                blackFallenSoldiers={blackFallenSoldiers}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
