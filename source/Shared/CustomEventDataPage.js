import { CustomEventDataPageCondition } from './CustomEventDataPageCondition';
import { CustomEventDataPageImage } from './CustomEventDataPageImage';
import { CustomEventDataPageMoveRoute } from './CustomEventDataPageMoveRoute';

export class CustomEventDataPage {

  get conditions() {
    return this._conditions;
  }
  set conditions(value) {
    this._conditions = value;
  }
  get directionFix() {
    return this._directionFix;
  }
  set directionFix(value) {
    this._directionFix = value;
  }
  get image() {
    return this._image;
  }
  set image(value) {
    this._image = value;
  }
  get list() {
    return this._list;
  }
  set list(value) {
    this._list = value;
  }
  get moveFrequency() {
    return this._moveFrequency;
  }
  set moveFrequency(value) {
    this._moveFrequency = value;
  }
  get moveRoute() {
    return this._moveRoute;
  }
  set moveRoute(value) {
    this._moveRoute = value;
  }
  get moveSpeed() {
    return this._moveSpeed;
  }
  set moveSpeed(value) {
    this._moveSpeed = value;
  }
  get moveType() {
    return this._moveType;
  }
  set moveType(value) {
    this._moveType = value;
  }
  get priorityType() {
    return this._priorityType;
  }
  set priorityType(value) {
    this._priorityType = value;
  }
  get stepAnime() {
    return this._stepAnime;
  }
  set stepAnime(value) {
    this._stepAnime = value;
  }
  get through() {
    return this._through;
  }
  set through(value) {
    this._through = value;
  }
  get trigger() {
    return this._trigger;
  }
  set trigger(value) {
    this._trigger = value;
  }
  get walkAnime() {
    return this._walkAnime;
  }
  set walkAnime(value) {
    this._walkAnime = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.conditions = new CustomEventDataPageCondition();
    this.directionFix = false;
    this.image = new CustomEventDataPageImage();
    this.list = [{
      code: 0,
      indent: 0,
      parameters: [],
    }];
    this.moveFrequency = 3;
    this.moveRoute = new CustomEventDataPageMoveRoute();
    this.moveSpeed = 3;
    this.moveType = 0;
    this.priorityType = 1;
    this.stepAnime = true;
    this.through = false;
    this.trigger = 0;
    this.walkAnime = true;

    this._indent = -1;
  }

  addCommand(command) {
    if (command instanceof Array) {
      for (let i = 0; i < command.length; i++) {
        this.addCommand(command[i]);
      }
    } else {
      // When you add a command on the page for the first time, the script will remove the auto-added "end" command. Make sure to add your own or call .end().
      if (this.list.length == 1 && this.list[0].code === 0) {
        this.list = [];
        this._indent = 0;
      }

      command.indent = this._indent;
      this.list.push(command);

      if (command.code === 0) {
        this._indent -= 1;
      }
    }
  }

  increaseIndent() {
    this._indent += 1;
  }

  end() {
    while (this._indent >= 0) {
      this.addCommand({
        code: 0
      });
    }
  }

  callScriptOrCommonEvent(scriptOrCommonEventId) {
    let commandCode = undefined;

    if (scriptOrCommonEventId !== undefined) {
      if (typeof(scriptOrCommonEventId) == 'number') {
        commandCode = 117;
      } else if (typeof(scriptOrCommonEventId) == 'string') {
        commandCode = 355;
      }
    }

    if (commandCode !== undefined) {
      this.addCommand({
        code: commandCode,
        parameters: [scriptOrCommonEventId]
      });
    }
  }

}