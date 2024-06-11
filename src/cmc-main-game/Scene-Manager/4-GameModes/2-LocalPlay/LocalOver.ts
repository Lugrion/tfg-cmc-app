import { EventBus } from "../../../Config/EventBus";

export class LocalOver extends Phaser.Scene {
    
    private width!: number;
    private height!: number;
    
    constructor() {
        super('LocalOver');
    }

    init() {

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(data: any) {

        this.add.image(this.cameras.main.width / 2, 320, 'background3').setScale(2);

        const go_back: Phaser.GameObjects.Text = this.add.text(this.cameras.main.width / 12, 40, '<Menu', {
            fontFamily: 'Arial Black', fontSize: 25, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'left'
        }).setDepth(100).setOrigin(0.5).setInteractive();

        go_back.on('pointerdown', () => {
            this.scene.start('MainMenu');
            this.scene.bringToTop('MainMenu');
        })

        if(data.winner == 'p1'){
            this.add.text(this.cameras.main.width / 2, 70, 'Player 1 WINS!!!!!', {
                fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setDepth(100).setOrigin(0.5);
        } else if(data.winner == 'p2') {
            this.add.text(this.cameras.main.width / 2, 70, 'Player 2 WINS!!!!!', {
                fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setDepth(100).setOrigin(0.5);
        } else{
            this.add.text(this.cameras.main.width / 2, 70, 'DRAWWWW!!!', {
                fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setDepth(100).setOrigin(0.5);
        }


        EventBus.emit('current-scene-ready', this);
    }
}