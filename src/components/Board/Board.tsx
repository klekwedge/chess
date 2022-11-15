import { v4 as uuidv4 } from "uuid";
import "../../index.css";
import Square from "../Square/Square";

export default function Board({ squares, onClick }: any) {
  const isEven = (num: number) => {
    return num % 2 === 0;
  };

  const renderSquare = (i: number, squareShade: string): JSX.Element => {
    return (
      <Square
        piece={squares[i]}
        style={squares[i] ? squares[i].style : null}
        shade={squareShade}
        onClick={() => onClick(i)}
        key={uuidv4()}
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
    board.push(<li key={uuidv4()} className="board-row">{squareRows}</li>);
  }

  return <ul>{board}</ul>;
}
