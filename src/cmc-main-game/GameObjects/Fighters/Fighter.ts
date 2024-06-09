import BasicAttack from "./BasicAttack";

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

export default class Fighter extends Phaser.Physics.Arcade.Sprite {

    public readonly _defaultStats = Object.freeze({
        hp: 100,
        speed: 300,
        jump: 400,
        height: 60,
        width: 35,
        time: 1,
        dmg: 10,
    });

    // We don't want to protect the values inside as they will be changed by Fighter's children
    protected readonly _multiplier = {
        hp: 1,
        speed: 1,
        jump: 1,
        height: 1,
        width: 1,
        time: 1,
        dmg: 1
    }

    getHpStat(): number {
        return this._defaultStats.hp * this._multiplier.hp;
    }

    getDmgStat(): number {
        return this._defaultStats.dmg * this._multiplier.dmg;
    }

    getSpeedStat(): number {
        return this._defaultStats.speed * this._multiplier.speed;
    }

    getJumpStat(): number {
        return this._defaultStats.jump * this._multiplier.jump;
    }

    getHeightStat(): number {
        return this._defaultStats.height * this._multiplier.height;
    }

    getWidthStat(): number {
        return this._defaultStats.width * this._multiplier.width;
    }

    getTimeStat(): number {
        return this._defaultStats.time * this._multiplier.time;
    }

    private controls: object | undefined;

    public readonly basicAttack: BasicAttack;

    public readonly id: number;

    constructor(
        spriteConfig: spriteBasicConfig,
        keyTemplate: fighterKeyControls,
        identifier: number
    ) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, spriteConfig.texture);

        this.scene = spriteConfig.current_scene;

        this.id = identifier;

        // Build Controls
        this.updateControls(keyTemplate);

        // Setup Basic Attack
        this.basicAttack = new BasicAttack(spriteConfig, this);

        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
    }


    updateControls(keyTemplate: fighterKeyControls) {
        this.controls = this.scene.input.keyboard?.addKeys(keyTemplate);
    }


    basicMovement() {
        if (this.controls == undefined) { return }
        if (this.controls.goLeft.isDown) {
            this.setVelocityX(-this.getSpeedStat());
            if (this.body?.blocked.down) this.anims.play('run', true);
            this.flipX = true;
            this.basicAttack.flipX = true;
        } else if (this.controls.goRight.isDown) {
            this.setVelocityX(this.getSpeedStat());
            if (this.body?.blocked.down) this.anims.play('run', true);
            this.flipX = false;
            this.basicAttack.flipX = false;
        } else {
            this.setVelocityX(0);
            this.anims.play('idle', true);
        }

        if (this.controls.goJump.isDown && this.body?.blocked.down) {
            this.setVelocityY(-this.getJumpStat());
            this.anims.stop();
        }
    }

    attack() {
        if (this.controls == undefined) { return }
        if (this.controls.basicAttackKey.isDown) {
            this.basicAttack.setVisible(true)
            console.log('attack')
        }
        this.basicAttack.setVisible(false)
    }


    update(): void {
        this.basicMovement();
        this.attack();
        // Check size stats
        this.body?.setSize(this.getWidthStat(), this.getHeightStat());
    }
}