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

export default class Core extends Fighter {
    protected _multiplier = {
        hp: 0.5,
        speed: 1.5,
        jump: 1.5,
        height: 0.5,
        width: 0.5,
        time: 1,
        dmg: 0.5
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

