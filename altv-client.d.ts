declare module alt {
  /** Class representing Vector3 */
  export class Vector3 {
    /**
     * Create a Vector3
     * 
     * @param x x component
     * @param y y component
     * @param z z component
     */
    constructor(x: number, y: number, z: number);

    /** x component of Vector3 */
    readonly x: number;

    /** y component of Vector3 */
    readonly y: number;

    /** z component of Vector3 */
    readonly z: number;
  }

  /** Base class for any alt:V object */
  export class BaseObject {
    /** Object type */
    readonly type: number;

    /**
     * true if object is valid
     * 
     * @deprecated always true now
     */
    readonly valid: boolean;

    /** Destroy object */
    destroy(): void;

    /**
     * Get meta-data value
     * 
     * @param key key
     * @returns value
     */
    getMeta(key: string): any;

    /**
     * Set meta-data value
     * 
     * @param key key
     * @param value value
     */
    setMeta(key: string, value: any): void;
  }

  /** Base class for any object that exists in game world */
  export class WorldObject extends BaseObject {
    /** Object position */
    readonly pos: Vector3;
  }

  /** Base class for network entities */
  export class Entity extends WorldObject {
    /** Entity unique id */
    readonly id: number;

    /** Internal game id that can be used in native calls */
    readonly scriptID: number;
    
    /** Hash of entity model */
    readonly model: number;

    /** Entity rotation */
    readonly rot: Object;

    /**
     * Get synced meta-data value
     * 
     * @param key key
     * @returns value
     */
    getSyncedMeta(key: string): any;
  }

  /** Class representing alt:V Player */
  export class Player extends Entity {
    /** Array with all players */
    static readonly all: Array<Player>;

    /** Local player */
    static readonly local: Player;
    
    /** Player talking state */
    readonly isTalking: boolean;

    /** Name */
    readonly name: string;

    /** Player's vehicle, null if player is not in any vehicle */
    readonly vehicle: Vehicle|null;

    addWeaponComponent(weaponHash: number, componentHash: number): void;
    getCurrentWeapon(): number;
    getWeaponTintIndex(weaponHash: number): number;
    giveWeapon(weaponHash: number, ammoCount: number): void;
    removeAllWeapons(): void;
    removeWeapon(weaponHash: number): boolean;
    removeWeaponComponent(weaponHash: number, componentHash: number): void;
    setCurrentWeapon(weaponHash: number): void;
    setWeaponTintIndex(weaponHash: number, tintIndex: number): void;
    weaponHasComponent(weaponHash: number, componentHash: number): boolean;
  }

  /** Class representing alt:V Vehicle */
  export class Vehicle extends Entity {
    /** Array with all vehicles */
    static readonly all: Array<Vehicle>;

    /** vehicle gear */
    readonly gear: number;

    /** vehicle RPM [0, 1] */
    readonly rpm: number;

    /** vehicle wheel speed */
    readonly speed: number;

    /** vehicle wheel speed vector */
    readonly speedVector: Vector3;

    /** vehicle wheel count */
    readonly wheelsCount: number;
  }

  /** Class representing web view */
  export class WebView extends BaseObject {
    /**
     * Creates a fullscreen WebView
     * 
     * @param url URL
     * @param isOverlay true to render as overlay, false to render on game's GUI stage
     */
    constructor(url: string, isOverlay: boolean);

    /**
     * Creates a WebView rendered on game object
     * 
     * @param url URL
     * @param propHash hash of object to render on
     * @param targetTexture name of object's texture to replace
     */
    constructor(url: string, propHash: number, targetTexture: string);

    /** view visibility state */
    isVisible: boolean;

    /** view URL */
    url: string;
    
    emit(evName: string, ...args: any[]): void;
    execJS(p0: string): void;
    focus(): void;
    off(evName: string, p1Fn: Function): void;
    on(evName: string, p1Fn: Function): void;
    unfocus(): void;
  }

  export class Blip extends BaseObject {
    alpha: number;
    asMissionCreator: boolean;
    bright: boolean;
    category: number;
    color: number;
    crewIndicatorVisible: boolean;
    flashInterval: number;
    flashTimer: number;
    flashes: boolean;
    flashesAlternate: boolean;
    friendIndicatorVisible: boolean;
    friendly: boolean;
    gxtName: string;
    headingIndicatorVisible: boolean;
    highDetail: boolean;
    name: string;
    number: number;
    outlineIndicatorVisible: boolean;
    position: Array<any>;
    priority: number;
    pulse: boolean;
    rotation: number;
    route: boolean;
    routeColor: number;
    scale: number;
    secondaryColor: number;
    shortRange: boolean;
    showCone: boolean;
    shrinked: boolean;
    sprite: number;
    tickVisible: boolean;

    fade(duration: number, p1: number): void;
  }

  export class AreaBlip extends Blip {
    constructor(p0: number, p1: number, p2: number, p3: number, p4: number);
  }

  export class RadiusBlip extends Blip {
    constructor(p0: number, p1: number, p2: number, p3: number);
  }

  export class PointBlip extends Blip {
    constructor(p0: number, p1: number, p2: number);
  }

  export class HandlingData {
    static getForModel(modelHash: number): any;

    acceleration: number;
    antiRollBarBiasFront: number;
    antiRollBarBiasRear: number;
    antiRollBarForce: number;
    brakeBiasFront: number;
    brakeBiasRear: number;
    breakForce: number;
    camberStiffnesss: number;
    centreOfMassOffset: Vector3;
    clutchChangeRateScaleDownShift: number;
    clutchChangeRateScaleUpShift: number;
    collisionDamageMult: number;
    damageFlags: number;
    deformationDamageMult: number;
    downforceModifier: number;
    driveBiasFront: number;
    driveInertia: number;
    driveMaxFlatVel: number;
    engineDamageMult: number;
    handBrakeForce: number;
    handlingFlags: number;
    readonly handlingNameHash: number;
    inertiaMultiplier: any|number|Object;
    initialDragCoeff: number;
    initialDriveForce: number;
    initialDriveGears: number;
    initialDriveMaxFlatVel: number;
    lowSpeedTractionLossMult: number;
    mass: number;
    modelFlags: number;
    monetaryValue: number;
    oilVolume: number;
    percentSubmerged: number;
    percentSubmergedRatio: number;
    petrolTankVolume: number;
    rollCentreHeightFront: number;
    rollCentreHeightRear: number;
    seatOffsetDistX: number;
    seatOffsetDistY: number;
    seatOffsetDistZ: number;
    steeringLock: number;
    steeringLockRatio: number;
    suspensionBiasFront: number;
    suspensionBiasRear: number;
    suspensionCompDamp: number;
    suspensionForce: number;
    suspensionLowerLimit: number;
    suspensionRaise: number;
    suspensionReboundDamp: number;
    suspensionUpperLimit: number;
    tractionBiasFront: number;
    tractionBiasRear: number;
    tractionCurveLateral: number;
    tractionCurveLateralRatio: number;
    tractionCurveMax: number;
    tractionCurveMaxRatio: number;
    tractionCurveMin: number;
    tractionCurveMinRatio: number;
    tractionLossMult: number;
    tractionSpringDeltaMax: number;
    tractionSpringDeltaMaxRatio: number;
    unkFloat1: number;
    unkFloat2: number;
    unkFloat4: number;
    unkFloat5: number;
    weaponDamageMult: number;
  }

  export class LocalStorage {
    delete(key: string): void;
    deleteAll(): void;
    get(key: string): any;
    save(): void;
    set(key: string, val: any): void;

    static get(): LocalStorage;
  }

  export class MemoryBuffer {
    constructor(size: number);

    byte(offset: number, value: number): number;
    double(offset: number, value: number): number;
    float(offset: number, value: number): number;
    int(offset: number, value: number): number;
    long(offset: number, value: number): bigint;
    short(offset: number, value: number): number;
    string(offset: number, value: number): string;
    ubyte(offset: number, value: number): number;
    uint(offset: number, value: number): number;
    ulong(offset: number, value: number): bigint;
    ushort(offset: number, value: number): number;
    free(): boolean;
  }

  export class File {
    static exists(name: string): boolean;
    static read(name: string, p1: string): string|ArrayBuffer;
  }

  export function addGxtText(key: string, textValue: string): void;
  export function beginScaleformMovieMethodMinimap(methodName: string): boolean;
  export function clearEveryTick(time: number): void;
  export function clearInterval(time: number): void;
  export function clearNextTick(time: number): void;
  export function clearTimeout(time: number): void;
  export function clearTimer(time: number): void;
  export function disableVoiceActivation(): void;
  export function disableVoiceInput(): boolean;
  export function disableVoiceTest(): boolean;
  export function discordInfo(): Object|null;
  export function discordRequestOAuth2(): boolean;
  export function emit(name: string, ...args: any[]): void;
  export function emitServer(name: string, ...args: any[]): void;
  export function enableVoiceActivation(activateOn: number, activationTime: number): void;
  export function enableVoiceInput(): boolean;
  export function enableVoiceTest(): boolean;
  export function everyTick(callbackFn: Function): number;
  export function gameControlsEnabled(): boolean;
  export function getCursorPos(): { x: number, y: number};
  export function getDiscordOAuth2Result(): any;
  export function getGxtText(key: string): string;
  export function getLicenseHash(): string;
  export function getLocalPlayer(): Player;
  export function getLocale(): string;
  export function getMicLevel(): number;
  export function getMsPerGameMinute(): number;
  export function getVehWheels(vehId: number): number;
  export function initVoice(bitrate: number): boolean;
  export function isDiscordInfoReady(): boolean;
  export function isDiscordOAuth2Accepted(): boolean;
  export function isDiscordOAuth2Finished(): boolean;
  export function isInSandbox(): boolean;
  export function isTextureExistInArchetype(modelHash: number, modelName: string): boolean;
  export function loadModel(modelHash: number): void;
  export function loadModelAsync(modelHash: number): void;
  export function log(...val: any[]): void;
  export function logError(...val: any[]): void;
  export function logWarning(...val: any[]): void;
  export function nextTick(callbackFn: Function): number;
  export function off(evName: string, callbackFn: Function): void;
  export function offServer(evName: string, callbackFn: Function): void;
  export function on(evName: string, callbackFn: Function): void;
  export function onServer(evName: string, callbackFn: Function): void;
  export function removeGxtText(key: string): void;
  export function removeIpl(iplName: string): void;
  export function requestIpl(iplName: string): void;
  export function saveScreenshot(fileName: string): boolean;
  export function setCamFrozen(state: boolean): void;
  export function setCursorPos(pos: Object): void;
  export function setInterval(callbackFn: Function, time: number|number): number;
  export function setMicGain(micGain: number): void;
  export function setModel(modelName: string): void;
  export function setMsPerGameMinute(ms: number): void;
  export function setTimeout(callbackFn: Function, time: number|number): number;
  export function setWeatherCycle(weathers: Array<any>, multipliers: Array<any>): void;
  export function setWeatherSyncActive(isActive: boolean): void;
  export function showCursor(state: boolean): void;
  export function toggleGameControls(state: boolean): void;
}
