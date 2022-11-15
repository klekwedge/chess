import "../../index.css";
import Square from "../Square/Square";

export default function FallenSoldierBlock({
  whiteFallenSoldiers,
  blackFallenSoldiers,
}: any): JSX.Element {
  const renderSquare = (square: any) => {
    return <Square piece={square} style={square.style} />;
  };

  return (
    <div>
      <div className="board-row">
        {whiteFallenSoldiers.map((ws: any) => renderSquare(ws))}
      </div>
      <div className="board-row">
        {blackFallenSoldiers.map((bs: any) => renderSquare(bs))}
      </div>
    </div>
  );
}
