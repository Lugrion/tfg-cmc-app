import Fighter from "./Fighter";

type spriteBasicConfig = {
    current_scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string
}

export default class BasicAttack extends Phaser.Physics.Arcade.Sprite {

    private fighter: Fighter;

    constructor(spriteConfig: spriteBasicConfig, fighterRef: Fighter) {
        super(spriteConfig.current_scene, spriteConfig.x, spriteConfig.y, "");
        this.fighter = fighterRef;

        

        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    update() {
        this.body?.setSize(this.fighter.getHeightStat(), this.fighter.getWidthStat());
        if(this.flipX){
            this.setPosition(this.fighter.x - 30, this.fighter.y);
        }else{
            this.setPosition(this.fighter.x + 30, this.fighter.y);

        }
        this.setVelocity(0,0);
    }
}
