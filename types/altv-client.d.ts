declare module "alt-client" {
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
    public readonly x: number;

    /** y component of Vector3 */
    public readonly y: number;

    /** z component of Vector3 */
    public readonly z: number;
  }

  /** Base class for any alt:V object */
  export class BaseObject {
    /** Object type */
    public readonly type: number;

    /**
     * Value true if object is valid
     *
     * @deprecated Always true now
     */
    public readonly valid: boolean;

    /** Destroy object */
    public destroy(): void;

    /**
     * Get meta-data value
     *
     * @param key key
     * @returns value
     */
    public getMeta(key: string): any;

    /**
     * Set meta-data value
     *
     * @param key key
     * @param value value
     */
    public setMeta(key: string, value: any): void;
  }

  /** Base class for any object that exists in game world */
  export class WorldObject extends BaseObject {
    /** Object position */
    public readonly pos: Vector3;
  }

  /** Base class for network entities */
  export class Entity extends WorldObject {
    /** Entity unique id */
    public readonly id: number;

    /** Internal game id that can be used in native calls */
    public readonly scriptID: number;

    /** Hash of entity model */
    public readonly model: number;

    /** Entity rotation */
    public readonly rot: Vector3;

    /**
     * Get synced meta-data value
     *
     * @param key key
     * @returns value
     */
    public getSyncedMeta(key: string): any;
    public static getByID(id: number): Entity|null;
    public static getByScriptID(scriptID: number): Entity|null;
  }

  /** Class representing alt:V Player */
  export class Player extends Entity {
    /** Array with all players */
    public static readonly all: Array<Player>;

    /** Local player */
    public static readonly local: Player;

    /** Player talking state */
    public readonly isTalking: boolean;

    /** Name */
    public readonly name: string;

    /** Player's vehicle, null if player is not in any vehicle */
    public readonly vehicle: Vehicle|null;

    public addWeaponComponent(weaponHash: number, componentHash: number): void;
    public getWeaponTintIndex(weaponHash: number): number;
    public giveWeapon(weaponHash: number, ammoCount: number): void;
    public removeAllWeapons(): void;
    public removeWeapon(weaponHash: number): boolean;
    public removeWeaponComponent(weaponHash: number, componentHash: number): void;
    public setCurrentWeapon(weaponHash: number): void;
    public setWeaponTintIndex(weaponHash: number, tintIndex: number): void;
    public weaponHasComponent(weaponHash: number, componentHash: number): boolean;
  }

  /** Class representing alt:V Vehicle */
  export class Vehicle extends Entity {
    /** Array with all vehicles */
    static readonly all: Array<Vehicle>;

    /** Vehicle gear */
    public gear: number;

    /** Vehicle RPM [0, 1] */
    public readonly rpm: number;

    /** Vehicle wheel speed */
    public readonly speed: number;

    /** Vehicle wheel speed vector */
    public readonly speedVector: Vector3;

    /** Vehicle wheel count */
    public readonly wheelsCount: number;
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

    /** View visibility state */
    public isVisible: boolean;

    /** View URL */
    public url: string;

    public emit(eventName: string, ...args: any[]): void;
    public focus(): void;
    public off(eventName: string, listener: Function): void;
    public on(eventName: string, listener: Function): void;
    public unfocus(): void;
  }

  export class Blip extends BaseObject {
    public alpha: number;
    public asMissionCreator: boolean;
    public bright: boolean;
    public category: number;
    public color: number;
    public crewIndicatorVisible: boolean;
    public flashInterval: number;
    public flashTimer: number;
    public flashes: boolean;
    public flashesAlternate: boolean;
    public friendIndicatorVisible: boolean;
    public friendly: boolean;
    public gxtName: string;
    public headingIndicatorVisible: boolean;
    public highDetail: boolean;
    public name: string;
    public number: number;
    public outlineIndicatorVisible: boolean;
    public position: Vector3;
    public priority: number;
    public pulse: boolean;
    public rotation: number;
    public route: boolean;
    public routeColor: number;
    public scale: number;
    public secondaryColor: number;
    public shortRange: boolean;
    public showCone: boolean;
    public shrinked: boolean;
    public sprite: number;
    public tickVisible: boolean;

    public fade(opacity: number, duration: number): void;
  }

  export class AreaBlip extends Blip {
    constructor(x: number, y: number, z: number, width: number, height: number);
  }

  export class RadiusBlip extends Blip {
    constructor(x: number, y: number, z: number, radius: number);
  }

  export class PointBlip extends Blip {
    constructor(x: number, y: number, z: number);
  }

  export class HandlingData {
    static getForModel(modelHash: number): HandlingData;

    public acceleration: number;
    public antiRollBarBiasFront: number;
    public antiRollBarBiasRear: number;
    public antiRollBarForce: number;
    public brakeBiasFront: number;
    public brakeBiasRear: number;
    public breakForce: number;
    public camberStiffnesss: number;
    public centreOfMassOffset: Vector3;
    public clutchChangeRateScaleDownShift: number;
    public clutchChangeRateScaleUpShift: number;
    public collisionDamageMult: number;
    public damageFlags: number;
    public deformationDamageMult: number;
    public downforceModifier: number;
    public driveBiasFront: number;
    public driveInertia: number;
    public driveMaxFlatVel: number;
    public engineDamageMult: number;
    public handBrakeForce: number;
    public handlingFlags: number;
    public readonly handlingNameHash: number;
    public inertiaMultiplier: Vector3;
    public initialDragCoeff: number;
    public initialDriveForce: number;
    public initialDriveGears: number;
    public initialDriveMaxFlatVel: number;
    public lowSpeedTractionLossMult: number;
    public mass: number;
    public modelFlags: number;
    public monetaryValue: number;
    public oilVolume: number;
    public percentSubmerged: number;
    public percentSubmergedRatio: number;
    public petrolTankVolume: number;
    public rollCentreHeightFront: number;
    public rollCentreHeightRear: number;
    public seatOffsetDistX: number;
    public seatOffsetDistY: number;
    public seatOffsetDistZ: number;
    public steeringLock: number;
    public steeringLockRatio: number;
    public suspensionBiasFront: number;
    public suspensionBiasRear: number;
    public suspensionCompDamp: number;
    public suspensionForce: number;
    public suspensionLowerLimit: number;
    public suspensionRaise: number;
    public suspensionReboundDamp: number;
    public suspensionUpperLimit: number;
    public tractionBiasFront: number;
    public tractionBiasRear: number;
    public tractionCurveLateral: number;
    public tractionCurveLateralRatio: number;
    public tractionCurveMax: number;
    public tractionCurveMaxRatio: number;
    public tractionCurveMin: number;
    public tractionCurveMinRatio: number;
    public tractionLossMult: number;
    public tractionSpringDeltaMax: number;
    public tractionSpringDeltaMaxRatio: number;
    public unkFloat1: number;
    public unkFloat2: number;
    public unkFloat4: number;
    public unkFloat5: number;
    public weaponDamageMult: number;
  }

  export class MapZoomData {
    public fZoomScale: number;
    public fZoomSpeed: number;
    public fScrollSpeed: number;
    public vTilesX: number;
    public vTilesY: number;

    public reset(): void;

    static get(zoomData: string): MapZoomData;
    static resetAll(): void;
  }

  export class LocalStorage {
    public delete(key: string): void;
    public deleteAll(): void;
    public get(key: string): any;
    public save(): void;
    public set(key: string, value: any): void;

    static get(): LocalStorage;
  }

  export class MemoryBuffer {
    constructor(size: number);

    public byte(offset: number, value: number): number;
    public double(offset: number, value: number): number;
    public float(offset: number, value: number): number;
    public int(offset: number, value: number): number;
    public long(offset: number, value: number): bigint;
    public short(offset: number, value: number): number;
    public string(offset: number, value: number): string;
    public ubyte(offset: number, value: number): number;
    public uint(offset: number, value: number): number;
    public ulong(offset: number, value: number): bigint;
    public ushort(offset: number, value: number): number;
    public free(): boolean;
  }

  export class File {
    public static exists(filename: string): boolean;
    public static read(filename: string, encoding?: "utf-8"): string|ArrayBuffer;
    public static read(filename: string, encoding?: "utf-16"): string|ArrayBuffer;
    public static read(filename: string, encoding?: "binary"): string|ArrayBuffer;
  }

  export function addGxtText(key: string, value: string): void;
  export function beginScaleformMovieMethodMinimap(methodName: string): boolean;
  export function clearEveryTick(handle: number): void;
  export function clearInterval(handle: number): void;
  export function clearNextTick(handle: number): void;
  export function clearTimeout(handle: number): void;
  export function clearTimer(handle: number): void;
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
  export function everyTick(handler: Function): number;
  export function gameControlsEnabled(): boolean;
  export function getCursorPos(): { x: number, y: number};
  export function getDiscordOAuth2Result(): any;
  export function getGxtText(key: string): string;
  export function getLicenseHash(): string;
  export function getLocalPlayer(): Player;
  export function getLocale(): string;
  export function getMicLevel(): number;
  export function getMsPerGameMinute(): number;
  export function getVehWheels(vehicleScriptId: number): number;
  export function initVoice(bitrate: number): boolean;
  export function isDiscordInfoReady(): boolean;
  export function isDiscordOAuth2Accepted(): boolean;
  export function isDiscordOAuth2Finished(): boolean;
  export function isInSandbox(): boolean;
  export function isTextureExistInArchetype(modelHash: number, modelName: string): boolean;
  export function loadModel(modelHash: number): void;
  export function loadModelAsync(modelHash: number): void;
  export function log(...args: any[]): void;
  export function logError(...args: any[]): void;
  export function logWarning(...args: any[]): void;
  export function nextTick(handler: Function): number;
  export function off(eventName: string, listener: Function): void;
  export function offServer(eventName: string, listener: Function): void;
  export function on(eventName: string, listener: Function): void;
  export function onServer(eventName: string, listener: Function): void;
  export function removeGxtText(key: string): void;
  export function removeIpl(iplName: string): void;
  export function requestIpl(iplName: string): void;
  export function saveScreenshot(filename: string): boolean;
  export function setCamFrozen(state: boolean): void;
  export function setCursorPos(pos: Vector3): void;
  export function setInterval(handler: Function, time: number): number;
  export function setMicGain(micGain: number): void;
  export function setModel(modelName: string): void;
  export function setMsPerGameMinute(ms: number): void;
  export function setTimeout(handler: Function, time: number): number;
  export function setWeatherCycle(weathers: Array<any>, multipliers: Array<any>): void;
  export function setWeatherSyncActive(isActive: boolean): void;
  export function showCursor(state: boolean): void;
  export function toggleGameControls(state: boolean): void;
}