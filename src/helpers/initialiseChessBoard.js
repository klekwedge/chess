import Pawn from "../pieces/pawn";
import Rook from "../pieces/rook";
import Horse from "../pieces/horse";
import Bishop from "../pieces/bishop";
import King from "../pieces/king";
import Queen from "../pieces/queen";

export default function initialiseChessBoard() {
  const squares = Array(64).fill(null);

  for (let i = 8; i < 16; i++) {
    squares[i] = new Pawn(2);
    squares[i + 40] = new Pawn(1);
  }

  squares[0] = new Rook(2);
  squares[7] = new Rook(2);
  squares[56] = new Rook(1);
  squares[63] = new Rook(1);

  squares[1] = new Horse(2);
  squares[6] = new Horse(2);
  squares[57] = new Horse(1);
  squares[62] = new Horse(1);

  squares[2] = new Bishop(2);
  squares[5] = new Bishop(2);
  squares[58] = new Bishop(1);
  squares[61] = new Bishop(1);

  squares[3] = new Queen(2);
  squares[4] = new King(2);

  squares[59] = new Queen(1);
  squares[60] = new King(1);

  return squares;
}
