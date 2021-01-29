import { pluginIsActive } from '../../Utils/pluginIsActive';

if (!pluginIsActive('CycloneMovement')) {
  throw new Error('CycloneEventsMovement requires CycloneMovement');
}

window.addPixelMovementToClass(Game_Event);