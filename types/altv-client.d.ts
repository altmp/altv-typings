declare module "alt-client" {
  type StatName = "stamina" | "strength" | "lung_capacity" | "wheelie_ability" | "flying_ability" | "shooting_ability" | "stealth_ability";

  export interface DiscordOAuth2Token {
    readonly token: string
    readonly expires: number;
    readonly scopes: string;
  }

  export interface DiscordUser {
    readonly id: string;
    readonly name: string;
    readonly discriminator: string;
    readonly avatar: string;
  }

  export interface Vector2 {
    /** x component of Vector2 */
    readonly x: number;

    /** y component of Vector2 */
    readonly y: number;
  }

  export class Vector3 {
    /** x component of Vector3 */
    public readonly x: number;
    /** y component of Vector3 */
    public readonly y: number;
    /** z component of Vector3 */
    public readonly z: number;

    /**
     * @param x An x component.
     * @param y An y component.
     * @param z An z component.
     */
    constructor(x: number, y: number, z: number);
  }

  export class RGBA {
    /** r component of RGBA */
    public r: number;
    /** g component of RGBA */
    public g: number;
    /** b component of RGBA */
    public b: number;
    /** a component of RGBA */
    public a: number;

    /**
     * @param r An r component.
     * @param g An g component.
     * @param b An b component.
     * @param a An a component.
     */
    constructor(r: number, g: number, b: number, a: number);
  }

  export class BaseObject {
    /*
     * The type of the object.
     */
    public readonly type: number;

    /**
     * Value true if object is valid
     */
    public readonly valid: boolean;

    /*
     * Destroys the object.
     */
    public destroy(): void;

    /**
     * Removes the specified key.
     *
     * @param key The key of the value to remove.
     */
    public deleteMeta(key: string): void;

    /**
     * Gets a value using the specified key.
     *
     * @param key The key of the value to get.
     * @returns Dynamic value associated with the specified key.
     */
    public getMeta(key: string): any;

    /**
     * Determines whether contains the specified key.
     *
     * @param key The key of the value to locate.
     * @returns True when element associated with the specified key is stored.
     */
    public hasMeta(key: string): boolean;

    /**
     * Stores the given value with the specified key.
     *
     * @remarks The given value will be shared locally.
     * @param key The key of the value to store.
     */
    public setMeta(key: string, value: any): void;
  }

  export class WorldObject extends BaseObject {
    /**
     * Object position
     */
    public pos: Vector3;
  }

  export class Entity extends WorldObject {
    /** Entity unique id */
    public readonly id: number;

    /** Internal game id that can be used in native calls */
    public readonly scriptID: number;

    /** Hash of entity model */
    public readonly model: number;

    /**
     * Object position
     */
    public readonly pos: Vector3;

    /** Entity rotation in radians */
    public readonly rot: Vector3;

    /**
     * Retrieves the entity from the pool.
     *
     * @param id The id of the entity.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByID(id: number): Entity | null;

    /**
     * Retrieves the entity from the pool.
     *
     * @param scriptID The script id of the entity.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByScriptID(scriptID: number): Entity | null;

    /**
     * Gets a value using the specified key.
     *
     * @param key The key of the value to get.
     * @returns Dynamic value associated with the specified key.
     */
    public getSyncedMeta(key: string): any;

    /**
     * Determines whether contains the specified key.
     *
     * @param key The key of the value to locate.
     * @returns Return is dependent on whether element associated with the specified key is stored.
     */
    public hasSyncedMeta(key: string): boolean;

    /**
     * Gets a value using the specified key.
     *
     * @param key The key of the value to get.
     * @returns Dynamic value associated with the specified key.
     */
    public getStreamSyncedMeta(key: string): any;

    /**
     * Determines whether contains the specified key.
     *
     * @param key The key of the value to locate.
     * @returns Return is dependent on whether element associated with the specified key is stored.
     */
    public hasStreamSyncedMeta(key: string): boolean;
  }

  export class Player extends Entity {
    /** Array with all players */
    public static readonly all: Array<Player>;

    /**
     * Return the local player
     */
    public static readonly local: Player;

    /** Player talking state */
    public readonly isTalking: boolean;

    /** Player talking volume */
    public readonly micLevel: number;

    /** Player name */
    public readonly name: string;

    /** Player's vehicle, null if player is not in any vehicle */
    public readonly vehicle: Vehicle | null;

    /** @inheritdoc */
    public static getByID(id: number): Player | null;

    /** @inheritdoc */
    public static getByScriptID(scriptID: number): Player | null;
  }

  export class Vehicle extends Entity {
    /** Array with all vehicles */
    public static readonly all: Array<Vehicle>;

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

    /** @inheritdoc */
    public static getByID(id: number): Vehicle | null;

    /** @inheritdoc */
    public static getByScriptID(scriptID: number): Vehicle | null;
  }

  export class WebView extends BaseObject {
    /** View visibility state */
    public isVisible: boolean;
    /** View URL */
    public url: string;

    /**
     * Creates a fullscreen WebView.
     *
     * @param url URL.
     * @param isOverlay true to render as overlay, false to render on game's GUI stage
     */
    constructor(url: string, isOverlay?: boolean);

    /**
     * Creates a WebView rendered on game object.
     *
     * @param url URL.
     * @param propHash Hash of object to render on.
     * @param targetTexture Name of object's texture to replace.
     */
    constructor(url: string, propHash: number, targetTexture: string);

    /**
     * Emits specified event across particular WebView.
     *
     * @param eventName Name of the event.
     * @param args Rest parameters for emit to send.
     */
    public emit(eventName: string, ...args: any[]): void;

    public focus(): void;

    /**
     * Unsubscribes from WebView event handler with specified listener.
     *
     * @remarks Listener should be of the same reference as when event was subscribed.
     * @param eventName Name of the event.
     * @param listener Listener that should be removed.
     */
    public off(eventName: string, listener: (...args: any[]) => void): void;

    /**
     * Subscribes to WebView event handler with specified listener.
     *
     * @param eventName Name of the event.
     * @param listener Listener that should be added.
     */
    public on(eventName: string, listener: (...args: any[]) => void): void;

    /**
     * Subscribes to WebView event handler with specified listener.
     *
     * @param eventName Name of the event.
     * @param listener Listener that should be added.
     */
    public on(eventName: "load", listener: () => void): void;

    public unfocus(): void;
  }

  export class Blip extends WorldObject {
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
    public heading: number;
    public headingIndicatorVisible: boolean;
    public highDetail: boolean;
    public name: string;
    public number: number;
    public outlineIndicatorVisible: boolean;
    public priority: number;
    public pulse: boolean;
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

    public static getForModel(modelHash: number): HandlingData;
  }

  export class MapZoomData {
    public fZoomScale: number;
    public fZoomSpeed: number;
    public fScrollSpeed: number;
    public vTilesX: number;
    public vTilesY: number;

    public static get(zoomData: string): MapZoomData;

    public static resetAll(): void;

    public reset(): void;
  }

  export class LocalStorage {
    public static get(): LocalStorage;

    public delete(key: string): void;

    public deleteAll(): void;

    public get(key: string): any;

    public save(): void;

    public set(key: string, value: any): void;
  }

  export class MemoryBuffer {
    constructor(size: number);

    public byte(offset: number): number;

    public double(offset: number): number;

    public float(offset: number): number;

    public int(offset: number): number;

    public long(offset: number): bigint;

    public short(offset: number): number;

    public string(offset: number, length: number): string;

    public ubyte(offset: number): number;

    public uint(offset: number): number;

    public ulong(offset: number): bigint;

    public ushort(offset: number): number;

    public free(): boolean;
  }

  export class Discord {
    /*
     * Returns the current Discord user. Can be null.
     *
     * @remarks currentUser is only available if and only if Discord and alt:V are both started with administrator priviledges.
     */
    public static readonly currentUser: DiscordUser | null;

    /**
     * @deprecated
     */
    public static requestOAuth2Token(): Promise<DiscordOAuth2Token>;
  }

  export class File {
    /**
     * Determines whether file exists with the specified filename.
     *
     * @param filename The name of the file.
     * @returns Return is dependent on whether file with the specified filename exists.
     */
    public static exists(filename: string): boolean;

    /**
     * Reads content of the file.
     *
     * @param filename The name of the file.
     * @param encoding The encoding of the file. If not specified, it defaults to "utf-8".
     */
    public static read(filename: string, encoding?: "utf-8" | "utf-16"): string;

    /**
     * Reads content of the file.
     *
     * @param filename The name of the file.
     * @param encoding The encoding of the file.
     */
    public static read(filename: string, encoding: "binary"): ArrayBuffer;
  }

  export function addGxtText(key: string, value: string): void;

  export function beginScaleformMovieMethodMinimap(methodName: string): boolean;

  export function clearEveryTick(handle: number): void;

  export function clearInterval(handle: number): void;

  export function clearNextTick(handle: number): void;

  export function clearTimeout(handle: number): void;

  /**
   * @hidden
   */
  export function clearTimer(handle: number): void;

  /**
   * Emits specified event across client resources.
   *
   * @param player Event is sent to specific player.
   * @param eventName Name of the event.
   * @param args Rest parameters for emit to send.
   */
  export function emit(name: string, ...args: any[]): void;

  /**
   * Emits specified event to server.
   *
   * @param player Event is sent to specific player.
   * @param eventName Name of the event.
   * @param args Rest parameters for emit to send.
   */
  export function emitServer(name: string, ...args: any[]): void;

  export function everyTick(handler: () => void): number;

  export function gameControlsEnabled(): boolean;

  export function getCursorPos(): Vector2;

  export function getGxtText(key: string): string;

  export function getLicenseHash(): string;

  export function getLocale(): string;

  export function getMsPerGameMinute(): number;

  /**
   * Gets a value of the specified statistic.
   *
   * @param statName Name of the statistic.
   */
  export function getStat(statName: StatName): number;

  /**
   * Creates a hash using Jenkins one-at-a-time algorithm.
   *
   * @param str A string from which hash will be created.
   */
  export function hash(str: string): number;

  /**
   * Returns state of console window.
   *
   * @returns True when console window is opened.
   */
  export function isConsoleOpen(): boolean;

  /**
   * Sandbox mode
   *
   * @returns True when alt:V client is launched in sandbox mode.
   */
  export function isInSandbox(): boolean;

  /**
   * Returns state of user interface and console window.
   *
   * @returns True when user interface or console window is opened.
   */
  export function isMenuOpen(): boolean;

  export function isTextureExistInArchetype(modelHash: number, modelName: string): boolean;

  /**
   * @ignore Should not be used until fixed
   */
  export function loadModel(modelHash: number): void;

  /**
   * @ignore Should not be used until fixed
   */
  export function loadModelAsync(modelHash: number): void;

  export function log(...args: any[]): void;

  export function logError(...args: any[]): void;

  export function logWarning(...args: any[]): void;

  export function nextTick(handler: () => void): number;

  /**
   * Unsubscribes from client event handler with specified listener.
   *
   * @remarks Listener should be of the same reference as when event was subscribed.
   * @param eventName Name of the event.
   * @param listener Listener that should be removed.
   */
  export function off(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Unsubscribes from server event handler with specified listener.
   *
   * @remarks Listener should be of the same reference as when event was subscribed.
   * @param eventName Name of the event.
   * @param listener Listener that should be removed.
   */
  export function offServer(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "anyResourceError", listener: (resourceName: string) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "anyResourceStart", listener: (resourceName: string) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "anyResourceStop", listener: (resourceName: string) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "connectionComplete", listener: () => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "consoleCommand", listener: (name: string, ...args: string[]) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "disconnect", listener: () => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "gameEntityCreate", listener: (entity: Entity) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "gameEntityDestroy", listener: (entity: Entity) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "keydown", listener: (key: number) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "keyup", listener: (key: number) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "removeEntity", listener: (object: BaseObject) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "resourceStart", listener: (errored: boolean) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "resourceStop", listener: () => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "syncedMetaChange", listener: (entity: Entity, key: string, value: any) => void): void;

  /**
   * Subscribes to client event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: "streamSyncedMetaChange", listener: (entity: Entity, key: string, value: any) => void): void;

  /**
   * Subscribes to server event handler with specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function onServer(eventName: string, listener: (...args: any[]) => void): void;

  export function removeGxtText(key: string): void;

  /*
   * Unloads an IPL (Item PLacement) by its id.
   *
   * @remarks If the IPL is already unloaded, this method does nothing.
   */
  export function removeIpl(iplName: string): void;

  /*
   * Loads/Requests an IPL (Item PLacement) by its id.
   *
   * @remarks If the IPL is already loaded, this method does nothing.
   * @param iplName The identifier of the IPL to load.
   */
  export function requestIpl(iplName: string): void;

  /**
   * Output is saved to screenshots folder in root directory.
   *
   * @remarks Only available in sandbox mode.
   * @param stem Filename without extension.
   * @return Return is dependent on the success of the operation.
   */
  export function saveScreenshot(stem: string): boolean;

  /**
   * Resets a statistic to its default value.
   *
   * @param statName Name of the statistic.
   */
  export function resetStat(statName: StatName): void;

  export function setCamFrozen(state: boolean): void;

  export function setCursorPos(pos: Vector2): void;

  export function setInterval(handler: () => void, time: number): number;

  export function setModel(modelName: string): void;

  export function setMsPerGameMinute(ms: number): void;

  /**
   * Sets a statistic to desired value.
   *
   * @param statName Name of the statistic.
   * @param value Value of the statistic you want to set.
   */
  export function setStat(statName: StatName, value: number): void;

  export function setTimeout(handler: () => void, time: number): number;

  export function setWeatherCycle(weathers: Array<any>, multipliers: Array<any>): void;

  export function setWeatherSyncActive(isActive: boolean): void;

  /**
   * Changes the visibility of cursor.
   *
   * @remarks This is handled by resource scoped internal integer, which gets increased/decreased by every function call. When you show your cursor 5 times, to hide it you have to do that 5 times accordingly.
   * @param state A boolean indicating whenever cursor should be visible or not.
   */
  export function showCursor(state: boolean): void;

  export function toggleGameControls(state: boolean): void;

  export function toggleVoiceControls(state: boolean): void;
}
