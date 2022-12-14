import Piece from "./figure";

export default class Knight extends Piece {
  constructor(player: number) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
    );
  }

  isMovePossible(src: number, dest: number) {
    return (
      src - 17 === dest ||
      src - 10 === dest ||
      src + 6 === dest ||
      src + 15 === dest ||
      src - 15 === dest ||
      src - 6 === dest ||
      src + 10 === dest ||
      src + 17 === dest
    );
  }

  getSrcToDestPath() {
    return [];
  }
}
