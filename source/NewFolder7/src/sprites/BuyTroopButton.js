import { TurnButton } from './TurnButton';

export class BuyTroopButton extends TurnButton {
  updateFrame() {
    if (CycloneNewFolder7.gold >= CycloneNewFolder7.getTroopPrice('blue')) {
      return super.updateFrame(this);
    }

    this.setFrame(0, 0, 48, 48);
  }
}