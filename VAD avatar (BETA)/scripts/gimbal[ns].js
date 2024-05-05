export const rotateScript = {
    gimbal: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    startRotationX: 0,
    startRotationZ: 0,
    newRotationX: 0,
    newRotationZ: 0,
    flip: 0,
    scale: 0,
    checkbox: null,

    handleMouseMove: function (event) {
        if (this.isDragging && this.gimbal !== null) {
            const deltaX = event.clientX - this.startX;
            const deltaY = event.clientY - this.startY;
    
            const sensitivity = parseFloat(localStorage.getItem('PadRotSensi'))||0.2;
            const perspective = parseInt(localStorage.getItem('PadPersp'))||800;
    
            const pitch = deltaY * sensitivity;
            const roll = deltaX * sensitivity;
    
            // Update newRotationX and newRotationZ directly
            this.newRotationX = this.startRotationX + pitch;
            this.newRotationZ = this.startRotationZ + roll;
    
            // Clamp newRotationX between 0 and 90 degrees
            this.newRotationX = Math.max(0, Math.min(this.newRotationX, 75));
            // Clamp newRotationZ between 0 and 360 degrees
            if (this.newRotationZ < 0) {this.newRotationZ += 360;}
            else if (this.newRotationZ > 360) {this.newRotationZ -= 360}

            this.scale=parseFloat(localStorage.getItem('PadScale')||0.6)

            this.gimbal.style.transform = `perspective(${perspective}px) scale(${this.scale}) rotateX(${this.newRotationX}deg) rotateY(${this.flip}deg) rotateZ(${this.newRotationZ}deg)`;
        }
    },
    

    handleMouseDown: function (event) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.startRotationX = this.newRotationX;
        this.startRotationZ = this.newRotationZ;

        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    },

    handleMouseUp: function () {
        this.isDragging = false;

        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        
        localStorage.setItem('PadRotX', this.newRotationX);
        localStorage.setItem('PadRotZ', this.newRotationZ);
    },

    init: function () {
        this.newRotationX = parseFloat(localStorage.getItem('PadRotX'))||0;
        this.newRotationZ = parseFloat(localStorage.getItem('PadRotZ'))||0;
        this.flip = parseInt(localStorage.getItem('PadFlip'))||0;

        this.gimbal = document.getElementById('rotating');
        this.checkbox = document.getElementById('rotateCheckbox')
        this.gimbal.addEventListener('mousedown', this.handleMouseDown.bind(this));
    },

    unload: function () {
        this.gimbal.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);

        // Reset properties
        this.gimbal = null;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
    }
};

// Initialize the script
// rotateScript.init();

// To unload the script, call the unload method
// rotateScript.unload();
