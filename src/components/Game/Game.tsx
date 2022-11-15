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

  const handleClick = (i: any) => {
    const squaresBuff = squares.slice();

    if (sourceSelection === -1) {
      if (!squaresBuff[i] || squaresBuff[i].player !== player) {
        setStatus("Wrong selection. Choose player " + player + " pieces.");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        squaresBuff[i] ? delete squaresBuff[i].style.backgroundColor : null;
      } else {
        squaresBuff[i].style = {
          ...squaresBuff[i].style,
          backgroundColor: "RGB(111,143,114)",
        }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        setStatus("Choose destination for the selected piece");
        setSourceSelection(i);
      }
    } else if (sourceSelection > -1) {
      delete squaresBuff[sourceSelection].style.backgroundColor;
      if (squaresBuff[i] && squaresBuff[i].player === player) {
        setStatus(
          "Wrong selection. Choose valid source and destination again."
        );
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
          // if (squaresBuff[i] !== null) {
          //   if (squaresBuff[i].player === 1) {
          //     whiteFallenSoldiers.push(squaresBuff[i]);
          //   } else {
          //     blackFallenSoldiers.push(squaresBuff[i]);
          //   }
          // }
          console.log("whiteFallenSoldiers", whiteFallenSoldiersBuff);
          console.log("blackFallenSoldiers", blackFallenSoldiersBuff);
          squaresBuff[i] = squaresBuff[sourceSelection];
          squaresBuff[sourceSelection] = null;
          let playerBuff = player === 1 ? 2 : 1;
          let turnBuff = turn === "white" ? "black" : "white";

          setStatus("");
          setSourceSelection(-1);
          setSquares(squaresBuff);
          setPlayer(playerBuff);
          setTurn(turnBuff);

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

  return (
    <div>
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i: any) => handleClick(i)} />
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

      <div className="icons-attribution">
        <div>
          <small>
            Chess Icons And Favicon (extracted) By en:User:Cburnett [
            <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>,{" "}
            <a href="http://creativecommons.org/licenses/by-sa/3.0/">
              CC-BY-SA-3.0
            </a>
            , <a href="http://opensource.org/licenses/bsd-license.php">BSD</a>{" "}
            or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>],{" "}
            <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">
              via Wikimedia Commons
            </a>{" "}
          </small>
        </div>
      </div>
    </div>
  );
}
