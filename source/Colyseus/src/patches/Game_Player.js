CycloneColyseus.patchClass(Game_Player, $super => class {
  moveStraight(d) {
    $super.moveStraight.call(this, d);

    CycloneColyseus.sendPlayerPosition();
  }

  moveDiagonally(horz, vert) {
    $super.moveDiagonally.call(this, horz, vert);
    CycloneColyseus.sendPlayerPosition();
  }
});
