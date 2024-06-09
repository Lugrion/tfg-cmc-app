import Fighter from "../Fighter";

type fighterKeyControls = {
    goJump: number | string,
    goLeft: number | string,
    goRight: number | string,
    basicAttackKey: number | string
}

type spriteBasicConfig = {
    current_scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string
}

export default class Crust extends Fighter {
    protected _multiplier = {
        hp: 1,
        speed: 1,
        jump: 1,
        height: 1,
        width: 1,
        time: 1,
        dmg: 1
    }

    constructor(
        spriteConfig: spriteBasicConfig,
        keyTemplate: fighterKeyControls,
        identifier: number
    ) {
        super(spriteConfig, keyTemplate, identifier)
        this.setupAnimation();
    }

    setupAnimation() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('fighterTest', {
                prefix: 'idle' + '-',
                end: 10
            }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('fighterTest', {
                prefix: 'run' + '-',
                end: 11
            }),
            frameRate: 20,
            repeat: -1
        });
    }
}

