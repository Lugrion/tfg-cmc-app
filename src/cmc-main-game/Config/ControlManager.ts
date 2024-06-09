// Fetch constant with UserConf data if it is empty it will use


type fighterControls = {
    'jumpKey':  Phaser.Input.Keyboard.Key,
    'mvLeftKey':  Phaser.Input.Keyboard.Key,
    'mvRightKey':  Phaser.Input.Keyboard.Key,
    'basicAttackKey':  Phaser.Input.Keyboard.Key
}

type fighterControls = {
    jumpKey: string,
    mvLeftKey: string,
    mvRightKey: string,
    basicAttackKey: string
}


// if user_conf p1Controls && p2Controls exist 

const fighterKeyTemplate = {
    'jumpKey': Phaser.Input.Keyboard.KeyCodes['W' /* Filled with variable from supabase */],
    'mvLeftKey': Phaser.Input.Keyboard.KeyCodes[this.fighterControls.mvLeftKey],
    'mvRightKey': Phaser.Input.Keyboard.KeyCodes[this.fighterControls.mvRightKey],
    'basicAttackKey': Phaser.Input.Keyboard.KeyCodes[this.fighterControls.basicAttackKey],
}

// else no devolver nada