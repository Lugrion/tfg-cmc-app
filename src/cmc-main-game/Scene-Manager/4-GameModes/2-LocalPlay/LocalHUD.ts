import { LocalPlay } from "./LocalPlay";

export default class LocalHUD extends Phaser.Scene {

    private width: number;
    private height: number;
    
    private game_scene: LocalPlay;

    private txt_hpP1: Phaser.GameObjects.Text;
    private txt_hpP2: Phaser.GameObjects.Text;

    private txt_time: Phaser.GameObjects.Text;

    private countdown: number = 60; // Initial countdown value in seconds
    private countdownTimer!: Phaser.Time.TimerEvent; // Timer event for countdown

    private p1HP!: number;
    private p2HP!: number;

    constructor() {
        super('LocalHUD');
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.game_scene = this.scene.get('LocalPlay');
    }

    create() {
        this.setupTimeHud();
        this.setupHpHud();
        this.updateHP();

        // Start countdown timer
        this.countdownTimer = this.time.addEvent({
            delay: 1000, // 1 second interval
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    setupTimeHud() {
        this.txt_time = this.add.text(this.width / 2, 30, '60', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(-1).setOrigin(0.5);
    }

    setupHpHud() {
        this.txt_hpP1 = this.add.text(this.width / 12, 40, 'P1 HP: ', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);

        this.txt_hpP2 = this.add.text(this.width - this.width / 12, 40, 'P2 HP: ', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
    }

    updateHP(){
        this.p1HP = this.game_scene.p1HP;
        this.p2HP = this.game_scene.p2HP;

        this.txt_hpP1.text = "p1HP: " + this.p1HP;
        this.txt_hpP2.text = "p2HP: " + this.p2HP;

        // Check for winner
        if (this.p1HP <= 0) {
            this.scene.start('LocalOver', { winner: 'p2'});
            this.scene.bringToTop('LocalOver')
        } else if (this.p2HP <= 0) {
            this.scene.start('LocalOver', { winner: 'p1'});
            this.scene.bringToTop('LocalOver')
        }
    }

    updateTimer() {
        this.countdown--;
        this.txt_time.text = `${this.countdown}`;
        
        // Check if countdown reaches zero
        if (this.countdown === 0) {
            this.countdownTimer.remove(false); // Remove the timer
            this.updateHP(); // Check for winner after countdown
        }   
    }

    update(time: number, delta: number): void {
        this.updateHP();
    }
}
