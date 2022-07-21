import '../../Core/main.min';

class CycloneAsync extends CyclonePlugin {
  static register() {
    this.initialize('CycloneAsync');

    super.register({});

    this.registerCommand('asyncWait', function() {
      this.waitForAsyncJobs();
    });

    this.registerCommand('asyncKill', () => {
      $gameMap.killAsyncJobs();
    });
  }
}

globalThis.CycloneAsync = CycloneAsync;
CycloneAsync.register();