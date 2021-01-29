import { DirectionHelper } from '../../../Utils/DirectionHelper';

GGJ.patchClass(Game_Event, $super => class {
  setDirection(d) {
    if (DirectionHelper.goesLeft(d)) {
      $super.setDirection.call(this, 4);
    } else if (DirectionHelper.goesRight(d)) {
      $super.setDirection.call(this, 6);
    }
  }

  moveDiagonally(horz, vert) {
    $super.moveDiagonally.call(this, horz, vert);
    this.setDirection(horz);
  }
});