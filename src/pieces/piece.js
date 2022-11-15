import { v4 as uuidv4 } from "uuid";

export default class Piece {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
    this.id = uuidv4();
  }
}
