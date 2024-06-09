import { EventBus } from "../../../Config/EventBus";

export class LocalOver extends Phaser.Scene {

    
    constructor() {
        super('LocalOver');
    }

    create(data: any) {
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