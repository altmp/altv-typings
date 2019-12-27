declare module "alt-server" {
  type FileEncoding = "utf-8" | "utf-16" | "binary";

  export const resourceName: string;

  export interface VehicleNeon {
    left: boolean;
    right: boolean;
    front: boolean;
    back: boolean;
  }

  export class Vector3 {
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    constructor(x: number, y: number, z: number);
  }

  export class RGBA {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r: number, g: number, b: number, a: number);
  }

  export class Entity extends WorldObject {
    public readonly id: number;
    public model: number | string;
    public rot: Vector3;

    public static getByID(id: number): Entity | null;

    public getSyncedMeta(key: string): any;

    public setSyncedMeta(key: string, p1: any): void;
  }

  export class WorldObject extends BaseObject {
    public dimension: number;
    public pos: Vector3;
  }

  export class BaseObject {
    public readonly type: number;
    public readonly valid: boolean;

    public destroy(): void;

    public getMeta(key: string): any;

    public setMeta(key: string, p1: any): void;
  }

  export class File {
    public static exists(filename: string): boolean;

    public static read(filename: string, encoding?: FileEncoding): string | ArrayBuffer;
  }

  export class Player extends Entity {
    public static all: Array<Player>;
    public armour: number;
    public currentWeapon: number;
    public currentWeaponComponents: Array<number>;
    public currentWeaponTintIndex: number;
    public entityAimOffset: Vector3;
    public entityAimingAt: Entity | null;
    public flashlightActive: boolean;
    public health: number;
    public ip: string;
    public maxArmour: number;
    public maxHealth: number;
    public name: string;
    public ping: number;
    public seat: number;
    public vehicle: Vehicle | null;

    public addWeaponComponent(weaponHash: number, component: number): void;

    public giveWeapon(weaponHash: number, ammo: number, equipNow: boolean): void;

    public kick(): void;

    public removeAllWeapons(): void;

    public removeWeapon(weaponHash: number): void;

    public removeWeaponComponent(weaponHash: number, component: number): void;

    public setDateTime(day: number, month: number, year: number, hour: number, minute: number, second: number): void;

    public setWeaponTintIndex(weaponHash: number, tintIndex: number): void;

    public setWeather(weatherHash: number): void;

    public spawn(x: number, y: number, z: number, delay: number): void;
  }

  export class Vehicle extends Entity {
    static readonly all: Array<Vehicle>;
    public activeRadioStation: number;
    public bodyAdditionalHealth: number;
    public bodyHealth: number;
    public customPrimaryColor: RGBA;
    public customSecondaryColor: RGBA;
    public customTires: boolean;
    public darkness: number;
    public dashboardColor: number;
    public readonly daylightOn: boolean;
    public dirtLevel: number;
    public driver: Player | null;
    public engineHealth: number;
    public engineOn: boolean;
    public readonly flamethrowerActive: boolean;
    public readonly handbrakeActive: boolean;
    public readonly hasArmoredWindows: number;
    public headlightColor: number;
    public interiorColor: number;
    public lockState: number;
    public manualEngineControl: boolean;
    public modKit: number;
    public modKitsCount: number;
    public neon: VehicleNeon;
    public neonColor: RGBA;
    public readonly nightlightOn: boolean;
    public numberPlateIndex: number;
    public numberPlateText: string;
    public pearlColor: number;
    public petrolTankHealth: number;
    public primaryColor: number;
    public readonly repairsCount: number;
    public roofOpened: boolean;
    public secondaryColor: number;
    public sirenActive: boolean;
    public tireSmokeColor: RGBA;
    public wheelColor: number;
    public readonly wheelsCount: number;
    public readonly wheelType: number;
    public readonly frontWheels: number;
    public readonly rearWheels: number;
    public windowTint: number;

    constructor(model: string | number, x: number, y: number, z: number, rx: number, ry: number, rz: number);

    public doesWheelHasTire(wheelId: number): boolean;

    public getAppearanceDataBase64(): string;

    public getArmoredWindowHealth(windowId: number): number;

    public getArmoredWindowShootCount(windowId: number): number;

    public getBumperDamageLevel(bumperId: number): number;

    public getDamageStatusBase64(): string;

    public getDoorState(doorId: number): number;

    public getExtra(category: number): boolean;

    public getGamestateDataBase64(): string;

    public getHealthDataBase64(): string;

    public getMod(category: number): number;

    public getModsCount(category: number): number;

    public getPartBulletHoles(partId: number): number;

    public getPartDamageLevel(partId: number): number;

    public getScriptDataBase64(): string;

    public getWheelHealth(wheelId: number): number;

    public isLightDamaged(lightId: number): boolean;

    public isSpecialLightDamaged(specialLightId: number): boolean;

    public isWheelBurst(wheelId: number): boolean;

    public isWheelDetached(wheelId: number): boolean;

    public isWheelOnFire(wheelId: number): boolean;

    public isWindowDamaged(windowId: number): boolean;

    public isWindowOpened(windowId: number): boolean;

    public setAppearanceDataBase64(data: string): void;

    public setArmoredWindowHealth(windowId: number, health: number): void;

    public setArmoredWindowShootCount(windowId: number, count: number): void;

    public setBumperDamageLevel(bumperId: number, level: number): void;

    public setDamageStatusBase64(data: string): void;

    public setDoorState(doorId: number, state: number): void;

    public setExtra(category: number, state: boolean): void;

    public setGamestateDataBase64(data: string): void;

    public setHealthDataBase64(data: string): void;

    public setLightDamaged(lightId: number, isDamaged: boolean): void;

    public setMod(category: number, id: number): void;

    public setPartBulletHoles(partId: number, count: number): void;

    public setPartDamageLevel(partId: number, level: number): void;

    public setScriptDataBase64(data: string): void;

    public setSpecialLightDamaged(specialLightId: number, isDamaged: boolean): void;

    public setWheelBurst(wheelId: number, state: boolean): void;

    public setWheelHasTire(wheelId: number, state: boolean): void;

    public setWheelDetached(wheelId: number, state: boolean): void;

    public setWheelOnFire(wheelId: number, state: boolean): void;

    public setWheelHealth(wheelId: number, health: number): void;

    public setWheels(type: number, variation: number): void;

    public setRearWheels(variation: number): void;

    public setWindowDamaged(windowId: number, isDamaged: boolean): void;

    public setWindowOpened(windowId: number, state: boolean): void;
  }

  export class Blip extends WorldObject {

  }

  export class PointBlip extends Blip {
    constructor(type: number, x: number, y: number, z: number);
  }

  export class Checkpoint extends WorldObject {
    constructor(type: number, x: number, y: number, z: number, radius: number, height: number, r: number, g: number, b: number, a: number);
  }

  export class VoiceChannel extends BaseObject {
    constructor(isSpatial: boolean, maxDistance: number);

    public addPlayer(player: Player): void;

    public isPlayerInChannel(player: Player): boolean;

    public isPlayerMuted(player: Player): boolean;

    public mutePlayer(player: Player): void;

    public removePlayer(player: Player): void;

    public unmutePlayer(player: Player): void;
  }

  export class Colshape extends WorldObject {
    public colshapeType: number;

    public isEntityIn(entity: Entity): boolean;
  }

  export class ColshapeCylinder extends Colshape {
    constructor(x: number, y: number, z: number, radius: number, height: number);
  }

  export class ColshapeSphere extends Colshape {
    constructor(x: number, y: number, z: number, radius: number);
  }

  export class ColshapeCircle extends Colshape {
    constructor(x: number, y: number, radius: number);
  }

  export class ColshapeCuboid extends Colshape {
    constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number);
  }

  export class ColshapeRectangle extends Colshape {
    constructor(x1: number, y1: number, x2: number, y2: number);
  }

  export function emit(eventName: string, ...args: any[]): void;

  export function emitClient(player: Player | null, eventName: string, ...args: any[]): void;

  export function getNetTime(): number;

  export function getPlayersByName(name: string): Array<Player>;

  export function getResourceExports(name: string): any;

  export function getResourceMain(name: string): string;

  export function getResourcePath(name: string): string;

  export function hasResource(name: string): boolean;

  export function hash(str: string): number;

  export function log(...args: any[]): void;

  export function logError(...args: any[]): void;

  export function logWarning(...args: any[]): void;

  export function off(eventName: string, listener: Function): void;

  export function offClient(eventName: string, listener: Function): void;

  export function on(eventName: string, listener: Function): void;

  export function onClient(eventName: string, listener: Function): void;

  export function restartResource(name: string): void;

  export function startResource(name: string): void;

  export function stopResource(name: string): void;
}