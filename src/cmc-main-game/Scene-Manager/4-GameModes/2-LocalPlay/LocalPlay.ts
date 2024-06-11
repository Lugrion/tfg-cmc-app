import { EventBus } from "../../../Config/EventBus";
import UserControlsFactory from "../../../Config/UserControlsFactory";
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

    constructor() {
        super('LocalPlay');
    }

    init() {

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(data: any) {
        // Background
        this.add.image(this.cameras.main.width / 2, 320, 'background3').setScale(2);

        // Map tiles
        this.setupMapTiles();

        // Ensure camera limits
        this.cameras.main.setBounds(0, 0, this.map_container.widthInPixels, this.map_container.heightInPixels);
        
        // Setup Fighters logic
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
            texture: ""
        }, UserControlsFactory.createUserControls("p1"));
        
        this.fighter_P2 = FighterFactory.createFighter(data.p2Fighter, {
            current_scene: this,
            x: 860,
            y: this.height / 2,
            texture: ""
        }, UserControlsFactory.createUserControls("p2"));

        this.fighter_P1.addEnemy(this.fighter_P2);
        this.fighter_P2.addEnemy(this.fighter_P1);
    }

    setupPhysics() {
        this.map_layer.setCollisionByExclusion([-1]);
        this.physics.world.bounds.setTo(0, 0, this.map_container.widthInPixels, this.map_container.heightInPixels);
        this.physics.add.collider(this.fighter_P1, this.map_layer);
        this.physics.add.collider(this.fighter_P2, this.map_layer);

        this.physics.add.collider(this.fighter_P2, this.fighter_P1);
    }

    update() {
        this.fighter_P1.update();
        this.fighter_P2.update();
    }
}
