export class CustomEventDataPageCondition {
  get actorId() {
    return this._actorId;
  }
  set actorId(value) {
    this._actorId = value;
  }
  get actorValid() {
    return this._actorValid;
  }
  set actorValid(value) {
    this._actorValid = value;
  }
  get itemId() {
    return this._itemId;
  }
  set itemId(value) {
    this._itemId = value;
  }
  get itemValid() {
    return this._itemValid;
  }
  set itemValid(value) {
    this._itemValid = value;
  }
  get selfSwitchCh() {
    return this._selfSwitchCh;
  }
  set selfSwitchCh(value) {
    this._selfSwitchCh = value;
  }
  get selfSwitchValid() {
    return this._selfSwitchValid;
  }
  set selfSwitchValid(value) {
    this._selfSwitchValid = value;
  }
  get switch1Id() {
    return this._switch1Id;
  }
  set switch1Id(value) {
    this._switch1Id = value;
  }
  get switch1Valid() {
    return this._switch1Valid;
  }
  set switch1Valid(value) {
    this._switch1Valid = value;
  }
  get switch2Id() {
    return this._switch2Id;
  }
  set switch2Id(value) {
    this._switch2Id = value;
  }
  get switch2Valid() {
    return this._switch2Valid;
  }
  set switch2Valid(value) {
    this._switch2Valid = value;
  }
  get variableId() {
    return this._variableId;
  }
  set variableId(value) {
    this._variableId = value;
  }
  get variableValid() {
    return this._variableValid;
  }
  set variableValid(value) {
    this._variableValid = value;
  }
  get variableValue() {
    return this._variableValue;
  }
  set variableValue(value) {
    this._variableValue = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.actorId = 1;
    this.actorValid = false;
    this.itemId = 1;
    this.itemValid = false;
    this.selfSwitchCh = 'A';
    this.selfSwitchValid = false;
    this.switch1Id = 1;
    this.switch1Valid = false;
    this.switch2Id = 1;
    this.switch2Valid = false;
    this.variableId = 1;
    this.variableValid = false;
    this.variableValue = 0;
  }

  clearConditions() {
    this.actorValid = false;
    this.itemValid = false;
    this.selfSwitchValid = false;
    this.switch1Valid = false;
    this.switch2Valid = false;
    this.variableValid = false;
  }

  addActorCondition(actorId) {
    this.actorId = actorId;
    this.actorValid = true;
  }

  addItemCondition(itemId) {
    this.itemId = itemId;
    this.itemValid = true;
  }

  addSelfSwitchCondition(selfSwitchCh) {
    this.selfSwitchCh = selfSwitchCh;
    this.selfSwitchValid = true;
  }

  addSwitch1Condition(switchId) {
    this.switch1Id = switchId;
    this.switch1Valid = true;
  }

  addSwitch2Condition(switchId) {
    this.switch2Id = switchId;
    this.switch2Valid = true;
  }

  addVariableCondition(variableId, value) {
    this.variableId = variableId;
    this.variableValue = value;
    this.variableValid = true;
  }
}