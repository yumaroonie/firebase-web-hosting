class Main {
    constructor() {
        this.health = 100;
        this.healthBar = null;
        this.init();
    }

    init() {
        this.createHealthBar();
        this.addBulletHole();
        this.addFloatingMoney();
    }

    createHealthBar() {
        this.healthBar = document.createElement('div');
        this.healthBar.setAttribute('id', 'healthBar');
        this.healthBar.style.width = `${this.health}%`;
        document.body.appendChild(this.healthBar);
    }

    createBulletHole (e){

        const bulletHole = document.createElement('div');
        bulletHole.className = 'bulletHole';
        bulletHole.style.left = `${e.pageX}px`;
        bulletHole.style.top = `${e.pageY}px`;

        // Add random rotation
        const randomRotation = Math.floor(Math.random() * 360);
        bulletHole.style.transform = `rotate(${randomRotation}deg)`;

        document.body.appendChild(bulletHole);
    }

    addBulletHole() {
        document.addEventListener('click', (e) => {
            // Check if clicked element or its parent is a button or hyperlink
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('A') || e.target.closest('BUTTON')) {
                return; // Exit the function without adding bullet hole or playing the sound
            }
    
            const gunshotSound = document.getElementById('gunshotSound');
            gunshotSound.volume = 0.5; // Decreases the volume to half its original level
            gunshotSound.play();

            this.createBulletHole (e);
    
            if (e.target.tagName === "IMG") {
                this.health -= 10; // Decrease 10% health when clicking on an image.
                if (this.health <= 0) {
                    this.health = 0;
                    const ouchSound = document.getElementById('ouchSound');
                    ouchSound.play();
    
                    alert("Communism is dead!");
                    // Stop listening to click events to avoid further actions after death
                    document.removeEventListener('click', e);
                }
                this.healthBar.style.width = `${this.health}%`;
            }
        });
    }
}

// Instantiate the Main class on page load
document.addEventListener('DOMContentLoaded', () => {
    new Main();
});


