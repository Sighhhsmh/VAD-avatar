var currentX;
var currentY;
export const draggableScript = {

    draggableDiv: null,
    isDragging: false,
    startX: 0,
    startY: 0,

    // DispatchTransform: function (top, left) {

    //     const transformEvent = new CustomEvent('DispatchTransform', { detail: { top, left } });
    //     document.dispatchEvent(transformEvent);

    // },

    handleMouseMove: function (e) {
        if (this.isDragging && this.draggableDiv!==null) {
            var deltaX = e.clientX - this.startX;
            var deltaY = e.clientY - this.startY;

            currentX = parseFloat(this.draggableDiv.style.left) || 0;
            currentY = parseFloat(this.draggableDiv.style.top) || 0;

            this.draggableDiv.style.left = currentX + deltaX + 'px';
            this.draggableDiv.style.top = currentY + deltaY + 'px';

            this.startX = e.clientX;
            this.startY = e.clientY;

            // this.DispatchTransform(currentY, currentX);
        }
    },

    handleMouseDown: function (e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';

        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    },

    handleMouseUp: function () {
        this.isDragging = false;

        document.body.style.cursor = 'grab';
        document.body.style.userSelect = 'auto';

        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

        localStorage.setItem('PadTop', currentY);
        localStorage.setItem('PadLeft', currentX);
        
        // this.DispatchTransform(currentY, currentX);
    },

    init: function () {
        this.draggableDiv = document.getElementById('moving');
        this.draggableDiv.addEventListener('mousedown', this.handleMouseDown.bind(this));
    },

    unload: function () {

        // Remove event listener and reset variables

        this.draggableDiv.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

        this.draggableDiv = null;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
    }
};

// Initialize the script
// draggableScript.init();

// To unload the script, call the unload method
// draggableScript.unload();
