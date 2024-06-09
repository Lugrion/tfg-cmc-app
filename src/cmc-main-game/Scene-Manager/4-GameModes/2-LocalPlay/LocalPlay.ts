import { EventBus } from "../../../Config/EventBus";
import UserControlsFactory from "../../../Config/UserControlsFactory";
import BasicAttack from "../../../GameObjects/Fighters/BasicAttack";
import Fighter from "../../../GameObjects/Fighters/Fighter";
import FighterFactory from "../../../GameObjects/Fighters/FighterFactory";

export class LocalPlay extends Phaser.Scene {
    private width!: number;
    private height!: number;

    private map_container!: Phaser.Tilemaps.Tilemap;
    private map_packer!: Phaser.Tilemaps.Tileset;
    private map_layer!: Phaser.Tilemaps.TilemapLayer;

    private fighter_P1!: Fighter;
    private fighter_P2!: Fighter;

    private p1HP!: number;
    private p2HP!: number;

    private basicAttackP1!: BasicAttack;
    private basicAttackP2!: BasicAttack;

    private isP1gettinHit: boolean = false;
    private isP2gettinHit: boolean = false;

    constructor() {
        super('LocalPlay');
    }

    init() {

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(data: any) {
        // Ensure the background image exists
        this.add.image(this.cameras.main.width / 2, 320, 'background3').setScale(2);

        // Initialize map_container and related properties in create method
        this.setupMapTiles();

        this.cameras.main.setBounds(0, 0, this.map_container.widthInPixels, this.map_container.heightInPixels);
        // Set collision for the layer
        this.spawnFighters(data);



        this.setupPhysics();


        EventBus.emit('current-scene-ready', this);
    }

    setupMapTiles() {
        this.map_container = this.make.tilemap({ key: 'mapTest', tileWidth: 16, tileHeight: 16 });
        this.map_packer = this.map_container.addTilesetImage('TerrainTest');
        this.map_layer = this.map_container.createLayer('Platforms', this.map_packer);
    }

    spawnFighters(data: any) {
        this.fighter_P1 = FighterFactory.createFighter(data.p1Fighter, {
            current_scene: this,
            x: 100,
            y: this.height / 2,
            texture: 'fighterTest'
        }, UserControlsFactory.createUserControls("p1"));

        this.basicAttackP1 = this.fighter_P1.basicAttack;
        this.p1HP = this.fighter_P1.getHpStat();
        
        this.fighter_P2 = FighterFactory.createFighter(data.p2Fighter, {
            current_scene: this,
            x: 860,
            y: this.height / 2,
            texture: 'fighterTest'
        }, UserControlsFactory.createUserControls("p2"));
        
        this.basicAttackP2 = this.fighter_P2.basicAttack;
        this.p2HP = this.fighter_P2.getHpStat();
    }


    setupPhysics() {
        this.map_layer.setCollisionByExclusion([-1]);
        this.physics.world.bounds.setTo(0, 0, this.map_container.widthInPixels, this.map_container.heightInPixels);
        this.physics.add.collider(this.fighter_P1, this.map_layer);
        this.physics.add.collider(this.fighter_P2, this.map_layer);

        this.physics.add.overlap(this.basicAttackP1, this.fighter_P2, (() => this.handleDamagetoP2()))
        this.physics.add.overlap(this.basicAttackP2, this.fighter_P1, (() => this.handleDamagetoP1()))

    }

    handleDamagetoP1() {
        if(!this.isP1gettinHit){
            this.isP1gettinHit = true
            console.log("P1 WAS DAMAGED");
            this.p1HP -= this.fighter_P2.getDmgStat();
            this.fighter_P1.tint = 0xff0000;
            this.time.addEvent({
                delay: 600,
                callback: () => {
                    this.isP1gettinHit = false;
                    this.fighter_P1.tint = 0xffffff;
                }
            });
        }
    }

    handleDamagetoP2() {
        if(!this.isP2gettinHit){
            this.isP2gettinHit = true
            console.log("P1 WAS DAMAGED");
            this.p2HP -= this.fighter_P1.getDmgStat();
            this.fighter_P2.tint = 0xff0000;
            this.time.addEvent({
                delay: 600,
                callback: () => {
                    this.isP2gettinHit = false;
                    this.fighter_P2.tint = 0xffffff;
                }
            });
        }
    }


    update() {
        this.fighter_P1.update();
        this.fighter_P2.update();
        this.basicAttackP1.update();
        this.basicAttackP2.update();
    }
}
