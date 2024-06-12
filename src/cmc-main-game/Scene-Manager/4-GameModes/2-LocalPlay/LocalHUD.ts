import { LocalPlay } from "./LocalPlay";

export default class LocalHUD extends Phaser.Scene {

    private width: number;
    private height: number;

    private game_scene: LocalPlay;

    private txt_hpP1: Phaser.GameObjects.Text;
    private txt_hpP2: Phaser.GameObjects.Text;

    private txt_start_time: Phaser.GameObjects.Text;
    private txt_time: Phaser.GameObjects.Text;

    private start_countdown: number = 3;
    private countdown: number = 99; // Initial countdown value in seconds
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

        // Timer for game start
        this.countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateStartTimer,
            callbackScope: this,
            loop: true
        });
    }

    setupTimeHud() {
        this.txt_time = this.add.text(this.width / 2, 30, `${this.countdown}`, {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(-1).setOrigin(0.5).setVisible(false);

        this.txt_start_time = this.add.text(this.width / 2, this.height / 2, `${this.start_countdown}`, {
            fontFamily: 'Arial Black', fontSize: 100, color: '#ffffff',
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

    updateHP() {
        this.p1HP = this.game_scene.fighter_P1.gameHP;
        this.p2HP = this.game_scene.fighter_P2.gameHP;

        this.txt_hpP1.text = "p1HP: " + this.p1HP;
        this.txt_hpP2.text = "p2HP: " + this.p2HP;
    }

    updateStartTimer() {
        this.start_countdown--;
        this.txt_start_time.text = `${this.start_countdown}`;

        // Check if countdown reaches zero
        if (this.start_countdown === 0) {
            this.txt_start_time.text = "GO!!!"

            // Wait one second to show text and c
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.countdownTimer.remove(false);
                    this.game_scene.isStarting = false;
                    this.txt_start_time.setVisible(false);
                    this.txt_time.setVisible(true);

                    // Timer for game
                    this.countdownTimer = this.time.addEvent({
                        delay: 1000,
                        callback: this.updateTimer,
                        callbackScope: this,
                        loop: true
                    });
                }
            });
        }
    }

    updateTimer() {
        this.countdown--;
        this.txt_time.text = `${this.countdown}`;

        // Check if countdown reaches zero
        if (this.countdown === 0) {
            this.countdownTimer.remove(false);
            this.checkTimeOut()
        }
    }

    checkTimeOut() {
        if (this.p1HP == this.p2HP) {
            this.goNextScene("");
        } else if (this.p1HP > this.p2HP) {
            this.goNextScene("p1");
        } else if (this.p1HP < this.p2HP) {
            this.goNextScene("p2");
        }
    }

    checkDeath() {
        // Check for winner
        if (this.p1HP <= 0 && this.p2HP <= 0) {
            this.goNextScene("");
        } else if (this.p2HP <= 0) {
            this.goNextScene("p1");
        } else if (this.p1HP <= 0) {
            this.goNextScene("p2");
        }
    }

    goNextScene(winner: string) {
        

        this.time.addEvent({
            // Enough time for the animations to finish
            delay: 2000,
            callback: () => {
                this.scene.stop('LocalPlay')
                this.scene.remove('LocalPlay')
                this.scene.stop();
                this.scene.start('LocalOver', { winner: winner });
                this.scene.bringToTop('LocalOver')
            }
        })
    }

    update(): void {
        this.updateHP();
        this.checkDeath();
    }
}
