import { TEAMS } from '../consts';
import { BuyTowerButton } from '../sprites/BuyTowerButton';
import { BuyTroopButton } from '../sprites/BuyTroopButton';
import { TurnButton } from '../sprites/TurnButton';

export class WindowHud extends Window_Base {
  initialize() {
    super.initialize(0, 0, 150, Graphics.height);

    this.padding = 0;
    this.refresh();
    this.opacity = 255;

    this.backOpacity = 255;
    this.deactivate();

    this.createButtons();
  }

  standardPadding() {
    return 0;
  }

  createContents() {
    this._padding = 0;
    super.createContents();
  }

  refresh() {
    this.contents.clear();

    this._lastGold = CycloneNewFolder7.gold;
    this._lastTerritory = CycloneNewFolder7.territory;
    this._lastGoldChange = CycloneNewFolder7.goldChange;
    this._lastPrice = CycloneNewFolder7.getTroopPrice();
    this._lastTeam = CycloneNewFolder7.currentTeam;
    this._freeWarriors = CycloneNewFolder7.countFreeTroops();
    this._totalWarriors = CycloneNewFolder7.countTroops();
    this._lastConnectedTiles = CycloneNewFolder7.connectedTiles();

    this.drawIcon(10, 12, 16);
    this.drawText(String(this._lastGold), 44, 16, 90, 'right');

    this.drawIcon(112, 12, 48);
    this.drawText(String(this._lastGoldChange), 44, 48, 90, 'right');

    this.drawIcon(32, 12, 80);
    this.drawText(String(this._lastTerritory), 44, 80, 90, 'right');

    this.drawIcon(21, 12, 112);
    this.drawText(String(this._lastConnectedTiles), 44, 112, 90, 'right');

    this.drawIcon(115, 12, 144);
    this.drawText(String(this._totalWarriors), 44, 144, 90, 'right');

    this.drawIcon(113, 12, 176);
    this.drawText(String(this._freeWarriors), 44, 176, 90, 'right');


    if (CycloneNewFolder7.currentTeam === TEAMS.blue) {
      this.drawText(`-${this._lastPrice}g`, 44, 249, 90, 'right');
      // this.drawText('-20g', 44, 303, 90, 'right');
    }
  }

  needsRefresh() {
    if (this._lastGold !== CycloneNewFolder7.gold) {
      return true;
    }

    if (this._lastTerritory !== CycloneNewFolder7.territory) {
      return true;
    }

    if (this._lastConnectedTiles !== CycloneNewFolder7.connectedTiles()) {
      return true;
    }

    if (this._lastGoldChange !== CycloneNewFolder7.goldChange) {
      return true;
    }

    if (this._lastPrice !== CycloneNewFolder7.getTroopPrice()) {
      return true;
    }

    if (this._lastTeam !== CycloneNewFolder7.currentTeam) {
      return true;
    }

    return false;
  }

  update() {
    super.update();
    if (this.needsRefresh()) {
      this.refresh();
    }
  }

  requestRefresh() {
    this._lastGold = -1;
  }

  createButtons() {
    const bitmap = ImageManager.loadSystem('ButtonSet');
    const button = new TurnButton();

    button.bitmap = bitmap;
    button.setColdFrame(160, 0, 128, 48);
    button.setHotFrame(160, 48, 128, 48);
    this.addChild(button);

    button.x = 12;
    button.y = Graphics.height - 60;

    button.setClickHandler(() => {
      CycloneNewFolder7.skipTurn();
    });

    const addButton = new BuyTroopButton();
    addButton.bitmap = bitmap;
    addButton.setColdFrame(112, 0, 48, 48);
    addButton.setHotFrame(112, 48, 48, 48);
    this.addChild(addButton);

    addButton.x = 12;
    addButton.y = 244;
    addButton.setClickHandler(() => {
      if (CycloneNewFolder7.canAffordNewTroop()) {
        $gameMap.prepareToAddTroop();
      }
    });

    // const addPawn = new BuyTowerButton();
    // addPawn.bitmap = bitmap;
    // addPawn.setColdFrame(64, 0, 48, 48);
    // addPawn.setHotFrame(64, 48, 48, 48);
    // this.addChild(addPawn);

    // addPawn.x = 12;
    // addPawn.y = 296;
    // addPawn.setClickHandler(() => {
    //   if (CycloneNewFolder7.canAffordNewTroop()) {
    //     $gameMap.prepareToAddTroop();
    //   }
    // });


  }
}
