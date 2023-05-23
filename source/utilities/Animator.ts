import { Application } from "../Application";
import { Data } from "@jeremy-bankes/toolbox";
import { Vector2 } from "../math/Vector2";
import { Vector4 } from "../math/Vector4";

/**
 * The meta information describing an animation controlled by {@link Animator}.
 */
export type AnimationMeta = {
    first: number,
    last: number,
    frameRate?: number
};

/**
 * A mapping of animation names to {@link AnimationMeta}s
 */
export type AnimationMap = {
    [Name: string]: AnimationMeta
};

/**
 * Controls the animation of a spritesheet by providing dynamic texture coordinates.
 */
export class Animator<Map extends AnimationMap> {

    public readonly sheetSize: Vector2;
    public readonly spriteSize: Vector2;
    public readonly spriteGrid: Vector2;
    private _frameTime: number;
    private _remainingFrameTime: number;
    private _currentSpriteIndex = 0;
    private _animations: Map;
    private _currentAnimationName: keyof Map;

    /**
     * @param sheetSize The size of the spritesheet to animate in pixel coordinates.
     * @param spriteSize The size of a single sprite in pixel coordinates.
     * @param animations A mapping of names to {@link AnimationMeta}s.
     * @see {@link AnimationMap}.
     */
    public constructor(sheetSize: Vector2, spriteSize: Vector2, animations: Map) {
        Data.assert(sheetSize.width % spriteSize.width === 0, `Sprites of width ${spriteSize.width} do not pack nicely into a sprite sheet of width ${sheetSize.width}!`);
        Data.assert(sheetSize.height % spriteSize.height === 0, `Sprites of height ${spriteSize.height} do not pack nicely into a sprite sheet of height ${sheetSize.height}!`);
        Data.assert(Object.keys(animations).length > 0, `Attempted to create an animator without any animations supplied!`);
        this.sheetSize = sheetSize;
        this.spriteSize = spriteSize;
        this.spriteGrid = new Vector2(sheetSize.width / spriteSize.width, sheetSize.height / spriteSize.height);
        this._frameTime = 1 / 12;
        this._remainingFrameTime = 0;
        this._animations = animations;
        this._currentAnimationName = Object.keys(this._animations)[0];
        const spriteCount = this.spriteGrid.width * this.spriteGrid.height;
        for (const name in animations) {
            Data.assert(
                animations[name].first < spriteCount,
                `First sprite index ${animations[name].first} in "${name}" animation is outside the bounds of the supplied ` +
                `${this.spriteGrid.width}x${this.spriteGrid.height} sprite sheet! The index of the last sprite in this sheet is ${spriteCount - 1}.`
            );
            Data.assert(
                animations[name].last < spriteCount,
                `Last sprite index ${animations[name].last} in "${name}" animation is outside the bounds of the supplied ` +
                `${this.spriteGrid.width}x${this.spriteGrid.height} sprite sheet! The index of the last sprite in this sheet is ${spriteCount - 1}.`
            );
        }
    }

    public get spriteIndex() {
        return this._currentSpriteIndex;
    }

    public set currentAnimation(name: string) {
        this._currentAnimationName = name;
    }

    /**
     * Gets the default frame rate for this animator.
     * 
     * @note This value will only be used by animations that do not have their own frameRate value set.
     */
    public get frameRate() {
        return 1 / this._frameTime;
    }

    /**
     * Sets the default frame rate for this animator.
     * 
     * @note This value will only be used by animations that do not have their own frameRate value set.
     */
    public set frameRate(value: number) {
        this._frameTime = 1 / value;
    }

    /**
     * Checks for required frame updates to pursue the current animations desired frame rate.
     * @param deltaTime The time since last frame. Supplied by the {@link Application}.
     */
    public update(deltaTime: number) {
        if (this._remainingFrameTime <= 0) {
            const currentAnimationMeta = this.getCurrentAnimationMeta();
            const frameTime = currentAnimationMeta.frameRate === undefined ? this._frameTime : 1 / currentAnimationMeta.frameRate;
            this._remainingFrameTime += frameTime;

            this._currentSpriteIndex += 1;
            if (this.spriteIndex > currentAnimationMeta.last) {
                this._currentSpriteIndex = currentAnimationMeta.first;
            }
        }
        this._remainingFrameTime -= deltaTime;
    }

    /**
     * @returns The meta information about the current animation.
     * @see {@link Animator.getAnimationMeta} for more information.
     */
    public getCurrentAnimationMeta(): AnimationMeta {
        return this.getAnimationMeta(this._currentAnimationName);
    }

    /**
     * Gets the meta information about an animation by name.
     * @param name The name of the animation.
     * @returns The meta information of the registered animation specified by "name".
     * @see {@link AnimationMeta}
     */
    public getAnimationMeta(name: keyof Map) {
        return this._animations[name];
    }

    /**
     * Gets the pixel coordinate bounds of a sprite within the sheet.
     * @param spriteIndex The index of the sprite to get the bounds of within the sheet. Do not specify to get the bounds of the current sprite of the animation.
     * @returns The coordinate bounds (x, y, width, height) of the sprite in pixel coordinates.
     */
    public getPixelBounds(spriteIndex: number = this._currentSpriteIndex): Vector4 {
        return new Vector4(
            this.spriteSize.width * Math.floor(spriteIndex % this.spriteGrid.width),
            this.spriteSize.height * Math.floor(spriteIndex / this.spriteGrid.width),
            this.spriteSize.width, this.spriteSize.height
        );
    }

    /**
     * Gets the UV coordinate of a sprite within the sheet.
     * @param spriteIndex The index of the sprite to get the bounds of within the sheet. Do not specify to get the bounds of the current sprite of the animation.
     * @returns The texture coordinates bounds (x, y, width, height) of the sprite in UV coordinates.
     */
    public getTextureBounds(spriteIndex: number = this._currentSpriteIndex): Vector4 {
        const bounds = this.getPixelBounds(spriteIndex);
        return new Vector4(
            bounds.x / this.sheetSize.width,
            bounds.y / this.sheetSize.height,
            bounds.width / this.sheetSize.width,
            bounds.height / this.sheetSize.height
        );
    }

}