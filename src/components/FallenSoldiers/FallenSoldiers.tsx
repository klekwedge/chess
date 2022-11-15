import Square from "../Square/Square";

export default function FallenSoldierBlock({
  whiteFallenSoldiers,
  blackFallenSoldiers,
}: any): JSX.Element {
  const renderSquare = (square: any) => {
    return <Square piece={square} style={square.style} />;
  };

  return (
    <>
      <div className="fallen-soldiers__row">
        {whiteFallenSoldiers.map((whiteFigure: any) => renderSquare(whiteFigure))}
      </div>
      <div className="fallen-soldiers__row">
        {blackFallenSoldiers.map((blackFigure: any) => renderSquare(blackFigure))}
      </div>
    </>
  );
}
