import { v4 as uuidv4 } from "uuid";
import "../../index.css";
import Square from "../Square/Square";

export default function Board(props) {
  const renderSquare = (i, squareShade) => {
    return (
      <Square
        piece={props.squares[i]}
        style={props.squares[i] ? props.squares[i].style : null}
        shade={squareShade}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const board = [];
  for (let i = 0; i < 8; i++) {
    const squareRows = [];
    for (let j = 0; j < 8; j++) {
      const squareShade =
        (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
          ? "light-square"
          : "dark-square";
      squareRows.push(renderSquare(i * 8 + j, squareShade));
    }
    board.push(<div className="board-row">{squareRows}</div>);
  }

  // console.log(board);
  // // key={uuidv4()}
  return <div>{board}</div>;
}

function isEven(num) {
  return num % 2 == 0;
}
