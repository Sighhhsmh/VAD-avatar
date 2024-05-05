var newDivX;
var newDivY;

var faceMoveScript = {
    faceDiv: null,
    isDragging: false,
    initialMouseX: 0,
    initialMouseY: 0,
    initialDivX: 0,
    initialDivY: 0,

    handleMouseMove: function(e) {
        if (this.isDragging) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const deltaX = mouseX - this.initialMouseX;
            const deltaY = mouseY - this.initialMouseY;

            let newDivX = this.initialDivX + deltaX;
            let newDivY = this.initialDivY + deltaY;

            const maxX = window.innerWidth - this.faceDiv.clientWidth;
            const maxY = window.innerHeight - this.faceDiv.clientHeight;

            var scale = document.getElementById('facesize').value / 10;

            newDivX = Math.max(-this.faceDiv.clientWidth / scale, Math.min(newDivX, maxX + (this.faceDiv.clientWidth / scale)));
            newDivY = Math.max(-this.faceDiv.clientHeight / scale, Math.min(newDivY, maxY + (this.faceDiv.clientHeight / scale)));

            this.faceDiv.style.left = `${newDivX}px`;
            this.faceDiv.style.top = `${newDivY}px`;

            this.initialMouseX = mouseX;
            this.initialMouseY = mouseY;
            this.initialDivX = newDivX;
            this.initialDivY = newDivY;
        }
    },

    handleMouseDown: function(e) {
        this.isDragging = true;

        this.initialMouseX = e.clientX;
        this.initialMouseY = e.clientY;
        this.initialDivX = this.faceDiv.offsetLeft;
        this.initialDivY = this.faceDiv.offsetTop;

        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    },

    handleMouseUp: function() {
        this.isDragging = false;

        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

        localStorage.setItem('FaceTop', this.initialDivY);
        localStorage.setItem('FaceLeft', this.initialDivX);
    },

    init: function() {
        this.faceDiv = document.getElementById('facegroup');
        this.faceDiv.addEventListener('mousedown', this.handleMouseDown.bind(this));
    },

    unload: function() {
        if (this.faceDiv) {
            this.faceDiv.removeEventListener('mousedown', this.handleMouseDown.bind(this));
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

            this.faceDiv = null;
            this.isDragging = false;
            this.initialMouseX = 0;
            this.initialMouseY = 0;
            this.initialDivX = 0;
            this.initialDivY = 0;
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    faceMoveScript.init();
});

// Initialize the script
// faceMoveScript.init();

// To unload the script, call the unload method
// faceMoveScript.unload();
