import { CyclonePlugin } from '../../Core/main';

class CycloneSteam extends CyclonePlugin {
  static register() {
    this.initialized = false;
    this.initialize('CycloneSteam');

    super.register({});

    if (typeof require !== 'function') {
      return;
    }

    try {
      this.greenworks = require('./greenworks');
    } catch (e) {
      this.greenworks = false;
      console.error('Greenworks failed to load. Make sure you copied all files from the Steamworks SDK to the right folders;');
      console.log('https://makerdevs.com/plugin/cyclone-steam');
      console.error(e);
      return;
    }

    this.initialized = this.greenworks.initAPI();
    if (!this.initialized) {
      console.error('Greenworks failed to initialize.');
      return;
    }

    this.steam = this.greenworks.getSteamId();
  }

  static get screenName() {
    if (!this.greenworks) {
      return 'Play Test';
    }

    return (this.steam && this.steam.screenName) || '';
  }

  static get uiLanguage() {
    if (!this.greenworks) {
      return 'english';
    }

    return this.greenworks.getCurrentUILanguage();
  }

  static get gameLanguage() {
    if (!this.greenworks) {
      return 'english';
    }

    return this.greenworks.getCurrentGameLanguage();
  }

  static get achievementCount() {
    if (!this.greenworks) {
      return 0;
    }
    return this.greenworks.getNumberOfAchievements();
  }

  static get running() {
    return this.greenworks && this.greenworks.isSteamRunning();
  }

  static get overlayEnabled() {
    return this.greenworks && this.greenworks.isGameOverlayEnabled();
  }

  static get dlcCount() {
    if (!this.greenworks) {
      return 0;
    }

    return this.greenworks.getDLCCount();
  }

  static get friendCount() {
    if (!this.greenworks) {
      return 0;
    }

    return this.greenworks.getFriendCount(this.greenworks.FriendFlags.Immediate);
  }

  static get cloudEnabled() {
    if (!this.greenworks) {
      return false;
    }

    return this.greenworks.isCloudEnabled();
  }

  static get userCloudEnabled() {
    if (!this.greenworks) {
      return false;
    }

    return this.greenworks.isCloudEnabledForUser();
  }

  static activateAchievement(achievementId) {
    if (!achievementId) {
      console.error('Achievement name not provided.');
      return;
    }

    if (!this.greenworks) {
      console.log(`Activate Achievement ${ achievementId }`);
      return;
    }

    if (!this.running) {
      return;
    }

    this.greenworks.activateAchievement(achievementId, () => {
      console.log(`Achievement activated: ${ achievementId }`);
    }, () => {
      console.log(`Failed to activate achievement: ${ achievementId }`);
    });
  }

  static getAchievement(achievementId) {
    if (!achievementId) {
      console.error('Achievement name not provided.');
      return false;
    }

    if (!this.greenworks) {
      return false;
    }

    if (!this.running) {
      return;
    }

    return this.greenworks.getAchievement(achievementId, () => {
      // #ToDo
    }, () => {
      console.log(`Failed to check achievement: ${ achievementId }`);
    });
  }

  static clearAchievement(achievementId) {
    if (!achievementId) {
      console.error('Achievement name not provided.');
      return;
    }

    if (!this.greenworks) {
      console.log(`Clear achievement ${ achievementId }`);
      return;
    }

    if (!this.running) {
      return;
    }

    this.greenworks.clearAchievement(achievementId, () => {
      console.log(`Successfully cleared achievement: ${ achievementId }`);
    }, () => {
      console.log(`Failed to clear achievement: ${ achievementId }`);
    });
  }

  static activateGameOverlay(option) {
    if (!this.running) {
      return false;
    }

    this.greenworks.activateGameOverlay(option);
  }

  static activateGameOverlayToWebPage(url) {
    if (!this.running) {
      return false;
    }

    this.greenworks.activateGameOverlayToWebPage(url);
  }

  static isDLCInstalled(dlcAppId) {
    if (!this.running) {
      return false;
    }

    return this.greenworks.isDLCInstalled(dlcAppId);
  }

  static installDLC(dlcAppId) {
    if (!this.running) {
      return;
    }

    return this.greenworks.installDLC(dlcAppId);
  }

  static uninstallDLC(dlcAppId) {
    if (!this.running) {
      return;
    }

    return this.greenworks.uninstallDLC(dlcAppId);
  }

  static getStatInt(name) {
    if (!this.running) {
      return 0;
    }

    return this.greenworks.getStatInt(name);
  }

  static getStatFloat(name) {
    if (!this.running) {
      return 0;
    }

    return this.greenworks.getStatFloat(name);
  }

  static setStat(name, value) {
    console.log('Change Stat', name, value);
    if (!this.running) {
      return 0;
    }

    this.greenworks.setStat(name, value);
  }

  static storeStats() {
    console.log('Store Stats');
    if (!this.running) {
      return;
    }

    this.greenworks.storeStats(() => {
      console.log('Store stats: success');
    }, () => {
      console.log('Store stats: failed');
    });
  }

  static isSubscribedApp(appId) {
    if (!this.running) {
      return false;
    }

    return this.greenworks.isSubscribedApp(appId);
  }
}

globalThis.CycloneSteam = CycloneSteam;
CycloneSteam.register();