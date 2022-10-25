import { CustomEventDataPage } from './CustomEventDataPage';

export class CustomEventData {
  get pages() {
    return this._pages;
  }
  set pages(value) {
    this._pages = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get note() {
    return this._note;
  }

  set note(value) {
    this._note = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get page() {
    return this.pages[this._pageIndex];
  }

  constructor(id) {
    this.initialize(id);
  }

  initialize(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.name = 'Custom Event';
    this.pages = [new CustomEventDataPage()];
    this._pageIndex = 0;
  }

  addPage(page) {
    this.pages.push(page);
    return this.pages[this.pages.length - 1];
  }

  changePage(pageIndex) {
    this._pageIndex = pageIndex;
    while (this.pages.length <= pageIndex) {
      this.pages.push(new CustomEventDataPage());
    }
  }

  addCommand(command) {
    this.page.addCommand(command);
  }

  endPage() {
    this.page.end();
  }

  endAllPages() {
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].end();
    }
  }
}