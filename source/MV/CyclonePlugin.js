import { objectFromEntries } from '../Utils/objectFromEntries';

if (Utils.RPGMAKER_NAME === 'MV') {
  CyclonePlugin.registerCommand = function(commandName, params, fn, mvParamOrder = []) {
    const callback = typeof params === 'function' ? params : fn;
    const paramMap = typeof params === 'function' ? {} : params;
    const paramOrder = Array.isArray(fn) ? fn : mvParamOrder;
    const plugin = this;

    const oldParsePluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      if (command.toLowerCase() === 'cyclone' && args.length > 0) {
        const [name, ...receivedArgs] = args;
        if (name === commandName) {
          const dataMap = new Map();

          for (let i = 0; i < receivedArgs.length; i++) {
            if (i >= paramOrder.length) {
              break;
            }

            dataMap.set(paramOrder[i], receivedArgs[i]);
          }

          const parsedArgs = plugin.loadParamMap(paramMap, dataMap);
          return callback({ ...objectFromEntries(dataMap), ...parsedArgs });
        }
      }

      return oldParsePluginCommand.call(this, command, args);
    }
  };
}