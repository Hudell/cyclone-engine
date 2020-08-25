/*:
 * @target MZ
 * @plugindesc Live Map Editor
 *
 * <pluginName:CycloneMapEditor>
 * @author Hudell
 * @url https://makerdevs.com/plugin/cyclone-map-editor
 * @orderAfter Cyclone-Core
 *
 * @help
 * ===========================================================================
 *                                    88
 *                                    88
 *                                    88
 *   ,adPPYba, 8b       d8  ,adPPYba, 88  ,adPPYba,  8b,dPPYba,   ,adPPYba,
 *  a8"     "" `8b     d8' a8"     "" 88 a8"     "8a 88P'   `"8a a8P_____88
 *  8b          `8b   d8'  8b         88 8b       d8 88       88 8PP"""""""
 *  "8a,   ,aa   `8b,d8'   "8a,   ,aa 88 "8a,   ,a8" 88       88 "8b,   ,aa
 *   `"Ybbd8"'     Y88'     `"Ybbd8"' 88  `"YbbdP"'  88       88  `"Ybbd8"'
 *                 d8'
 *                d8'
 * Live  Map Editor 1.00.00                                          by Hudell
 * ===========================================================================
 * Terms of Use
 * ===========================================================================
 * 1. For support, feature requests or bug reports, you may contact me through
 *  any of the following channels (in order of preference):
 *
 *   1.a. Opening an issue on the plugin's GitHub repository:
 *      https://github.com/Hudell/cyclone-engine
 *   1.b. Tagging me on threads on Rpg Maker related Forums, such as:
 *      rpgmakerweb.com (English)
 *      centrorpg.com (Portuguese)
 *      condadobraveheart.com (Portuguese)
 *   1.c. Opening threads on the plugin's itch.io page
 *   1.d. Tagging my user on Rpg Maker related sub-reddits, such as r/rpgmaker
 *
 * 2. Do not send me Direct Messages asking for support or bug reports.
 * You may only send me direct messages when none of the above platforms are
 * appropiate for it, or when you want to share pictures of cute dogs.
 *
 * 3. A special exception is created for patreon users who get access to my
 * priority support discord server.
 *
 * 4. Sending plugin related questions on channels related to any of my other
 * projects (such as my game's Discord server) may result in an immediate ban
 * from such platforms and I may also choose to ignore your future requests.
 *
 * 5. This plugin is released under the Apache License 2.0 (Apache-2.0).
 *
 * 6. You can send me your own changes to this plugin if you wish to see them
 * included in an update, by registering a Pull Request on the plugin's GitHub
 * repository.
 *
 * 7. This plugin is provided as is. While I'll often read feedback and offer
 * updates to my plugins, I am in no obligation to do so.
 *
 * 8. I'm not responsible for anything created with this plugin.
 * ===========================================================================
 * Did you know?
 * Early map makers used to include fake towns on their maps to identify
 * copies of their work.
 * ===========================================================================
 *
 * @param regionIcons
 * @text Region Icons
 * @type struct<RegionIcon>[]
 * @desc Configure certain regions to display an icon instead of the number
 *
 **/

/*~struct~RegionIcon:
 * @param regionId
 * @text Region Id
 * @type number
 * @desc The regionId to display an icon on
 *
 * @param icon
 * @text Icon
 * @type number
 * @desc The number of the icon for this region
 */

CycloneEngine.requireVersion(2, 'CycloneMapEditor');

(() => {
  let windowWidth = 408;
  const statusHeight = 40;
  const layerVisibility = [true, true, true, true, true, false];
  let editorActive = true;

  let currentLayer = 0;
  let currentTab = 'A';
  let currentTileId = 0;
  let tileCols = 1;
  let tileRows = 1;
  let selectedTileList = [];
  let tileWidth = 48;
  let tileHeight = 48;
  let currentTool = 'pencil';
  let lastDrawingTool = 'pencil';
  let wasPressing = false;
  let isRightButtonDown = false;
  let wasRightButtonDown = false;
  let rectangleStartMouseX = 0;
  let rectangleStartMouseY = 0;
  let rectangleStartX = 0;
  let rectangleStartY = 0;
  let rectangleWidth = 0;
  let rectangleHeight = 0;
  let rectangleBackWidth = 0;
  let rectangleBackHeight = 0;
  const tabs = ['A', 'B', 'C', 'D', 'E'];
  let changeHistory = [];
  let undoHistory = [];
  let currentChange = false;
  let previewChanges = {};
  let messySelection = false;
  let showGrid = true;
  let lastDisplayX = 0;
  let lastDisplayY = 0;
  let statusTileId = 0;
  let statusMapX = 0;
  let statusMapY = 0;
  let statusTile1 = 0;
  let statusTile2 = 0;
  let statusTile3 = 0;
  let statusTile4 = 0;
  let statusRegion = 0;
  let gridPreviewBlockHandler = false;
  let gridNeedsRefresh = false;

  const pencilIcon = new Image();
  pencilIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQUOhdRws4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABGElEQVRIx9XUIW/CQBiA4ZcFwRQhkEEysEdSNAoFPwKBmcXO4FBTwxB+Av8BDQo1PQi1sGSChKBGMsHUkR7XMnpfQ8KnWvO8vVzv4N4nJQV+Doejfn7MZCwvLcVbShnv55G0FB88P+E1agC0lLIiDyL8NUe5n2cx/wRg0m6eIs4BA6+WAIyInko2e4wdCMMBNqtvaP9akVh7cBEHytUSna8lU99HFYvxftOr8K6Jr/f71FUBCf5vQIpfDCSBRwaSwkMDSeLWOdB4/6VJb7gT45EHreDVGb336HSXItwIBL9ej16JKx66goJXB2C7+DhFXHFjk4N3u17F23gG4IxHBvRMfR/AGbd+0+A9HoRd8dBzoO9xKXyz+QMErgZJQZj0xAAAAABJRU5ErkJggg==';

  const lineIcon = new Image();
  lineIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVD1j5N6wAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAeklEQVRIx2NgGAWjYBTQHDAic77/+PGfGoZycnDAzWVBNtxJTY0qrv7+48d/mCUs6JJ89XsYpJ1VyTb8up08AwMDA4MsP///xx8/MjKhK6DE8Kd7b2OIseByAbUAC3LEUCuS1cTFsaciWNhRw5LHHz8yjmbSUTAKIAAAHrcgEXUU5YwAAAAASUVORK5CYII=';

  const rectangleIcon = new Image();
  rectangleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVGNsqsmsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA0klEQVRIx2NgGAUEACM2we8/fvwnxzBODg4M81iwGe6kpkaWa7//+PEf3RIWbIbz1e9hkHZWJcnwp3tvMzipqWFYwoJNsbSzKsPTvbdJskDaWZXhUyOELcvP///xx4+MDAwMDEz4NL3beozh3dZjRPOxASZCLhPytkJho/MJASZiDSdXDROt8wHBOCAEKI4DmvpgNA6I8gGhjEYIsJASvoT4RFvwdO9tsgo7ouoDSorrfbduMaiJizMwMDAwwAo7qlY46IbjtABW5JJjCbLhwwMAAI5+ZZrvEYecAAAAAElFTkSuQmCC';

  const fillIcon = new Image();
  fillIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVI2ohW08AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABpElEQVRIx82VMUtCURiGH0PQlhxFwusSBxyCwKGMKLiELc5uIQ0FDtFWUzQb1B/oB0Q2NCfq4OQ/EE4tInFxKGlKabgNcS733vQeFaPOdM65l+f9vu+83znw38bHYGB/DAb2pP+Hp4WbQjjzxWg0NNfIs4Zh3x+s2d3bdTtrGBNlsjCLWKs6pFJOYAqBTmQmgev6m2edjMXsuQr8inNU/bOG4TmDZCxmB2UwlYteF1cp5gGkZ7/7/h6auUTKmsX8DgBbx+cA3DzWMIVA9nqzu2gUvH1ZcL4rkSAnhSeBP2TOudr83t/IRWhVh6TXfoqMarxQEHzpogZAadliJZUA4LljAThrtVc+2qchJX4R7RmUlq0fYD880z8d23haAT9MCbnh/uG2bWhcedLNDu3tlFNnN1iNTP+UVnXIRi5C4cyiISUiHvdYV5tBQ0oO93Y9mQB83p1o4VqBdLODKYQj4oYrRwXBp+rkhpSYQlApJyAXAdDCtQIv9SdnLuJxZK+HenCUaBBce7mNutDUkznJRTe20RRIRe6P0A2dKvJRftZF+OfjCySNE5ddU05FAAAAAElFTkSuQmCC';

  const eraseIcon = new Image();
  eraseIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVLhSQJ/IAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABK0lEQVRIx2NgGAUEACMxir7/+PEfXYyTg4MovSzEGO6kpkbQUlwWshBj+EwDNQZpNWm4+NNbTxnQLf3+48d/bJawEONNZMNh/C1oYk5qalgtYSLG9YTA01tP4WxZfv7/RFmAy/WkAiZqup5oC0h1/ek7z4i3gBzXz/nyhWHfrVsMauLixCdT7t4Ohg9Q9pO7Txh09qwnyvWPP35kxGkBzPUdsyahaJJRlmH4oJyLInZw53YGk1tP8boeZxzIKMvgDZond58wMDAwMJxxs8freqKSKTZw985lBgYGBobZXbPxuh5nHMBciM1H6HL4XE90UYFsKCmux7CAk4ODEVvpiR7pxLoeqw9glqAXZOiAGNfjrXCQC61bL19iyMMMx+d6oms0bKUkMYYPDwAArdGaa9wnQ0IAAAAASUVORK5CYII=';

  const saveIcon = new Image();
  saveIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVN3D7jzIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA4ElEQVRIx2NgGAUDDRhxSXz/8eM/KQZxcnBgNYsFl+FOamokufT7jx//sVnCgstwC6dMBgl1RQZ1Q0kGFXlJrIbeefic4eb55wwvbt5ncFJTw2oJEy4XSagrMjAwMOA0PNXdBUMtAwMDgyw//3+iLKAWIGjBnYfPsYqXz1pMlAUshBTcPA8JZ5r5gFJA0Acvbt7HK48cwWRZgM8QQpYTbQExBg1fHzARMvTEvukMEuqKWPGJfdMJOoCRWoXdvlu3GNTExRkYGBgYHn/8yEj14hqb4XgtwFZwEQLoho8CogAAz0BbPsc/fBQAAAAASUVORK5CYII=';

  const reloadIcon = new Image();
  reloadIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWA3piKEQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABe0lEQVRIx9VVq7KDMBDdzCBARVbcwaaytpoavoUf4Bv6A/0WDGgsklgGUYkqjorOMpvthuSaO3PXpSTn7OPsKcB/DxVz6bWuG/8tS9Oot0kMaGGM9zsS8fMhwWtdNwr6uP/A+ZLv53GYdlIEpmdKonzgHFSKcZigqmcniVvZQ2ftXkkigbfNVQThFZ0vObTNB5Qnk2u9TcuikiPwW9kDAEBnrfP40455J6JvooaMWSOwOZ2c7/b5hMIYqOoZ2iaPU1GWpooOt7PWAZ6WRfkqjZYpktCsEViqkvd9HKbwoklLxfXNZUyDVu4MOfSQ6ptWyoNXnsTqvzDmiyTXeqOD5/MSVSSB096ivqXBI1GWpmEvknaBy5XaBFbOKw0StM0VbmUPhTG0DY7/SJL92mQpc7qp1OB8Jog+RCv1bjIAQFXP8LiD4zuhzecqUj6Zok3gWbJsaoIS+OGi4WXsu7Qf1AR9my/aAOobL+dab1TnHFTS/6/+kzlxCPRP4w3A6io0yt+JDgAAAABJRU5ErkJggg==';

  const undoIcon = new Image();
  undoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWHYBtFScAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABKUlEQVRIx+1Uq7LCMBA97URwMchiro2s7AdUFF3db0H1W9DVRfABlZWx14DEAK6Ym50lbJqAwXBmOtNNZs7Zx9kAX3waie/iertNAPCzWCQ8dmHvfVA+8lLrByEbhxIJCljyZbtGXeREbGMXPBFJJPWVxsl85ADQ9BWW7Rql1mIbVWhITV/R/26zf7izwnWRo2tBIrySNNYN3TACAA7G0HfZHumcV/i7Wk0vC9RFjqavqOc6y0hkDmko49BZCErytXXSDs/ZHYyBzrL3BbiIdGfJ/87nBMD0loBbCc/enE42pH2Za5+aeypKrcmm3TA+bTPfj8v2KLZPveIi9HmUIf7bF98i3yZ3w0g29Q0/CWXuzkFylTD8eIG5p5oTS+TRAu76u5CIv4jGHaoeqH4byFz/AAAAAElFTkSuQmCC';

  const redoIcon = new Image();
  redoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWJahvrbkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABIklEQVRIx+1VqxaCQBC96yGAhYjFupHoBxDsZr/FxLeYyRQ/gEikWiRalIZBhzMsuzBosHDPIeze3TvPHYAF/4aSHHo2TWvbD3xfcZ7WHJ5EONFaxD+bpjWNeGPidPGY7wd8VpTgPK1NI6sx8XW6sYoDwGEXY51uemvCNgxbZwRcnC5lRYnH6dY7d8z3bz6PR+u3chGm+KWquo/2JfCmDpC4jiJUdY1Ea2faZkUwBpv3roi8OcKB7yuq0Rm3AU+Rfm2AG7FxJH6939Wkgawou1ZMtEZV1wDQCfPHxz3n4lYDPA3IYxx2MbJ0+Jp5G5MDs0cFRSHpd3pgZgRKMiq4t6YDvI1tKVK/DLup/IvG9TYM20+BIe2c2f8Dc4CZcIkvEOEFIdSyhtt+PqwAAAAASUVORK5CYII=';

  const hiddenIcon = new Image();
  hiddenIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWFPmxrYMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABBElEQVRIx+2UMQqDMBSGf4uDTo6dXCMIXsJLCEIPUfAYBc8gQqF3EM/woFBo1k4dOzWbnSJRk5jSsf4gmOfL95u8lwCbNv0qzzXxLcSgjsMgcJrru4JzxrTxNSN/DS7BVV1Pvsn4W4jBZuKtwSU4STMAwP12neSdjkf0nBtXsluDJ2k2wlUREZI0Q1XXyBlb1MhoMIdLXc7t4u/lymwmO9MWEdFkXJQHENH4FOVBmxtH0WAtchgEnlpcFaS+qyvrmgY952D7vVsXzU108Mu5BYAF/PF6eU5tqjNR1TUNAFjhTifZdNB6zgHACne+KuIoGvjzOYmp+22Cf3UX6TrEBt70R/oAQESSsFk1AwIAAAAASUVORK5CYII=';

  const visibleIcon = new Image();
  visibleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWDOrdNdUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABOUlEQVRIx+2Uu07DMBSG/6AM6WR1apdYQkiRMrUbZM1SXgB2RkYY8hBdsvYJOtCpEqqYuvQpsIQiAQOdok7xdphOidM2NmIkv+ThHNvfufgCdOr0V3muCyutqW73gsBpr+8KTqPoqN8WyLfBGTyfxcYc+yutqS2Ib4MzeJguDTD70yiyBjkKT6SkYjWhSmtjJFJSIiUt7sZUaU3FakKJlNQ8I9ZZW+acNQA8318dnANXNp/F+0qcW/T5+oVh+mPH2RMecWvY9bWsUAj62O08pxZt8tFBi5pjk4/2LQqFoFAIslbQCwKPWzXFJQCgf73AxbkEALwV7yhfbgAAWV5irRSiwQAA0Mzec72m04e+MZflJQC0wp1e8qmHtlYKAFrhzl9FKASp7dbwMbgN/qu/iAPVbett6fQ/9A0c7tBBCKKL7gAAAABJRU5ErkJggg==';

  const regionColors = [
    '#e75858',
    '#c0986f',
    '#cbcf32',
    '#8ab24c',
    '#22aa47',
    '#1cbf97',
    '#7ec1df',
    '#4da4dc',
    '#4f36a9',
    '#725fb9',
    '#d48de4',
    '#fa5e84'
  ];

  const _ = '';
  const o = true;
  const x = false;
  const autoTileShapeTable = [
    // o means there's a compatible tile on that position,
    // x means there is no compatible tile on that position
    // _ means that position doesn't matter
    [o, o, o, o, o, o, o, o], // 0
    [x, o, o, o, o, o, o, o], // 1
    [o, o, x, o, o, o, o, o], // 2
    [x, o, x, o, o, o, o, o], // 3
    [o, o, o, o, o, o, o, x], // 4
    [x, o, o, o, o, o, o, x], // 5
    [o, o, x, o, o, o, o, x], // 6
    [x, o, x, o, o, o, o, x], // 7
    [o, o, o, o, o, x, o, o], // 8
    [x, o, o, o, o, x, o, o], // 9
    [o, o, x, o, o, x, o, o], //10
    [x, o, x, o, o, x, o, o], //11
    [o, o, o, o, o, x, o, x], //12
    [x, o, o, o, o, x, o, x], //13
    [o, o, x, o, o, x, o, x], //14
    [x, o, x, o, o, x, o, x], //15
    [_, o, o, x, o, _, o, o], //16
    [_, o, x, x, o, _, o, o], //17
    [_, o, o, x, o, _, o, x], //18
    [_, o, x, x, o, _, o, x], //19
    [_, x, _, o, o, o, o, o], //20
    [_, x, _, o, o, o, o, x], //21
    [_, x, _, o, o, x, o, o], //22
    [_, x, _, o, o, x, o, x], //23
    [o, o, _, o, x, o, o, _], //24
    [o, o, _, o, x, x, o, _], //25
    [x, o, _, o, x, o, o, _], //26
    [x, o, _, o, x, x, o, _], //27
    [o, o, o, o, o, _, x, _], //28
    [x, o, o, o, o, _, x, _], //29
    [o, o, x, o, o, _, x, _], //30
    [x, o, x, o, o, _, x, _], //31
    [_, o, _, x, x, _, o, _], //32
    [_, x, _, o, o, _, x, _], //33
    [_, x, _, x, o, _, o, o], //34
    [_, x, _, x, o, _, o, x], //35
    [_, x, _, o, x, o, o, _], //36
    [_, x, _, o, x, x, o, _], //37
    [o, o, _, o, x, _, x, _], //38
    [x, o, _, o, x, _, x, _], //39
    [_, o, o, x, o, _, x, _], //40
    [_, o, x, x, o, _, x, _], //41
    [_, x, _, x, x, _, o, _], //42
    [_, x, _, x, o, _, x, _], //43
    [_, o, _, x, x, _, x, _], //44
    [_, x, _, o, x, _, x, _], //45
    [_, x, _, x, x, _, x, _]  //46
  ];

  class CycloneMapEditor extends CyclonePlugin {
    static get currentLayer() {
      return currentLayer;
    }
    static get currentTab() {
      return currentTab;
    }
    static get active() {
      return editorActive;
    }
    static get layerVisibility() {
      return layerVisibility;
    }

    static register() {
      CycloneEngine.structs.set('CycloneRegionIcon', {
        regionId: 'int',
        icon: 'int',
      });

      super.register('CycloneMapEditor', {
        regionIcons: {
          type: 'struct<CycloneRegionIcon>[]',
          defaultValue: '[]',
        },
      });

      document.addEventListener('keydown', (...args) => {
        this.onKeyDown(...args);
      });
      document.addEventListener('keypress', (...args) => {
        this.onKeyPress(...args);
      });
      document.addEventListener('keyup', (...args) => {
        this.onKeyUp(...args);
      });

      const regionIcons = this.params.get('regionIcons');
      this.regionIcons = new Map();
      if (regionIcons) {
        for (const { regionId, icon } of regionIcons) {
          if (regionId && icon) {
            this.regionIcons.set(regionId, icon);
          }
        }
      }

      this.addMenuBar();
    }

    static addMenuBar() {
      const menu = new nw.Menu({ type: 'menubar' });

      const fileMenu = new nw.Menu();
      fileMenu.append(new nw.MenuItem( {
        label: 'Save',
        key: 's',
        modifiers: 'ctrl',
        click: () => {
          CycloneMapEditor.saveButton();
        }
      }));
      fileMenu.append(new nw.MenuItem( {
        label: 'Reload',
        key: 'r',
        modifiers: 'ctrl',
        click: () => {
          CycloneMapEditor.reloadButton();
        }
      }));

      fileMenu.append(new nw.MenuItem( {type: 'separator'}));
      fileMenu.append(new nw.MenuItem( {label: 'Exit', click: () => {
        window.close();
      }}));

      menu.append(new nw.MenuItem({
        label: 'File',
        submenu: fileMenu,
      }));

      const editMenu = new nw.Menu();
      editMenu.append(new nw.MenuItem( {
        label: 'Undo',
        key: 'z',
        modifiers: 'ctrl',
        click: () => {
          CycloneMapEditor.undoButton();
        }
      }));
      editMenu.append(new nw.MenuItem( {
        label: 'Redo',
        key: 'y',
        modifiers: 'ctrl',
        click: () => {
          CycloneMapEditor.redoButton();
        }
      }));
      editMenu.append(new nw.MenuItem( {type: 'separator'}));
      this.showGridMenu = new nw.MenuItem( {
        label: 'Show Grid',
        type: 'checkbox',
        checked: showGrid,
        click: () => {
          CycloneMapEditor.showGridButton();
        }
      });
      editMenu.append(this.showGridMenu);

      menu.append(new nw.MenuItem({
        label: 'Edit',
        submenu: editMenu,
      }));

      const drawMenu = new nw.Menu();
      this.pencilMenu = new nw.MenuItem( {
        label: 'Pencil',
        type: 'checkbox',
        checked: currentTool === 'pencil',
        key: 'p',
        click: () => {
          CycloneMapEditor.pencilButton();
        }
      });
      drawMenu.append(this.pencilMenu);
      this.rectangleMenu = new nw.MenuItem( {
        label: 'Rectangle',
        type: 'checkbox',
        checked: currentTool === 'rectangle',
        key: 'r',
        click: () => {
          CycloneMapEditor.rectangleButton();
        }
      });
      drawMenu.append(this.rectangleMenu);
      this.fillMenu = new nw.MenuItem( {
        label: 'Flood Fill',
        type: 'checkbox',
        checked: currentTool === 'fill',
        key: 'f',
        click: () => {
          CycloneMapEditor.fillButton();
        }
      });
      drawMenu.append(this.fillMenu);
      drawMenu.append(new nw.MenuItem( {type: 'separator'}));
      this.eraserMenu = new nw.MenuItem( {
        label: 'Eraser',
        type: 'checkbox',
        checked: currentTool === 'eraser',
        key: 'e',
        click: () => {
          CycloneMapEditor.eraserButton();
        }
      });
      drawMenu.append(this.eraserMenu);

      menu.append(new nw.MenuItem({
        label: 'Draw',
        submenu: drawMenu,
      }));

      const layerMenu = new nw.Menu();
      this.layer1Button = new nw.MenuItem( {
        label: 'Layer 1',
        type: 'checkbox',
        checked: currentLayer === 0,
        key: '1',
        click: () => {
          CycloneMapEditor.changeCurrentLayer(0);
        }
      });
      this.layer2Button = new nw.MenuItem( {
        label: 'Layer 2',
        type: 'checkbox',
        checked: currentLayer === 1,
        key: '2',
        click: () => {
          CycloneMapEditor.changeCurrentLayer(1);
        }
      });
      this.layer3Button = new nw.MenuItem( {
        label: 'Layer 3',
        type: 'checkbox',
        checked: currentLayer === 2,
        key: '3',
        click: () => {
          CycloneMapEditor.changeCurrentLayer(2);
        }
      });
      this.layer4Button = new nw.MenuItem( {
        label: 'Layer 4',
        type: 'checkbox',
        checked: currentLayer === 3,
        key: '4',
        click: () => {
          CycloneMapEditor.changeCurrentLayer(3);
        }
      });
      layerMenu.append(this.layer1Button);
      layerMenu.append(this.layer2Button);
      layerMenu.append(this.layer3Button);
      layerMenu.append(this.layer4Button);

      layerMenu.append(new nw.MenuItem( {type: 'separator'}));
      this.shadowsButton = new nw.MenuItem( {
        label: 'Shadows',
        type: 'checkbox',
        checked: currentLayer === 4,
        key: '6',
        click: () => {
          CycloneMapEditor.changeCurrentLayer(4);
        }
      });
      layerMenu.append(this.shadowsButton);
      this.regionsButton = new nw.MenuItem( {
        label: 'Regions',
        type: 'checkbox',
        checked: currentLayer === 5,
        key: '5',
        click: () => {
          CycloneMapEditor.changeCurrentLayer(5);
        }
      });
      layerMenu.append(this.regionsButton);

      menu.append(new nw.MenuItem({
        label: 'Layer',
        submenu: layerMenu,
      }));

      const helpMenu = new nw.Menu();
      helpMenu.append(new nw.MenuItem( {label: 'Plugin Page', click: () => {
        require('nw.gui').Shell.openExternal('https://makerdevs.com/plugin/cyclone-map-editor');
      }}));

      menu.append(new nw.MenuItem({
        label: 'Help',
        submenu: helpMenu,
      }));

      this.menu = menu;
    }

    static clearAllData() {
      changeHistory = [];
      undoHistory = [];
      currentTileId = 0;
      tileCols = 1;
      tileRows = 1;
      rectangleStartMouseX = 0;
      rectangleStartMouseY = 0;
      rectangleStartX = 0;
      rectangleStartY = 0;
      rectangleWidth = 0;
      rectangleHeight = 0;
      rectangleBackWidth = 0;
      rectangleBackHeight = 0;
      selectedTileList = [];
    }

    static shouldDisplayMenu() {
      if (!editorActive) {
        return false;
      }

      if (!(SceneManager._scene instanceof Scene_Map)) {
        return false;
      }

      return true;
    }

    static refreshScreenSize() {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      this.resizeTimeout = setTimeout(() => {
        // Adds a second timeout to block the show/hide functionality for a little while
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = false;
        }, 500);

        const xDelta = Graphics.width - window.innerWidth;
        const yDelta = Graphics.height - window.innerHeight;
        window.moveBy(-xDelta / 2, -yDelta / 2);
        window.resizeBy(xDelta, yDelta);
      }, 20);
    }

    static refreshMenuVisibility() {
      const display = this.shouldDisplayMenu();
      const win = nw.Window.get();

      if (display && win.menu === this.menu) {
        return;
      }

      if (display) {
        win.menu = this.menu;

        // return;
      } else {
        win.menu = null;
      }

      this.refreshScreenSize();
    }

    static isTabValid(tab) {
      const tileset = $gameMap.tileset();
      if (!tileset) {
        return false;
      }

      const names = tileset.tilesetNames;

      if (tab === 'A') {
        return Boolean(names[0] || names[1] || names[2] || names[3] || names[4]);
      }

      const tilesetIndex = tabs.indexOf(tab) + 4;
      return Boolean(names[tilesetIndex]);
    }

    static validTabs() {
      return tabs.filter(tab => this.isTabValid(tab));
    }

    static areRegionsVisible() {
      return layerVisibility[5];
    }

    static selectPreviousTab() {
      const validTabs = this.validTabs();
      const oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);

      const index = oldIndex === 0 ? validTabs.length -1 : oldIndex -1;
      this.changeCurrentTab(validTabs[index % validTabs.length]);
    }

    static selectNextTab() {
      const validTabs = this.validTabs();
      const oldIndex = validTabs.indexOf(currentTab).clamp(0, validTabs.length - 1);

      const index = oldIndex +1;
      this.changeCurrentTab(validTabs[index % validTabs.length]);
    }

    static onKeyDown(event) {
      if (!editorActive) {
        return;
      }

      const scene = SceneManager._scene;
      if (!(scene instanceof Scene_Map)) {
        return;
      }

      if (event.keyCode === 8 || event.keyCode === 46) {
        this.eraserButton();
        return;
      }

      if (event.keyCode === 33) {
        this.selectPreviousTab();
        return;
      }

      if (event.keyCode === 34) {
        this.selectNextTab();
        return;
      }
    }

    static checkTabKeys(key) {
      // switch(key) {
      //   case '1':
      //     this.changeCurrentTab('A');
      //     return;
      //   case '2':
      //     this.changeCurrentTab('B');
      //     return;
      //   case '3':
      //     this.changeCurrentTab('C');
      //     return;
      //   case '4':
      //     this.changeCurrentTab('D');
      //     return;
      //   case '5':
      //     this.changeCurrentTab('E');
      //     return;
      // }
    }

    static checkScrollKeys(key) {
      switch(key) {
        case 'w':
          $gameMap.scrollUp(3);
          break;
        case 'a':
          $gameMap.scrollLeft(3);
          break;
        case 's':
          $gameMap.scrollDown(3);
          break;
        case 'd':
          $gameMap.scrollRight(3);
          break;
      }
    }

    static checkLayerKeys(key) {
      switch(key) {
        case '1':
          this.changeCurrentLayer(0);
          return;
        case '2':
          this.changeCurrentLayer(1);
          return;
        case '3':
          this.changeCurrentLayer(2);
          return;
        case '4':
          this.changeCurrentLayer(3);
          return;
        case '5':
          this.changeCurrentLayer(4);
          return;
        case '6':
          this.changeCurrentLayer(5);
          return;
      }
    }

    static checkToolKeys(key) {
      switch(key) {
        case 'f':
          this.fillButton();
          return;
        case 'e':
          this.eraserButton();
          return;
        case 'r':
          this.rectangleButton();
          return;
        case 'p':
          this.pencilButton();
          return;
      }
    }

    static checkControlKeys(code) {
      switch(code) {
        case 'KeyZ':
          this.undoLastChange();
          break;
        case 'KeyY':
          this.redoLastUndoneChange();
          break;
        case 'KeyS':
          this.saveButton();
          break;
        case 'KeyR':
          this.reloadButton();
          break;
      }
    }

    static loadMapFile() {
      SceneManager._scene._mapEditorCommands.hide();
      const fileName = `Map${ $gameMap._mapId.padZero(3) }.json`;

      const xhr = new XMLHttpRequest();
      const url = `data/${ fileName }`;

      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);

          // eslint-disable-next-line no-global-assign
          $dataMap = data;
          SoundManager.playLoad();
          SceneManager.goto(Scene_Map);
        } catch (e) {
          alert('Failed to parse map data.');
          SceneManager._scene.refreshMapEditorWindows();
        }
      };
      xhr.onerror = () => {
        alert('Failed to load map file from disk.');
        SceneManager._scene.refreshMapEditorWindows();
      };

      xhr.send();
    }

    static undoButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      if (changeHistory.length) {
        this.undoLastChange();
      }
    }

    static redoButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      if (undoHistory.length) {
        this.redoLastUndoneChange();
      }
    }

    // eslint-disable-next-line complexity
    static updateStatus({ tileId, mapX, mapY, tile1, tile2, tile3, tile4, region } = {}) {
      const oldTileId = statusTileId;
      const oldX = statusMapX;
      const oldY = statusMapY;
      const oldTile1 = statusTile1;
      const oldTile2 = statusTile2;
      const oldTile3 = statusTile3;
      const oldTile4 = statusTile4;
      const oldRegion = region;

      statusTileId = tileId ?? statusTileId;
      statusMapX = mapX ?? statusMapX;
      statusMapY = mapY ?? statusMapY;
      statusTile1 = tile1 ?? statusTile1;
      statusTile2 = tile2 ?? statusTile2;
      statusTile3 = tile3 ?? statusTile3;
      statusTile4 = tile4 ?? statusTile4;
      statusRegion = region ?? statusRegion;

      const changedTile = oldTile1 !== statusTile1 || oldTile2 !== statusTile2 || oldTile3 !== statusTile3 || oldTile4 !== statusTile4;
      const changed = changedTile || oldTileId !== statusTileId || oldX !== statusMapX || oldY !== statusMapY || oldRegion !== statusRegion;
      if (!changed) {
        return;
      }

      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene._mapEditorStatus.refresh();
      }
    }

    static showGridButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      showGrid = !showGrid;
      this.showGridButton.checked = showGrid;
      SceneManager._scene._mapEditorGrid.refresh();
    }

    static updateCurrentTool() {
      rectangleWidth = 0;
      rectangleHeight = 0;
      rectangleBackWidth = 0;
      rectangleBackHeight = 0;
      rectangleStartX = 0;
      rectangleStartY = 0;
      rectangleStartMouseX = 0;
      rectangleStartMouseY = 0;

      this.pencilMenu.checked = currentTool === 'pencil';
      this.rectangleMenu.checked = currentTool === 'rectangle';
      this.fillMenu.checked = currentTool === 'fill';
      this.eraserMenu.checked = currentTool === 'eraser';
      this.refreshMapEditor();
    }

    static pencilButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      currentTool = 'pencil';
      lastDrawingTool = 'pencil';

      this.updateCurrentTool();
    }

    static rectangleButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      currentTool = 'rectangle';
      lastDrawingTool = 'rectangle';

      this.updateCurrentTool();
    }

    static fillButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      currentTool = 'fill';
      this.updateCurrentTool();
    }

    static eraserButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      currentTool = 'eraser';

      this.updateCurrentTool();
    }

    static _doSave() {
      const fs = require('fs');
      const path = require('path');

      const projectFolder = path.dirname(process.mainModule.filename);
      const dataFolder = path.join(projectFolder, 'data');
      const fileName = `Map${ $gameMap._mapId.padZero(3) }.json`;

      const filePath = path.join(dataFolder, fileName);

      const json = JSON.stringify($dataMap, null, 2);
      fs.writeFileSync(filePath, json);

      SoundManager.playSave();
    }

    static saveButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      if (!confirm('Are you sure you want to SAVE the map file?')) {
        SceneManager._scene.refreshMapEditorWindows();
        return;
      }

      SceneManager._scene._mapEditorCommands.hide();

      this._doSave();
      SceneManager._scene.refreshMapEditorWindows();
    }

    static reloadButton() {
      if (!(SceneManager._scene instanceof Scene_Map)) {
        return;
      }

      if (!confirm('Are you sure you want to RELOAD the map file?')) {
        SceneManager._scene.refreshMapEditorWindows();
        return;
      }

      changeHistory = [];
      undoHistory = [];
      currentTileId = 0;
      tileCols = 1;
      tileRows = 1;
      rectangleWidth = 0;
      rectangleHeight = 0;
      rectangleBackWidth = 0;
      rectangleBackHeight = 0;
      rectangleStartX = 0;
      rectangleStartY = 0;
      rectangleStartMouseX = 0;
      rectangleStartMouseY = 0;

      this.loadMapFile();
    }

    static onKeyPress(event) {
      if (editorActive) {
        this.checkScrollKeys(event.key);
      }
    }

    static onKeyUp(event) {
      if (event.key === 'h') {
        this.toggleMapEditor();
        return;
      }

      if (editorActive) {
        if (event.ctrlKey) {
          this.checkControlKeys(event.code);
        } else {
          this.checkTabKeys(event.key);
          this.checkLayerKeys(event.key);
          this.checkToolKeys(event.key);
        }
      }
    }

    static toggleMapEditor() {
      if (this.resizeTimeout) {
        return;
      }

      const scene = SceneManager._scene;
      if (!(scene instanceof Scene_Map)) {
        return;
      }

      scene.toggleMapEditor();
    }

    static refreshMapEditor() {
      const scene = SceneManager._scene;
      if (!(scene instanceof Scene_Map)) {
        return;
      }

      scene.refreshMapEditorWindows();
    }

    static getTileIdTilesetIndex(tileId) {
      if (tileId < Tilemap.TILE_ID_A5) {
        const tilesetIndex = Math.floor(tileId / 256);
        if (tilesetIndex >= 0 && tilesetIndex < 4) {
          return 5 + tilesetIndex;
        }

        return -1;
      }

      if (tileId < Tilemap.TILE_ID_A1) {
        return 4;
      }

      if (tileId < Tilemap.TILE_ID_A2) {
        return 0;
      }

      if (tileId < Tilemap.TILE_ID_A3) {
        return 1;
      }

      if (tileId < Tilemap.TILE_ID_A4) {
        return 2;
      }

      if (tileId < Tilemap.TILE_ID_MAX) {
        return 3;
      }

      return -1;
    }

    static getTilesetName(tileId) {
      const tileset = $gameMap.tileset();
      if (!tileset) {
        return;
      }

      const tilesetIndex = this.getTileIdTilesetIndex(tileId);
      if (tilesetIndex < 0) {
        return;
      }

      return tileset.tilesetNames[tilesetIndex];
    }

    static loadTilesetBitmap(tileId) {
      const realFileName = this.getTilesetName(tileId);
      if (realFileName) {
        return ImageManager.loadTileset(realFileName);
      }
    }

    static changeCurrentLayer(newIndex) {
      if (newIndex >= layerVisibility.length) {
        return;
      }

      currentLayer = newIndex;
      this.layer1Button.checked = newIndex === 0;
      this.layer2Button.checked = newIndex === 1;
      this.layer3Button.checked = newIndex === 2;
      this.layer4Button.checked = newIndex === 3;
      this.shadowsButton.checked = newIndex === 4;
      this.regionsButton.checked = newIndex === 5;

      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene._mapEditorLayerListWindow.refresh();
        SceneManager._scene._mapEditorWindow.refresh();
        SceneManager._scene._mapEditorStatus.refresh();
      }
    }

    static changeCurrentTab(tabLetter) {
      currentTab = tabLetter;
      this.refreshMapEditor();
    }

    static tileIndex(x, y, z) {
      return (z * $gameMap.height() + (y % $gameMap.height())) * $gameMap.width() + (x % $gameMap.width());
    }

    static indexPositionX(index, z) {
      const y = this.indexPositionY(index, z);
      return index - this.tileIndex(0, y, z);
    }

    static indexPositionY(index, z) {
      return Math.floor((index / $gameMap.width()) - (z * $gameMap.height()));
    }

    static getCurrentTileAtPosition(x, y, z, skipPreview = true) {
      if (x < 0 || y < 0 || x >= $gameMap.width() || y >= $gameMap.height()) {
        return 0;
      }

      const tileIndex = this.tileIndex(x, y, z);
      if (!skipPreview) {
        if (previewChanges[tileIndex] !== undefined) {
          return previewChanges[tileIndex];
        }
      }

      return $dataMap.data[tileIndex] ?? 0;
    }

    static isSameKindTile(tileId, x, y, z, skipPreview = true) {
      return Tilemap.isSameKindTile(tileId, this.getCurrentTileAtPosition(x, y, z, skipPreview));
    }

    static getWallColumnTypeForPosition(x, y, z, tileId, skipPreview = true) {
      // wall auto tiles need the left and right columns to have the same amount of rows for it to match
      let hasLeftColumn = true;
      let hasRightColumn = true;

      const compareWallAutoTileLine = (newY, sameCenter) => {
        const leftTileId = this.getCurrentTileAtPosition(x -1, newY, z, skipPreview);
        const rightTileId = this.getCurrentTileAtPosition(x + 1, newY, z, skipPreview);

        if (sameCenter) {
          if (!Tilemap.isSameKindTile(tileId, leftTileId)) {
            hasLeftColumn = false;
          }
          if (!Tilemap.isSameKindTile(tileId, rightTileId)) {
            hasRightColumn = false;
          }
        } else {
          if (Tilemap.isSameKindTile(tileId, leftTileId)) {
            hasLeftColumn = false;
          }
          if (Tilemap.isSameKindTile(tileId, rightTileId)) {
            hasRightColumn = false;
          }
        }
      };

      for (let newY = y; y < $gameMap.height(); y++) {
        const centerTileId = this.getCurrentTileAtPosition(x, newY, z, skipPreview);
        const sameCenter = Tilemap.isSameKindTile(tileId, centerTileId);
        compareWallAutoTileLine(newY, sameCenter);
        if (!sameCenter) {
          break;
        }
      }

      for (let newY = y -1; y >= 0; y--) {
        const centerTileId = this.getCurrentTileAtPosition(x, newY, z, skipPreview);
        const sameCenter = Tilemap.isSameKindTile(tileId, centerTileId);
        compareWallAutoTileLine(newY, sameCenter);
        if (!sameCenter) {
          break;
        }
      }

      if (hasLeftColumn) {
        if (hasRightColumn) {
          return 1;
        }

        return 2;
      }

      if (hasRightColumn) {
        return 0;
      }

      return 3;
    }

    static getWaterfallShapeForPosition(x, y, z, tileId, skipPreview = true) {
      const left = this.isSameKindTile(tileId, x - 1, y, z, skipPreview);
      const right = this.isSameKindTile(tileId, x + 1, y, z, skipPreview);

      if (left && right) {
        return 0;
      }

      if (left) {
        return 1;
      }

      if (right) {
        return 2;
      }

      return 3;
    }

    static getWallShapeForPosition(x, y, z, tileId, skipPreview = true) {
      const columnType = this.getWallColumnTypeForPosition(x, y, z, tileId, skipPreview);

      let shape = 0;
      const above = this.isSameKindTile(tileId, x, y -1, z, skipPreview);
      const below = this.isSameKindTile(tileId, x, y +1, z, skipPreview);

      if (above && below) {
        shape = 0;
      } else if (above) {
        shape = 8;
      } else if (below) {
        shape = 2;
      } else {
        shape = 10;
      }

      switch (columnType) {
        case 0:
          shape += 1;
          break;
        case 2:
          shape += 4;
          break;
        case 3:
          shape += 5;
          break;
      }

      return shape;
    }

    static getShapeForConfiguration(configuration) {
      for (let shape = 0; shape < autoTileShapeTable.length; shape++) {
        const shapeData = autoTileShapeTable[shape];
        let valid = true;

        for (let i = 0; i < configuration.length; i++) {
          const config = shapeData[i];

          if (config === true) {
            if (!configuration[i]) {
              valid = false;
              break;
            }
          } else if (config === false) {
            if (configuration[i]) {
              valid = false;
              break;
            }
          }
        }

        if (valid) {
          return shape;
        }
      }

      return 46;
    }

    static getAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
      if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
        return this.getWallShapeForPosition(x, y, z, tileId, skipPreview);
      }

      if (Tilemap.isWaterfallTile(tileId)) {
        return this.getWaterfallShapeForPosition(x, y, z, tileId, skipPreview);
      }

      const a = this.isSameKindTile(tileId, x -1, y -1, z, skipPreview);
      const b = this.isSameKindTile(tileId, x, y -1, z, skipPreview);
      const c = this.isSameKindTile(tileId, x +1, y -1, z, skipPreview);

      const d = this.isSameKindTile(tileId, x -1, y, z, skipPreview);
      const e = this.isSameKindTile(tileId, x +1, y, z, skipPreview);

      const f = this.isSameKindTile(tileId, x -1, y +1, z, skipPreview);
      const g = this.isSameKindTile(tileId, x, y +1, z, skipPreview);
      const h = this.isSameKindTile(tileId, x +1, y +1, z, skipPreview);

      const config = [a, b, c, d, e, f, g, h];
      return this.getShapeForConfiguration(config);
    }

    static isShiftMapping() {
      if (Input.isPressed('shift')) {
        return true;
      }

      if (SceneManager._scene._mapEditorWindow._manualTileSelected !== undefined) {
        return true;
      }

      return false;
    }

    static changeAutoTileShapeForPosition(x, y, z, tileId, skipPreview = true) {
      if (this.isShiftMapping()) {
        return tileId;
      }

      const shape = this.getAutoTileShapeForPosition(x, y, z, tileId, skipPreview);
      return Tilemap.TILE_ID_A1 + Math.floor((tileId - Tilemap.TILE_ID_A1) / 48) * 48 + shape;
    }

    static resetTileShape(x, y, z, previewOnly = false) {
      if (x < 0 || x >= $gameMap.width()) {
        return;
      }

      if (y < 0 || y >= $gameMap.height()) {
        return;
      }

      const tileId = this.getCurrentTileAtPosition(x, y, z, !previewOnly);
      if (Tilemap.isAutotile(tileId)) {
        const effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, !previewOnly);
        if (tileId !== effectiveTileId) {
          this.setMapTile(x, y, z, effectiveTileId, false, previewOnly);
        }
      }
    }

    static undoLastChange() {
      if (changeHistory.length === 0) {
        SoundManager.playBuzzer();
        return;
      }

      const lastChange = changeHistory.pop();
      currentChange = {};
      for (const tileIndex in lastChange) {
        currentChange[tileIndex] = $dataMap.data[tileIndex];
        $dataMap.data[tileIndex] = lastChange[tileIndex];
      }

      undoHistory.push(currentChange);
      currentChange = false;
      SceneManager._scene._mapEditorCommands.redraw();
      SceneManager._scene._mapEditorGrid.refresh();
    }

    static redoLastUndoneChange() {
      if (undoHistory.length === 0) {
        SoundManager.playBuzzer();
        return;
      }

      const lastChange = undoHistory.pop();
      currentChange = {};
      for (const tileIndex in lastChange) {
        currentChange[tileIndex] = $dataMap.data[tileIndex];
        $dataMap.data[tileIndex] = lastChange[tileIndex];
      }

      this.logChange(false);
    }

    static logChange(clearUndo = true) {
      const hasChanges = Object.keys(currentChange).length > 0;

      if (hasChanges) {
        changeHistory.push(currentChange);
        if (clearUndo) {
          undoHistory = [];
        }
      }
      currentChange = false;

      while (changeHistory.length > 300) {
        changeHistory.shift();
      }

      SceneManager._scene._mapEditorCommands.redraw();
      SceneManager._scene._mapEditorGrid.refresh();
    }

    static setMapTile(x, y, z, tileId, updateNeighbors = true, previewOnly = false) {
      if (!$gameMap.isValid(x, y)) {
        return;
      }

      const tileIndex = this.tileIndex(x, y, z);
      let effectiveTileId = tileId;

      if (Tilemap.isAutotile(tileId)) {
        effectiveTileId = this.changeAutoTileShapeForPosition(x, y, z, tileId, false);
      }

      if (previewOnly) {
        previewChanges[tileIndex] = effectiveTileId;
      } else {
        const oldTile = $dataMap.data[tileIndex];
        if (currentChange[tileIndex] === undefined && oldTile !== effectiveTileId) {
          currentChange[tileIndex] = oldTile;
        }

        $dataMap.data[tileIndex] = effectiveTileId;
      }

      if (updateNeighbors && !this.isShiftMapping()) {
        this.resetTileShape(x -1, y -1, z, previewOnly);
        this.resetTileShape(x, y -1, z, previewOnly);
        this.resetTileShape(x +1, y -1, z, previewOnly);

        this.resetTileShape(x -1, y, z, previewOnly);
        this.resetTileShape(x +1, y, z, previewOnly);

        this.resetTileShape(x -1, y +1, z, previewOnly);
        this.resetTileShape(x, y + 1, z, previewOnly);
        this.resetTileShape(x +1, y +1, z, previewOnly);
      }
    }

    static getSelectedTileCell(col, row) {
      if (currentTool === 'eraser') {
        return 0;
      }

      if (!currentTileId) {
        return;
      }

      if (selectedTileList.length < tileCols * tileRows) {
        return;
      }

      const realCol = col % tileCols;
      const realRow = row % tileRows;
      const index = realRow * tileCols + realCol;
      return selectedTileList[index];
    }

    static applyRectangle(startX, startY, width, height, previewOnly = false) {
      if (!currentTileId && currentTool !== 'eraser') {
        return;
      }

      let initialRow = 0;
      let initialCol = 0;
      let rowIncrement = 1;
      let colIncrement = 1;

      if (rectangleBackWidth > 0) {
        initialCol = width - 1;
        colIncrement *= -1;
      }

      if (rectangleBackHeight > 0) {
        initialRow = height - 1;
        rowIncrement *= -1;
      }

      let selectionRow = initialRow;
      let selectionCol = initialCol;

      if (previewOnly) {
        previewChanges = {};
      } else {
        currentChange = {};
      }

      for (let tileY = startY; tileY < startY + height; tileY++) {
        selectionCol = initialCol;
        for (let tileX = startX; tileX < startX + width; tileX++) {
          const tileId = this.getSelectedTileCell(selectionCol, selectionRow) ?? 0;

          this.setMapTile(tileX, tileY, currentLayer, tileId, true, previewOnly);
          selectionCol += colIncrement;
        }
        selectionRow += rowIncrement;
      }

      if (previewOnly) {
        SceneManager._scene._spriteset._tilemap.refresh();
        this.maybeRefreshGrid();
      } else {
        this.logChange();
        this.refreshTilemap();
      }
    }

    static maybeRefreshGrid() {
      if (currentLayer !== 5) {
        return;
      }

      // Grid refresh is a heavy operation, so let's limit how often we do it
      if (!gridPreviewBlockHandler) {
        gridPreviewBlockHandler = setTimeout(() => {
          gridPreviewBlockHandler = false;
          if (gridNeedsRefresh) {
            setTimeout(() => {
              this.maybeRefreshGrid();
            }, 50);
          }
        }, 50);

        SceneManager._scene._mapEditorGrid.refresh();
        return;
      }

      gridNeedsRefresh = true;
    }

    static refreshTilemap() {
      previewChanges = {};
      SceneManager._scene._spriteset._tilemap.refresh();
      SceneManager._scene._mapEditorGrid.refresh();
    }

    static copyRectangle(startX, startY, width, height) {
      if (!wasRightButtonDown) {
        return;
      }

      let index = 0;
      selectedTileList = Array(width * height);
      currentTileId = 0;

      for (let tileY = startY; tileY < startY + height; tileY++) {
        for (let tileX = startX; tileX < startX + width; tileX++) {
          const tileIndex = this.tileIndex(tileX, tileY, currentLayer);
          selectedTileList[index] = $dataMap.data[tileIndex] || 0;
          if (!currentTileId) {
            currentTileId = selectedTileList[index];
          }
          index++;
        }
      }

      tileCols = width;
      tileRows = height;
      messySelection = true;

      if (currentTool == 'eraser') {
        this.restoreLastDrawingTool();
      }

      this.refreshTilemap();
      SceneManager._scene._mapEditorWindow._manualTileSelected = undefined;
      SceneManager._scene._mapEditorWindow.refresh();
      SceneManager._scene._mapEditorWindow.ensureSelectionVisible();
    }

    static restoreLastDrawingTool() {
      if (lastDrawingTool === 'rectangle') {
        this.rectangleButton();
      } else {
        this.pencilButton();
      }
    }

    static collectFillAreaFrom(mapX, mapY) {
      const area = {};
      const tileIndex = this.tileIndex(mapX, mapY, currentLayer);
      const initialTileId = $dataMap.data[tileIndex];

      const list = [tileIndex];

      const height = $gameMap.height();
      const width = $gameMap.width();

      const maybeAddToList = (index) => {
        if (index >= 0 && !list.includes(index)) {
          list.push(index);
        }
      };

      for (let i = 0; i < list.length; i++) {
        const index = list[i];
        if (area[index] === undefined) {
          const tileId = $dataMap.data[index];
          area[index] = Tilemap.isSameKindTile(tileId, initialTileId);

          if (area[index]) {
            const y = this.indexPositionY(index, currentLayer);
            const x = index - this.tileIndex(0, y, currentLayer);

            const leftIndex = x > 0 ? this.tileIndex(x - 1, y, currentLayer) : -1;
            const rightIndex = x < width -1 ? this.tileIndex(x + 1, y, currentLayer) : -1;
            const upIndex = y > 0 ? this.tileIndex(x, y - 1, currentLayer) : -1;
            const downIndex = y < height - 1 ? this.tileIndex(x, y + 1, currentLayer) : -1;

            maybeAddToList(leftIndex);
            maybeAddToList(rightIndex);
            maybeAddToList(upIndex);
            maybeAddToList(downIndex);
          }
        }
      }

      return Object.keys(area).filter(key => area[key]);
    }

    static applyFillArea(mapX, mapY) {
      if (!currentTileId) {
        return;
      }

      const affectedArea = this.collectFillAreaFrom(mapX, mapY);
      const height = $gameMap.height();
      const width = $gameMap.width();

      currentChange = {};
      for (const tileIndex of affectedArea) {
        const y = this.indexPositionY(tileIndex, currentLayer);
        const x = tileIndex - this.tileIndex(0, y, currentLayer);

        const xDiff = (x + width - mapX) % tileCols;
        const yDiff = (y + height - mapY) % tileRows;

        const tileId = this.getSelectedTileCell(xDiff, yDiff) ?? 0;
        this.setMapTile(x, y, currentLayer, tileId);
      }

      this.logChange();
      this.refreshTilemap();
    }

    static applySelectedTiles(mapX, mapY) {
      if (!currentTileId) {
        return;
      }

      if (selectedTileList.length < tileCols * tileRows) {
        return;
      }

      let index = 0;
      for (let y = mapY; y < mapY + tileRows; y++) {
        if (y >= $gameMap.height()) {
          continue;
        }

        for (let x = mapX; x < mapX + tileCols; x++) {
          if (x >= $gameMap.width()) {
            continue;
          }
          this.setMapTile(x, y, currentLayer, selectedTileList[index]);
          index++;
        }
      }

      this.refreshTilemap();
    }
  }

  class WindowCycloneMapEditorCommands extends Window_Command {
    constructor() {
      const x = Graphics.width - windowWidth;
      const y = 0;
      const w = windowWidth;
      const h = 74;
      super(new Rectangle(x, y, w, h));
      this.showBackgroundDimmer();
    }

    processCursorMove() {
    }

    processHandling() {
    }

    updateBackOpacity() {
      this.backOpacity = 255;
    }

    _updateCursor() {
      this._cursorSprite.visible = false;
    }

    makeCommandList() {
      this.addCommand('Undo', 'undo');
      this.addCommand('Redo', 'redo');

      this.addCommand('', '');

      this.addCommand('Pen', 'pencil');
      this.addCommand('Rect', 'rectangle');
      this.addCommand('Fill', 'fill');
      this.addCommand('Erase', 'eraser');

      // this.addCommand('Save', 'save');
      // this.addCommand('Reload', 'reload');

      this.setHandler('undo', () => {
        CycloneMapEditor.undoButton();
        this.activate();
      });
      this.setHandler('redo', () => {
        CycloneMapEditor.redoButton();
        this.activate();
      });
      this.setHandler('pencil', () => {
        CycloneMapEditor.pencilButton();
        this.activate();
      });
      this.setHandler('rectangle', () => {
        CycloneMapEditor.rectangleButton();
        this.activate();
      });
      this.setHandler('fill', () => {
        CycloneMapEditor.fillButton();
        this.activate();
      });
      this.setHandler('eraser', () => {
        CycloneMapEditor.eraserButton();
        this.activate();
      });
      this.setHandler('save', () => {
        CycloneMapEditor.saveButton();
        this.activate();
      });
      this.setHandler('reload', () => {
        CycloneMapEditor.reloadButton();
        this.activate();
      });
    }

    colSpacing() {
      return 6;
    }

    rowSpacing() {
      return 0;
    }

    maxCols() {
      return 7;
    }

    redraw() {
      Window_Selectable.prototype.refresh.call(this);
    }

    // itemWidth() {
    //   return ImageManager.iconWidth;
    // }

    // itemHeight() {
    //   return ImageManager.iconHeight;
    // }
    //

    getSymbolIcon(symbol) {
      switch(symbol) {
        case 'undo':
          return undoIcon;
        case 'redo':
          return redoIcon;
        case 'pencil':
          return pencilIcon;
        case 'rectangle':
          return rectangleIcon;
        case 'fill':
          return fillIcon;
        case 'eraser':
          return eraseIcon;
        case 'save':
          return saveIcon;
        case 'reload':
          return reloadIcon;
      }
    }

    drawItem(index) {
      const symbol = this.commandSymbol(index);
      const rect = this.itemRect(index);


      if (symbol === currentTool) {
        this.contents.fillRect(rect.x, rect.y + 2, rect.width, rect.height, '#00FF0066');

        this.contents.fillRect(rect.x -2, rect.y, rect.width + 4, 4, '#000000');
        this.contents.fillRect(rect.x -2, rect.y + 2 + rect.height, rect.width + 6, 4, '#000000');
        this.contents.fillRect(rect.x - 2, rect.y, 4, rect.height + 4, '#000000');
        this.contents.fillRect(rect.x + rect.width, rect.y, 4, rect.height + 4, '#000000');

        this.contents.fillRect(rect.x, rect.y + 2, rect.width, 2, '#FFFFFF');
        this.contents.fillRect(rect.x, rect.y + 2 + rect.height, rect.width + 2, 2, '#FFFFFF');
        this.contents.fillRect(rect.x, rect.y + 2, 2, rect.height, '#FFFFFF');
        this.contents.fillRect(rect.x + rect.width, rect.y + 2, 2, rect.height, '#FFFFFF');
      }

      const icon = this.getSymbolIcon(symbol);

      if (!icon) {
        return super.drawItem(index);
      }

      this.resetTextColor();
      if (symbol === 'undo') {
        this.changePaintOpacity(changeHistory.length > 0);
      } else if (symbol === 'redo') {
        this.changePaintOpacity(undoHistory.length > 0);
      } else {
        this.changePaintOpacity(true);
      }

      const ctx = this.contents._canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(icon, rect.x + 1, rect.y, 48, 48);
    }

    drawAllItems() {
      super.drawAllItems();
    }

    playCursorSound() {
    }

    playOkSound() {
    }

    playBuzzerSound() {
    }
  }

  class WindowCycloneMapEditorLayerList extends Window_Base {
    constructor() {
      const x = Graphics.width - windowWidth;
      const y = SceneManager._scene._mapEditorCommands.height;
      const h = 150;
      super(new Rectangle(x, y, windowWidth, h));
      this.showBackgroundDimmer();
    }

    update() {
      super.update();
    }

    updateBackOpacity() {
      this.backOpacity = 255;
    }

    refresh() {
      this.drawContents();
      SceneManager._scene.redrawMap();
    }

    drawContents() {
      this.contents.clear();
      this.contents.fontSize = 22;
      const ctx = this.contents._canvas.getContext('2d');

      const names = [
        'Layer 1',
        'Layer 2',
        'Layer 3',
        'Layer 4',
        'Shadows',
        'Regions',
      ];

      ctx.imageSmoothingEnabled = false;
      for (let i = 0; i < 4; i++) {
        ctx.drawImage(layerVisibility[i] ? visibleIcon : hiddenIcon, -4, 30 * i - 4, 48, 48);
        this.contents.fontBold = currentLayer === i;
        this.changeTextColor(currentLayer === i ? ColorManager.powerUpColor() : ColorManager.normalColor());

        this.drawText(names[i], 40, i * 30, windowWidth / 2 - 40, 'left');

        if (names[i + 4]) {
          ctx.drawImage(layerVisibility[i + 4] ? visibleIcon : hiddenIcon, windowWidth / 2 - 4, 30 * i - 4, 48, 48);
          this.contents.fontBold = currentLayer === (i + 4);
          this.changeTextColor(currentLayer === (i + 4) ? ColorManager.powerUpColor() : ColorManager.normalColor());
          this.drawText(names[i + 4], windowWidth / 2 + 40, i * 30, windowWidth / 2 - 40, 'left');
        }
      }
    }

    toggleLayerVisibility(layerIndex) {
      layerVisibility[layerIndex] = !layerVisibility[layerIndex];
      this.refresh();
      SceneManager._scene._mapEditorGrid.refresh();
    }

    getLayerIndex(y) {
      const padding = this.padding + 10;

      if (y < padding || y > this.height - padding + 6) {
        return -1;
      }

      const layerIndex = Math.floor((y - padding) / 30);
      if (y > padding + (layerIndex * 30) + 22) {
        return -1;
      }

      if (layerIndex > layerVisibility.length) {
        return -1;
      }

      return layerIndex;
    }

    onMapTouch(x, y) {
      if (wasPressing) {
        return;
      }
      wasPressing = true;

      let layerIndex = this.getLayerIndex(y);
      if (layerIndex < 0) {
        return;
      }

      if (x >= windowWidth / 2) {
        x -= windowWidth / 2;
        layerIndex += 4;
      }

      if (x < 40) {
        this.toggleLayerVisibility(layerIndex);
        return;
      }

      CycloneMapEditor.changeCurrentLayer(layerIndex);
      this.refresh();
    }
  }

  class WindowCycloneMapEditorStatus extends Window_Base {
    constructor() {
      const h = statusHeight;
      super(new Rectangle(0, Graphics.height - h, Graphics.width, h));
      this.showBackgroundDimmer();
    }

    createContents() {
      this._padding = 0;
      super.createContents();
    }

    updateBackOpacity() {
      this.backOpacity = 255;
    }

    refresh() {
      this.drawContents();
    }

    lineHeight() {
      return 16;
    }

    drawContents() {
      this.contents.clear();
      this.contents.fontSize = 16;

      const line = `Map: ${ $gameMap._mapId }, Tileset: ${ $gameMap._tilesetId}, Pos: ${ statusMapX }, ${ statusMapY }, ${ currentLayer }`;
      const tiles = `Tiles: (${ statusTile1 }, ${ statusTile2 }, ${ statusTile3 }, ${ statusTile4 }), Region: ${ statusRegion }`;

      this.drawText(`${ line } - ${ tiles }`, 8, 12, this.width - 8, 'left');
      this.drawText(`TileId: ${ statusTileId }`, 0, 12, this.width - 8, 'right');
    }
  }

  class WindowCycloneGrid extends Window_Base {
    initialize() {
      const width = Graphics.width;
      const height = Graphics.height;
      const rect = new Rectangle(0, 0, width, height);

      super.initialize(rect);

      this.padding = 0;
      this.refresh();
      this.opacity = 0;

      this.backOpacity = 0;
      this.hide();
      this.deactivate();
    }

    createContents() {
      this._padding = 0;
      super.createContents();
    }

    drawCellGrid(x, y) {
      if (!showGrid) {
        return;
      }

      const padding = this.padding;
      const context = this.contents.context;
      context.save();
      context.strokeStyle = '#000000';
      context.beginPath();
      context.moveTo(x - padding, y - padding);
      context.lineTo(x - padding + tileWidth, y - padding);
      context.stroke();
      context.beginPath();
      context.moveTo(x - padding, y - padding);
      context.lineTo(x - padding, y - padding + tileHeight);
      context.stroke();
    }

    drawCell(x, y) {
      this.drawCellGrid(x, y);

      if (!CycloneMapEditor.areRegionsVisible()) {
        return;
      }

      const mapX = $gameMap.canvasToMapX(x);
      const mapY = $gameMap.canvasToMapY(y);

      const regionId = $gameMap.regionId(mapX, mapY);
      if (regionId > 0) {
        this.contents.drawRegion(regionId, x, y);
      }
    }

    refresh() {
      this.contents.clear();

      this._lastDisplayX = $gameMap._displayX;
      this._lastDisplayY = $gameMap._displayY;

      const paddingX = ($gameMap._displayX - Math.floor($gameMap._displayX)) * tileWidth;
      const paddingY = ($gameMap._displayY - Math.floor($gameMap._displayY)) * tileHeight;

      const mapStartX = 0 - paddingX;
      const mapStartY = 0 - paddingY;
      const mapEndX = mapStartX + ($gameMap.width() * tileWidth);
      const mapEndY = mapStartY + ($gameMap.height() * tileHeight);

      const rightPos = Math.min(Graphics.width, mapEndX);
      let bottomPos = Math.min(Graphics.height, mapEndY);

      for (let x = mapStartX; x < rightPos; x += tileWidth) {
        if (x + tileWidth < 0) {
          continue;
        }

        for (let y = mapStartY; y < bottomPos; y += tileHeight) {
          if (y + tileHeight < 0) {
            continue;
          }

          this.drawCell(x, y);
        }
      }
    }

    update() {
      if (!editorActive) {
        return;
      }

      if (this._lastDisplayX !== $gameMap._displayX || this._lastDisplayY !== $gameMap._displayY) {
        this.refresh();
      }
    }
  }

  class WindowCycloneMapEditor extends Window_Command {
    constructor() {
      const x = Graphics.width - windowWidth;
      const y = SceneManager._scene._mapEditorLayerListWindow.y + SceneManager._scene._mapEditorLayerListWindow.height;
      const w = windowWidth;
      const h = Graphics.height - y - SceneManager._scene._mapEditorStatus.height;
      super(new Rectangle(x, y, w, h));
      this.showBackgroundDimmer();
    }

    onMapTouch(x, y) {

    }

    updateBackOpacity() {
      this.backOpacity = 255;
    }

    _updateCursor() {
      this._cursorSprite.visible = false;
    }

    processCursorMove() {
    }

    processHandling() {
    }

    addTile(tileId) {
      if (!CycloneMapEditor.getTilesetName(tileId)) {
        return;
      }

      if (Tilemap.isAutotile(tileId)) {
        if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
          this.addCommand(tileId, 'tile', true, tileId);
        } else if (Tilemap.isWaterfallTile(tileId)) {
          this.addCommand(tileId, 'tile', true, tileId);
        } else {
          this.addCommand(tileId, 'tile', true, tileId + 46);
        }
        return;
      }

      this.addCommand(tileId, 'tile', true, tileId);
    }

    makeManualTilesList() {
      const tileId = this._manualTileSelected;
      let maxShape = 46;

      if (Tilemap.isWallSideTile(tileId) || Tilemap.isRoofTile(tileId)) {
        maxShape = 15;
      } else if (Tilemap.isWaterfallTile(tileId)) {
        maxShape = 3;
      }

      for (let i = 0; i <= maxShape; i++) {
        this.addCommand(tileId + i, 'tile', true, tileId + i);
      }
    }

    makeShadowList() {
      for (let i = 1; i <= 15; i++) {
        this.addCommand(i, 'shadow', true, i);
      }
    }

    makeRegionList() {
      for (let i = 1; i <= 255; i++) {
        this.addCommand(i, 'region', true, i);
      }
    }

    makeCommandList() {
      if (this._manualTileSelected) {
        this.makeManualTilesList();
        return;
      }

      if (currentLayer === 4) {
        this.makeShadowList();
        return;
      }

      if (currentLayer === 5) {
        this.makeRegionList();
        return;
      }

      for (let tileId = Tilemap.TILE_ID_A1; tileId < Tilemap.TILE_ID_MAX; tileId += 48) {
        this.addTile(tileId);
      }

      for (let tileId = Tilemap.TILE_ID_B; tileId < Tilemap.TILE_ID_A5; tileId++) {
        this.addTile(tileId);
      }
    }

    ensureSelectionVisible() {
      if (this._selectionIndex < 0 || currentTileId === 0) {
        return;
      }

      const row = Math.floor(this._selectionIndex / this.maxCols());
      if (row < this.topRow()) {
        this.setTopRow(Math.min(row, this.maxTopRow()));
      } else if (row > this.topRow() + this.maxPageRows()) {
        this.setTopRow(Math.min(row, this.maxTopRow()));
      }
    }

    redraw() {
      Window_Selectable.prototype.refresh.call(this);

      // Force the tilemap cursor to redraw too
      SceneManager._scene._spriteset._mapEditorCursor.updateDrawing();
    }

    colSpacing() {
      return Math.floor((this.width - (this.maxCols() * this.itemWidth())) / this.maxCols());
    }

    rowSpacing() {
      return 0;
    }

    maxCols() {
      return 8;
    }

    itemWidth() {
      return 48;
      // return tileWidth;
    }

    itemHeight() {
      return 48;
      // return tileHeight;
    }

    drawRegion(index) {
      const rect = this.itemRect(index);
      this.contents.drawRegion(index, rect.x, rect.y, rect.width, rect.height);
    }

    drawShadow(index) {
      const rect = this.itemRect(index);
      this.contents.drawShadow(index, rect.x, rect.y, rect.width, rect.height);
    }

    drawItem(index) {
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));

      const symbol = this.commandSymbol(index);

      if (symbol === 'region') {
        this.drawRegion(index);
        return;
      }

      if (symbol === 'shadow') {
        this.drawShadow(index);
        return;
      }

      const rect = this.itemRect(index);
      const bitmap = this.contents.drawTile(this._list[index].ext, rect.x, rect.y, this.itemWidth(), this.itemHeight());
      if (!bitmap) {
        return;
      }

      if (!bitmap.isReady() && bitmap._loadListeners.length < 2) {
        bitmap.addLoadListener(() => {
          this._needsRefresh = true;
        });
      }
    }

    drawAllItems() {
      super.drawAllItems();
      this.drawSelection();
    }

    drawMessySelection() {
      this._selectionIndex = -1;

      for (let index = 0; index < this._list.length; index++) {
        const item = this._list[index];
        let isSelected = Tilemap.isSameKindTile(item.name, currentTileId);
        if (isSelected) {
          this._selectionIndex = index;
        } else {
          for (const tileId of selectedTileList) {
            if (Tilemap.isSameKindTile(tileId, item.name)) {
              isSelected = true;
            }
          }
        }

        if (!isSelected) {
          continue;
        }

        this._drawSelection(index, 1, 1);
      }
    }

    _drawSelection(topIndex, rowDrawCount, colDrawCount) {
      const rect = this.itemRect(topIndex);
      const { x, y } = rect;

      if (!this._manualTileSelected && selectedTileList.length >= 2 && Tilemap.isSameKindTile(selectedTileList[0], selectedTileList[1])) {
        rowDrawCount = 1;
        colDrawCount = 1;
      }

      const selectionWidth = 48 * colDrawCount;
      const selectionHeight = 48 * rowDrawCount;

      this.contents.fillRect(x, y, selectionWidth, 4, '#000000');
      this.contents.fillRect(x, y + selectionHeight - 4, selectionWidth, 4, '#000000');
      this.contents.fillRect(x, y, 4, selectionHeight, '#000000');
      this.contents.fillRect(x + selectionWidth - 4, y, 4, selectionHeight, '#000000');

      this.contents.fillRect(x + 2, y + 2, selectionWidth - 4, 2, '#FFFFFF');
      this.contents.fillRect(x + 2, y + selectionHeight - 4, selectionWidth - 4, 2, '#FFFFFF');
      this.contents.fillRect(x + 2, y + 2, 2, selectionHeight - 4, '#FFFFFF');
      this.contents.fillRect(x + selectionWidth - 4, y + 2, 2, selectionHeight - 4, '#FFFFFF');
    }

    isSelectedTile(tileId) {
      if (!Tilemap.isSameKindTile(tileId, currentTileId)) {
        return false;
      }

      if (this._manualTileSelected !== undefined) {
        if (tileId !== currentTileId) {
          return false;
        }
      }

      return true;
    }

    drawSelection() {
      if (messySelection) {
        this.drawMessySelection();
        return;
      }

      const cols = this.maxCols();
      this._selectionIndex = -1;

      for (let index = 0; index < this._list.length; index++) {
        const item = this._list[index];
        if (!this.isSelectedTile(item.name)) {
          continue;
        }

        this._selectionIndex = index;

        let col = index % cols;
        let row = Math.floor(index / cols);
        let rowCount = tileRows;
        let colCount = tileCols;
        let rowDrawCount = tileRows <= 0 ? Math.abs(tileRows) + 2 : tileRows;
        let colDrawCount = tileCols <= 0 ? Math.abs(tileCols) + 2 : tileCols;

        while (rowCount <= 0) {
          rowCount++;
          row--;
        }

        while (colCount <= 0) {
          colCount++;
          col--;
        }

        const topIndex = (row * cols) + col;
        this._drawSelection(topIndex, rowDrawCount, colDrawCount);
        break;
      }
    }

    playCursorSound() {
    }

    playOkSound() {
    }

    playBuzzerSound() {
    }

    selectTileId(tileId, cols = 1, rows = 1) {
      currentTileId = tileId;
      tileCols = cols ?? 1;
      tileRows = rows ?? 1;
      messySelection = false;

      const topIndex = this._list.findIndex((item) => item.name === tileId);
      if (topIndex < 0) {
        currentTileId = 0;
        selectedTileList = [];
        this.redraw();
        return;
      }

      selectedTileList = Array(cols * rows);
      selectedTileList[0] = currentTileId;

      const maxCols = this.maxCols();
      const topRow = Math.floor(topIndex / maxCols);
      const leftCol = topIndex % maxCols;

      let selectionIndex = 0;
      for (let y = topRow; y < topRow + tileRows; y++) {
        for (let x = leftCol; x < leftCol + tileCols; x++) {
          const newIndex = y * maxCols + x;
          const newTileId = this.commandName(newIndex);
          selectedTileList[selectionIndex] = newTileId;

          selectionIndex++;
        }
      }

      this.redraw();
    }

    startSelectingTile() {
      if (!this._mouseDown) {
        const index = this.hitIndex();
        if (index < 0) {
          return;
        }
        const tileId = this.commandName(index);
        this.selectTileId(tileId);
        this._mouseDown = true;
      }
    }

    findName(name) {
      return this._list.findIndex(item => item.name === name);
    }

    continueSelectingTile() {
      const index = this.hitIndex();
      const prevCols = tileCols;
      const prevRows = tileRows;

      if (index >= 0) {
        let initialIndex = this.findName(currentTileId);
        if (initialIndex < 0) {
          initialIndex = this._index;
        }

        const initialCol = initialIndex % this.maxCols();
        const initialRow = Math.floor(initialIndex / this.maxCols());
        const newCol = index % this.maxCols();
        const newRow = Math.floor(index / this.maxCols());

        tileCols = (newCol - initialCol) + 1;
        tileRows = (newRow - initialRow) + 1;
      }

      if (this._mouseDown) {
        if (!TouchInput.isPressed()) {
          this.finalizeTileSelection();
        } else if (TouchInput.isMoved()) {
          if (prevCols !== tileCols || prevRows !== tileRows) {
            this.redraw();
          }
        }
      }
    }

    finalizeTileSelection() {
      this._mouseDown = false;

      const cols = this.maxCols();
      for (let index = 0; index < this._list.length; index++) {
        const item = this._list[index];
        if (item.name !== currentTileId) {
          continue;
        }

        let col = index % cols;
        let row = Math.floor(index / cols);
        let rowCount = tileRows;
        let colCount = tileCols;
        const newTileRows = tileRows <= 0 ? Math.abs(tileRows) + 2 : tileRows;
        const newTileCols = tileCols <= 0 ? Math.abs(tileCols) + 2 : tileCols;

        while (rowCount <= 0) {
          rowCount++;
          row--;
        }

        while (colCount <= 0) {
          colCount++;
          col--;
        }

        const topIndex = (row * cols) + col;
        if (topIndex >= 0) {
          const newTileId = this.commandName(topIndex);
          if (newTileId || newTileId === 0) {
            this.selectTileId(newTileId, newTileCols, newTileRows);
          } else {
            this.selectTileId(currentTileId);
          }
        } else {
          this.selectTileId(0);
        }

        break;
      }

      this.redraw();
    }

    activateManualTile() {
      const index = this.hitIndex();
      if (index < 0) {
        return;
      }

      const tileId = this.commandName(index);
      if (Tilemap.isAutotile(tileId)) {
        this._manualTileSelected = tileId;
        this._selectionIndex = -1;
      }
    }

    toggleManualTiles() {
      if (this._manualTileSelected === undefined) {
        this.activateManualTile();
      } else {
        this._manualTileSelected = undefined;
      }

      this.refresh();
      this._mouseDown = false;
      wasRightButtonDown = isRightButtonDown;
    }

    processTouchScroll() {
      if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.startSelectingTile();
      } else if (isRightButtonDown && !wasRightButtonDown && !this._mouseDown) {
        this.toggleManualTiles();
        return;
      }

      if (this._mouseDown) {
        this._mouseMoved = true;
        this.continueSelectingTile();
      }
    }

    update() {
      if (this._needsRefresh) {
        this.refresh();
      }

      super.update();
    }
  }

  class SpriteMapEditorCursor extends Sprite {
    initialize() {
      super.initialize(new Bitmap(tileWidth, tileHeight));
    }

    update() {
      super.update();
      if (this.visible !== editorActive) {
        this.visible = editorActive;
      }

      if (editorActive) {
        this.updatePosition();
      }
    }

    updateDrawing() {
      if (isRightButtonDown) {
        return this.updateRectangle();
      }

      switch (currentTool) {
        case 'fill':
          return this.updateTiles();
        case 'pencil':
          return this.updateTiles();
        case 'eraser':
          return this.updateEraser();
        case 'rectangle':
          if ((!rectangleWidth && !rectangleBackWidth) || (!rectangleHeight && !rectangleBackHeight)) {
            this.updateTiles();
            return;
          }

          return this.updateRectangle();
      }
    }

    getNewBitmapWidth() {
      return (tileWidth * (rectangleWidth || (rectangleBackWidth + 1))) || 1;
    }

    getNewBitmapHeight() {
      return (tileHeight * (rectangleHeight || (rectangleBackHeight + 1))) || 1;
    }

    updateRectangle() {
      const width = this.getNewBitmapWidth();
      const height = this.getNewBitmapHeight();

      if (width !== this.bitmap.width || height !== this.bitmap.height) {
        this.bitmap = new Bitmap(width, height);
      } else {
        this.bitmap.clear();
      }

      const fillColor = isRightButtonDown ? '#00000033' : '#00FF0033';

      if (currentLayer === 5) {
        this.drawTiles();
      }

      if (width > 8 && height > 8) {
        this.bitmap.fillRect(0, 0, width, 4, '#000000');
        this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
        this.bitmap.fillRect(0, 0, 4, height, '#000000');
        this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

        this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
        this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');

        this.bitmap.fillRect(4, 4, width - 8, height - 8, fillColor);
      } else if (width > 0 && height > 0) {
        this.bitmap.fillRect(0, 0, width, height, fillColor);
      }
    }

    updateEraser() {
      const width = this.getNewBitmapWidth();
      const height = this.getNewBitmapHeight();

      if (width !== this.bitmap.width || height !== this.bitmap.height) {
        this.bitmap = new Bitmap(width, height);
      } else {
        this.bitmap.clear();
      }

      if (width > 8 && height > 8) {
        this.bitmap.fillRect(0, 0, width, 4, '#000000');
        this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
        this.bitmap.fillRect(0, 0, 4, height, '#000000');
        this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

        this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
        this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');

        this.bitmap.fillRect(4, 4, width - 8, height - 8, '#FF000033');
      } else if (width > 0 && height > 0) {
        this.bitmap.fillRect(0, 0, width, height, '#FF000033');
      }
    }

    drawTiles() {
      let x = 0;
      let y = 0;
      let column = 0;
      let row = 0;

      for (const tileId of selectedTileList) {
        if (column >= tileCols) {
          column = 0;
          row++;
        }

        x = column * tileWidth;
        y = row * tileHeight;

        if (currentLayer === 5) {
          this.bitmap.drawRegion(tileId, x, y);
        } else if (currentLayer === 4) {
          this.bitmap.drawShadow(tileId, x, y);
        } else {
          this.bitmap.drawTile(tileId, x, y);
        }
        column++;
      }
    }

    updateTiles() {
      const width = tileWidth * tileCols;
      const height = tileHeight * tileRows;

      if (width !== this.bitmap.width || height !== this.bitmap.height) {
        this.bitmap = new Bitmap(width, height);
      } else {
        this.bitmap.clear();
      }

      this.drawTiles();

      if (width > 8 && height > 8) {
        this.bitmap.fillRect(0, 0, width, 4, '#000000');
        this.bitmap.fillRect(0, height - 4, width, 4, '#000000');
        this.bitmap.fillRect(0, 0, 4, height, '#000000');
        this.bitmap.fillRect(width - 4, 0, 4, height, '#000000');

        this.bitmap.fillRect(2, 2, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, height - 4, width - 4, 2, '#FFFFFF');
        this.bitmap.fillRect(2, 2, 2, height - 4, '#FFFFFF');
        this.bitmap.fillRect(width - 4, 2, 2, height - 4, '#FFFFFF');
      }
    }

    getCursorTileX() {
      if (currentTool === 'rectangle' || currentTool === 'eraser' || isRightButtonDown) {
        if (rectangleWidth > 0) {
          return rectangleStartX;
        }
        if (rectangleBackWidth > 0) {
          return rectangleStartX - rectangleBackWidth;
        }
      }

      if (SceneManager._scene._mapEditorWindow) {
        if (TouchInput.x >= SceneManager._scene._mapEditorWindow.x) {
          return $gameMap.canvasToMapX(SceneManager._scene._mapEditorWindow.x);
        }
      }

      return $gameMap.canvasToMapX(TouchInput.x);
    }

    getCursorTileY() {
      if (currentTool === 'rectangle' || currentTool === 'eraser' || isRightButtonDown) {
        if (rectangleHeight > 0) {
          return rectangleStartY;
        }
        if (rectangleBackHeight > 0) {
          return rectangleStartY - rectangleBackHeight;
        }
      }

      return $gameMap.canvasToMapY(TouchInput.y);
    }

    updatePosition() {
      if (!editorActive) {
        return;
      }

      const tileX = this.getCursorTileX();
      const tileY = this.getCursorTileY();

      this.x = Math.floor($gameMap.adjustX(tileX) * tileWidth);
      this.y = Math.floor($gameMap.adjustY(tileY) * tileHeight);
    }
  }

  CycloneMapEditor.patchClass(Scene_Map, $super => class {
    createAllWindows() {
      $super.createAllWindows.call(this);

      this.createMapEditorWindows();
      CycloneMapEditor.clearAllData();
      this.refreshMapEditorWindows();
    }

    isMapEditorActive() {
      return editorActive;
    }

    toggleMapEditor() {
      tileWidth = $gameMap.tileWidth();
      tileHeight = $gameMap.tileHeight();

      editorActive = !editorActive;
      this.refreshMapEditorWindows();
      this._spriteset._mapEditorCursor.updateDrawing();
    }

    createMapEditorWindows() {
      tileWidth = $gameMap.tileWidth();
      tileHeight = $gameMap.tileHeight();
      const neededWidth = tileWidth * 8 + 24;
      if (neededWidth > windowWidth) {
        windowWidth = neededWidth;
      }

      this._mapEditorGrid = new WindowCycloneGrid();
      this.addChild(this._mapEditorGrid);
      this._mapEditorGrid.hide();
      this._mapEditorGrid.deactivate();

      this._mapEditorCommands = new WindowCycloneMapEditorCommands();
      this.addChild(this._mapEditorCommands);
      this._mapEditorCommands.hide();
      this._mapEditorCommands.deactivate();

      this._mapEditorLayerListWindow = new WindowCycloneMapEditorLayerList();
      this.addChild(this._mapEditorLayerListWindow);
      this._mapEditorLayerListWindow.hide();
      this._mapEditorLayerListWindow.deactivate();

      this._mapEditorStatus = new WindowCycloneMapEditorStatus();
      this.addChild(this._mapEditorStatus);
      this._mapEditorStatus.hide();
      this._mapEditorStatus.deactivate();

      this._mapEditorWindow = new WindowCycloneMapEditor();
      this.addChild(this._mapEditorWindow);
      this._mapEditorWindow.hide();
      this._mapEditorWindow.deactivate();
    }

    refreshMapEditorWindows() {
      this._mapEditorGrid.visible = editorActive;
      this._mapEditorCommands.visible = editorActive;
      this._mapEditorLayerListWindow.visible = editorActive;
      this._mapEditorWindow.visible = editorActive;
      this._mapEditorStatus.visible = editorActive;

      this._mapEditorCommands.active = editorActive;
      this._mapEditorLayerListWindow.active = editorActive;
      this._mapEditorWindow.active = editorActive;

      this._mapEditorCommands.refresh();
      this._mapEditorLayerListWindow.refresh();
      this._mapEditorWindow.refresh();
      this._mapEditorGrid.refresh();
      this._mapEditorStatus.refresh();

      if (editorActive) {
        this._spriteset._mapEditorCursor.updateDrawing();
      }
      CycloneMapEditor.refreshMenuVisibility();
    }

    redrawMap() {
      this._spriteset._tilemap.refresh();
    }

    processMapTouch() {
      if (!editorActive) {
        $super.processMapTouch.call(this);
        return;
      }

      this._touchCount = 0;
      if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
        this.onMapTouch();
      }
    }

    onMapTouch() {
      if (!editorActive) {
        $super.onMapTouch.call(this);
        return;
      }
    }

    editorX() {
      return Graphics.width - windowWidth;
    }

    canUpdateMouse() {
      return editorActive && this._mapEditorWindow && this._mapEditorLayerListWindow;
    }

    updateMenuTouch(x, y, pressed) {
      if (!pressed) {
        return;
      }

      if (x > this._mapEditorLayerListWindow.x && x < this._mapEditorLayerListWindow.x + this._mapEditorLayerListWindow.width) {
        if (y < this._mapEditorLayerListWindow.height + this._mapEditorLayerListWindow.y) {
          this._mapEditorLayerListWindow.onMapTouch(x - this._mapEditorLayerListWindow.x, y - this._mapEditorLayerListWindow.y);
          return true;
        }

        this._mapEditorWindow.onMapTouch(x - this._mapEditorWindow.x, y - this._mapEditorWindow.y);
        return true;
      }
    }

    updateRightMouse() {
      if (!this.canUpdateMouse()) {
        isRightButtonDown = false;
        wasRightButtonDown = false;
        return;
      }

      if (!isRightButtonDown && !wasRightButtonDown) {
        return;
      }

      const { x, y } = TouchInput;
      if (this.updateMenuTouch(x, y, isRightButtonDown)) {
        return;
      }

      const mapX = $gameMap.canvasToMapX(x);
      const mapY = $gameMap.canvasToMapY(y);

      if (mapX >= 0 && mapY >= 0) {
        this.updateRightTouch(mapX, mapY);
      }

      wasRightButtonDown = isRightButtonDown;
    }

    updateDisplayPositionData() {
      if (lastDisplayX === $gameMap._displayX && lastDisplayY === $gameMap._displayY) {
        return;
      }

      const xDiff = $gameMap._displayX - lastDisplayX;
      const yDiff = $gameMap._displayY - lastDisplayY;

      if (xDiff > 10 || yDiff > 10) {
        // If the difference is too big, then we don't update
        return;
      }

      if ((rectangleWidth > 0 || rectangleBackWidth > 0) && (rectangleHeight > 0 || rectangleBackHeight > 0)) {
        rectangleStartMouseX += xDiff * tileWidth;
        rectangleStartMouseY += yDiff * tileHeight;
      }
    }

    getSelectionTileAt(x, y) {
      if (x <= this._mapEditorWindow.x || x >= this._mapEditorWindow.x + this._mapEditorWindow.width) {
        return currentTileId;
      }

      if (y >= this._mapEditorWindow.height + this._mapEditorWindow.y) {
        return currentTileId;
      }

      const index = this._mapEditorWindow.hitIndex();
      if (index >= 0) {
        return this._mapEditorWindow.commandName(index);
      }
    }

    updateMouse() {
      if (!this.canUpdateMouse()) {
        wasPressing = false;
        return;
      }

      this.updateDisplayPositionData();
      lastDisplayX = $gameMap._displayX;
      lastDisplayY = $gameMap._displayY;

      const pressed = TouchInput.isPressed();
      const { x, y } = TouchInput;
      const mapX = $gameMap.canvasToMapX(x);
      const mapY = $gameMap.canvasToMapY(y);

      const tile1 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 0, true);
      const tile2 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 1, true);
      const tile3 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 2, true);
      const tile4 = CycloneMapEditor.getCurrentTileAtPosition(mapX, mapY, 3, true);
      const region = $gameMap.regionId(mapX, mapY);
      const tileId = this.getSelectionTileAt(x, y);

      CycloneMapEditor.updateStatus({
        mapX,
        mapY,
        tile1,
        tile2,
        tile3,
        tile4,
        tileId,
        region,
      });

      if (!pressed && !wasPressing) {
        return;
      }

      if (this.updateMenuTouch(x, y, pressed)) {
        return;
      }

      if (mapX >= 0 && mapY >= 0) {
        this.updateCurrentToolTouch(mapX, mapY);
      }

      wasPressing = pressed;
    }

    updateRightTouch(x, y) {
      if (isRightButtonDown) {
        if (!wasRightButtonDown) {
          rectangleStartX = x;
          rectangleStartY = y;
          rectangleStartMouseX = TouchInput.x;
          rectangleStartMouseY = TouchInput.y;
        }

        rectangleWidth = (x - rectangleStartX + 1).clamp(0, 30);
        rectangleHeight = (y - rectangleStartY + 1).clamp(0, 30);
        rectangleBackWidth = (rectangleStartX - x).clamp(0, 30);
        rectangleBackHeight = (rectangleStartY - y).clamp(0, 30);

        if (this.crossedHorizontalLoop()) {
          // moved right through the edge, limit the width to it
          if (rectangleStartX > x) {
            rectangleWidth = $gameMap.width() - rectangleStartX;
            rectangleBackWidth = 0;
          } else if (x > rectangleStartX) {
            rectangleBackWidth = rectangleStartX;
            rectangleWidth = 0;
          }
        }

        if (this.crossedVerticalLoop()) {
          if (rectangleStartY > y) {
            rectangleHeight = $gameMap.height() - rectangleStartY;
            rectangleBackHeight = 0;
          } else if (y > rectangleStartY) {
            rectangleBackHeight = rectangleStartY;
            rectangleHeight = 0;
          }
        }
        this._spriteset._mapEditorCursor.updateDrawing();
        return;
      }

      if (wasRightButtonDown) {
        this.updateRectangleReleased();
        return;
      }
    }

    updateCurrentToolTouch(x, y) {
      switch(currentTool) {
        case 'fill':
          this.updateFill(x, y);
          break;
        case 'pencil':
          this.updatePencil(x, y);
          break;
        case 'rectangle':
          this.updateRectangle(x, y);
          break;
        case 'eraser':
          this.updateEraser(x, y);
          break;
      }
    }

    changeRectangleArea(previewOnly = false) {
      let startX = rectangleStartX;
      let startY = rectangleStartY;
      let applyWidth = 0;
      let applyHeight = 0;

      if (rectangleWidth > 0) {
        applyWidth = rectangleWidth;
      } else if (rectangleBackWidth > 0) {
        startX -= rectangleBackWidth;
        applyWidth = rectangleBackWidth +1;
      }

      if (rectangleHeight > 0) {
        applyHeight = rectangleHeight;
      } else if (rectangleBackHeight > 0) {
        startY -= rectangleBackHeight;
        applyHeight = rectangleBackHeight + 1;
      }

      if (applyWidth > 0 && applyHeight > 0) {
        if (wasRightButtonDown) {
          if (!previewOnly) {
            CycloneMapEditor.copyRectangle(startX, startY, applyWidth, applyHeight);
          }
        } else {
          CycloneMapEditor.applyRectangle(startX, startY, applyWidth, applyHeight, previewOnly);
        }
      }
    }

    updateRectangleReleased() {
      this.changeRectangleArea();

      rectangleWidth = 0;
      rectangleHeight = 0;
      rectangleBackWidth = 0;
      rectangleBackHeight = 0;
      this._spriteset._mapEditorCursor.updateDrawing();
    }

    crossedHorizontalLoop() {
      if (!$gameMap.isLoopHorizontal()) {
        return false;
      }

      // if moved left but the end position is to the right
      if ((rectangleStartMouseX > TouchInput.x && rectangleWidth > 0) ) {
        return true;
      }

      if ((rectangleStartMouseX < TouchInput.x && rectangleBackWidth > 0)) {
        return true;
      }

      return false;
    }

    crossedVerticalLoop() {
      if (!$gameMap.isLoopVertical()) {
        return false;
      }

      if ((rectangleStartMouseY > TouchInput.y && rectangleHeight > 0)) {
        return true;
      }

      if ((rectangleStartMouseY < TouchInput.y && rectangleBackHeight > 0)) {
        return true;
      }

      return false;
    }

    updateRectangle(x, y) {
      if (TouchInput.isPressed()) {
        if (!wasPressing) {
          rectangleStartX = x;
          rectangleStartY = y;
          rectangleStartMouseX = TouchInput.x;
          rectangleStartMouseY = TouchInput.y;
        }

        rectangleWidth = (x - rectangleStartX + 1).clamp(0, 30);
        rectangleHeight = (y - rectangleStartY + 1).clamp(0, 30);
        rectangleBackWidth = (rectangleStartX - x).clamp(0, 30);
        rectangleBackHeight = (rectangleStartY - y).clamp(0, 30);

        if (this.crossedHorizontalLoop()) {
          // moved right through the edge, limit the width to it
          if (rectangleStartX > x) {
            rectangleWidth = $gameMap.width() - rectangleStartX;
            rectangleBackWidth = 0;
          } else if (x > rectangleStartX) {
            rectangleBackWidth = rectangleStartX;
            rectangleWidth = 0;
          }
        }

        if (this.crossedVerticalLoop()) {
          if (rectangleStartY > y) {
            rectangleHeight = $gameMap.height() - rectangleStartY;
            rectangleBackHeight = 0;
          } else if (y > rectangleStartY) {
            rectangleBackHeight = rectangleStartY;
            rectangleHeight = 0;
          }
        }

        this.changeRectangleArea(true);
        this._spriteset._mapEditorCursor.updateDrawing();
        return;
      }

      if (wasPressing) {
        this.updateRectangleReleased();
        return;
      }
    }

    updateFill(x, y) {
      if (!TouchInput.isPressed() || wasPressing) {
        return;
      }

      CycloneMapEditor.applyFillArea(x, y);
    }

    updateEraser(x, y) {
      this.updateRectangle(x, y);
    }

    updatePencil(x, y) {
      if (TouchInput.isPressed()) {
        if (!currentChange) {
          currentChange = {};
        }

        CycloneMapEditor.applySelectedTiles(x, y);
        return;
      }

      if (wasPressing) {
        CycloneMapEditor.logChange();
      }
    }

    isMenuEnabled() {
      if (editorActive) {
        return false;
      }

      return $super.isMenuEnabled.call(this);
    }
  });

  CycloneMapEditor.patchClass(Tilemap, $super => class {
    _readMapData(x, y, z) {
      if (z <= 4 && !layerVisibility[z]) {
        return 0;
      }

      const tileIndex = CycloneMapEditor.tileIndex(x, y, z);
      if (previewChanges?.[tileIndex] !== undefined) {
        return previewChanges[tileIndex];
      }

      return $super._readMapData.call(this, x, y, z);
    }
  });

  CycloneMapEditor.patchClass(Spriteset_Map, $super => class {
    initialize() {
      $super.initialize.call(this);

      this.createMapEditorCursor();
    }

    createMapEditorCursor() {
      this._mapEditorCursor = new SpriteMapEditorCursor();
      this.addChild(this._mapEditorCursor);
    }
  });

  CycloneMapEditor.patchClass(Game_Map, $super => class {
    screenTileX() {
      if (!editorActive) {
        return $super.screenTileX.call(this);
      }

      return (Graphics.width - windowWidth) / tileWidth;
    }

    screenTileY() {
      if (!editorActive) {
        return $super.screenTileY.call(this);
      }

      return (Graphics.height - statusHeight) / this.tileHeight();
    }

    regionId(x, y) {
      if (editorActive) {
        return CycloneMapEditor.getCurrentTileAtPosition(x, y, 5, false);
      }

      return $super.regionId.call(this, x, y);
    }
  });

  CycloneMapEditor.patchClass(Game_Player, $super => class {
    centerX() {
      if (!editorActive) {
        return $super.centerX.call(this);
      }

      return ((Graphics.width - windowWidth) / tileWidth - 1) / 2.0;
    }

    centerY() {
      if (!editorActive) {
        return $super.centerY.call(this);
      }

      return ((Graphics.height - statusHeight) / $gameMap.tileHeight() - 1) / 2.0;
    }

    reserveTransfer(mapId, ...args) {
      if (changeHistory.length > 0) {
        if (confirm('Do you want to save your map before teleporting away?')) {
          CycloneMapEditor._doSave();
        }
      }

      $super.reserveTransfer.call(this, mapId, ...args);
    }
  });

  CycloneMapEditor.patchClass(SceneManager, $super => class {
    static onSceneTerminate() {
      CycloneMapEditor.refreshMenuVisibility();
    }
  });

  CycloneMapEditor.patchClass(TouchInput, $super => class {
    static _onLeftButtonDown(event) {
      $super._onLeftButtonDown.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene.updateMouse();
      }
    }

    static _onMouseMove(event) {
      $super._onMouseMove.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene.updateMouse();
        SceneManager._scene.updateRightMouse();
      }
    }

    static _onMouseUp(event) {
      $super._onMouseUp.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        if (event.button === 0) {
          SceneManager._scene.updateMouse();
        } else if (event.button === 2) {
          isRightButtonDown = false;
          SceneManager._scene.updateRightMouse();
        }
      }
    }

    static _onRightButtonDown(event) {
      $super._onRightButtonDown.call(this, event);

      if (SceneManager._scene instanceof Scene_Map) {
        isRightButtonDown = true;
        SceneManager._scene.updateRightMouse();
      }
    }
  });

  CycloneMapEditor.patchClass(Bitmap, $super => class {
    drawNormalTile(tileId, x, y, drawWidth, drawHeight) {
      const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);

      const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * tileWidth;
      const sourceY = (Math.floor((tileId % 256) / 8) % 16) * tileHeight;

      this.blt(bitmap, sourceX, sourceY, tileWidth, tileHeight, x, y, drawWidth ?? tileWidth, drawHeight ?? tileHeight);
      return bitmap;
    }

    drawAutoTileTable(bitmap, table, tileX, tileY, x, y, drawWidth, drawHeight) {
      const halfWidth = tileWidth / 2;
      const halfHeight = tileHeight / 2;
      const drawHalfWidth = (drawWidth ?? tileWidth) / 2;
      const drawHalfHeight = (drawHeight ?? tileHeight) / 2;

      for (let i = 0; i < 4; i++) {
        const tableX = table[i][0];
        const tableY = table[i][1];

        const sourceX = (tileX * tileWidth) + (tableX * halfWidth);
        const sourceY = (tileY * tileHeight) + (tableY * halfHeight);
        const targetX = x + (i % 2) * halfWidth;
        const targetY = y + Math.floor(i / 2) * halfHeight;

        this.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, drawHalfWidth, drawHalfHeight);
      }

      return bitmap;
    }

    drawTileA1(bitmap, tileId, x, y, drawWidth, drawHeight) {
      let tileX = 0;
      let tileY = 0;
      let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
      const kind = Tilemap.getAutotileKind(tileId);
      const shape = Tilemap.getAutotileShape(tileId);

      switch(kind) {
        case 0:
          tileX = 0;
          tileY = 0;
          break;
        case 1:
          tileX = 0;
          tileY = 3;
          break;
        case 2:
          tileX = 6;
          tileY = 0;
          break;
        case 3:
          tileX = 6;
          tileY = 3;
          break;
        default:
          tileX = Math.floor((kind % 8) / 4) * 8;
          tileY = Math.floor(kind / 8) * 6 + (Math.floor((kind % 8) / 2) % 2) * 3;

          if (kind % 2 === 1) {
            tileX += 6;
            autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
          }
          break;
      }

      return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
    }

    drawTileA2(bitmap, tileId, x, y, drawWidth, drawHeight) {
      const kind = Tilemap.getAutotileKind(tileId);
      const tileX = (kind % 8) * 2;
      const tileY = (Math.floor(kind / 8) - 2) * 3;
      const shape = Tilemap.getAutotileShape(tileId);

      return this.drawAutoTileTable(bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
    }

    drawTileA3(bitmap, tileId, x, y, drawWidth, drawHeight) {
      const kind = Tilemap.getAutotileKind(tileId);
      const tileX = (kind % 8) * 2;
      const tileY = (Math.floor(kind / 8) - 6) * 2;
      const shape = Tilemap.getAutotileShape(tileId);

      return this.drawAutoTileTable(bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
    }

    drawTileA4(bitmap, tileId, x, y, drawWidth, drawHeight) {
      const kind = Tilemap.getAutotileKind(tileId);
      const tileX = (kind % 8) * 2;
      const tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
      const shape = Tilemap.getAutotileShape(tileId);
      let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

      if (Math.floor(kind / 8) % 2 === 1) {
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
      }

      return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
    }

    drawAutoTile(tileId, x, y, drawWidth, drawHeight) {
      const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);

      if (Tilemap.isTileA1(tileId)) {
        return this.drawTileA1(bitmap, tileId, x, y, drawWidth, drawHeight);
      }

      if (Tilemap.isTileA2(tileId)) {
        return this.drawTileA2(bitmap, tileId, x, y, drawWidth, drawHeight);
      }

      if (Tilemap.isTileA3(tileId)) {
        return this.drawTileA3(bitmap, tileId, x, y, drawWidth, drawHeight);
      }

      if (Tilemap.isTileA4(tileId)) {
        return this.drawTileA4(bitmap, tileId, x, y, drawWidth, drawHeight);
      }
    }

    drawTile(tileId, x, y, drawWidth, drawHeight) {
      if (tileId <= 0) {
        return;
      }

      if (tileId >= Tilemap.TILE_ID_A1) {
        return this.drawAutoTile(tileId, x, y, drawWidth, drawHeight);
      }

      return this.drawNormalTile(tileId, x, y, drawWidth, drawHeight);
    }

    drawIcon(iconIndex, x, y) {
      const bitmap = ImageManager.loadSystem('IconSet');
      const pw = ImageManager.iconWidth;
      const ph = ImageManager.iconHeight;
      const sx = (iconIndex % 16) * pw;
      const sy = Math.floor(iconIndex / 16) * ph;
      this.blt(bitmap, sx, sy, pw, ph, x, y);
    }

    drawRegion(regionId, x, y, drawWidth, drawHeight) {
      const realDrawWidth = drawWidth ?? tileWidth;
      const realDrawHeight = drawHeight ?? tileHeight;

      if (regionId > 0) {
        const color = regionColors[regionId % regionColors.length];
        this.fillRect(x, y, realDrawWidth, realDrawHeight, `${ color}66`);
      }

      let iconIndex = CycloneMapEditor.regionIcons.get(regionId) ?? 0;
      if (iconIndex) {
        const {iconWidth, iconHeight} = ImageManager;
        const diffX = (realDrawWidth - iconWidth) / 2;
        const diffY = (realDrawHeight - iconHeight) / 2;

        this.drawIcon(iconIndex, x + diffX, y + diffY);
      } else {
        this.drawText(regionId, x, y, realDrawWidth, realDrawHeight, 'center');
      }
    }

    drawShadow(shadowId, x, y, drawWidth, drawHeight) {
      const halfWidth = (drawWidth ?? tileWidth) / 2;
      const halfHeight = (drawHeight ?? tileHeight) / 2;

      if (shadowId <= 0 || shadowId > 15) {
        return;
      }

      const table = shadowId.toString(2).padZero(4);
      for (let i = 0; i < 4; i++) {
        if (table[3 - i] !== '1') {
          continue;
        }

        const drawX = x + (i % 2) * halfWidth;
        const drawY = y + Math.floor(i / 2) * halfHeight;

        this.fillRect(drawX, drawY, halfWidth, halfHeight, '#00000066');
      }
    }
  });

  CycloneMapEditor.register();
})();

