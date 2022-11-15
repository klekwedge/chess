import { v4 as uuidv4 } from "uuid";

interface IBasicFigure {
  player: number;
  style: any;
  id: string;
  initialPositions?: boolean
}

export default class BasicFigure implements IBasicFigure {
  player: number;
  style: any;
  id: string;

  constructor(player: number, iconUrl: string) {
    this.player = player;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
    this.id = uuidv4();
  }
}
