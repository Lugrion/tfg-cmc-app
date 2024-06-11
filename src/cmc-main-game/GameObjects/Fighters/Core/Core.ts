import Fighter from "../Fighter";
import CoreBasicAttack from "./CoreBasicAttack";

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
        keyTemplate: fighterKeyControls
    ) {
        super(spriteConfig, keyTemplate)
        this.basicAttack = new CoreBasicAttack(spriteConfig, this);
        this.setupAnimation();
    }

    goLeft() {
        this.setVelocityX(-this.getSpeedStat());
        if (this.body?.blocked.down) this.anims.play('run', true);
        this.flipX = true;
        this.basicAttack.flipX = true;
    }

    goRight() {
        this.setVelocityX(this.getSpeedStat());
        if (this.body?.blocked.down) this.anims.play('run', true);
        this.flipX = false;
        this.basicAttack.flipX = false;
    }

    goJump() {
        this.setVelocityY(-this.getJumpStat());
    }

    goIdle() {
        this.setVelocityX(0);
        this.anims.play('idle', true);
    }

    goAttack() {
        this.isAttacking = true;
        this.isAttackReady = false;
        this.basicAttack.setVisible(true)


        this.scene.time.addEvent({
            // Duration the attack hitbox is active and visible in milliseconds
            delay: 100,
            callback: () => {
                this.isAttacking = false;
                this.basicAttack.setVisible(false)
                this.scene.time.addEvent({
                    // Cooldown of the attack
                    delay: 200,
                    callback: () => {
                        // Fetch the cooldown
                        this.isAttackReady = true;
                    }
                })
            }
        })
    }

    

    newEnemyRules(enemy: Fighter) {
        this.scene.physics.add.overlap(enemy.basicAttack, this, () => {
            if (!this.isFighterHit && enemy.isAttacking) {
                this.isFighterHit = true
                this.gameHP -= enemy.getDmgStat();
                this.tint = 0xff0000;
                this.scene.time.addEvent({
                    delay: 800,
                    callback: () => {
                        this.isFighterHit = false;
                        this.tint = 0xffffff;
                    }
                });
            }
        })
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

