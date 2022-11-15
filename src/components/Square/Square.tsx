
export default function Square({shade, onClick, style}: any) {
  return (
    <button
      className={"square " + shade}
      onClick={onClick}
      style={style}
    ></button>
  );
}
