import "../../index.css";
import Square from "../Square/Square";

export default function FallenSoldierBlock(props) {
  const renderSquare = (square, i, squareShade) => {
    return <Square piece={square} style={square.style} />;
  };

  return (
    <div>
      <div className="board-row">
        {props.whiteFallenSoldiers.map((ws, index) => renderSquare(ws, index))}
      </div>
      <div className="board-row">
        {props.blackFallenSoldiers.map((bs, index) => renderSquare(bs, index))}
      </div>
    </div>
  );
}
