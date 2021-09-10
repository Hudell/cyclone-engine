import '../../Core/main.min';
import { CustomEventData } from '../../Shared/CustomEventData';
import { loadFileAsync } from '../../Utils/loadFileAsync';
import { EventTriggers, EventPriorities } from './constants';

class CycloneEvents extends CyclonePlugin {
  static register() {
    super.initialize('CycloneEvents');

    super.register({
    });
  }
}

globalThis.CycloneEvents = CycloneEvents;
CycloneEvents.register();
