export const propmove = {
    draggableDivs: [], // Array to store references to draggable image divs
    isDragging: false,
    initialMouseX: 0,
    initialMouseY: 0,
    initialDivX: 0,
    initialDivY: 0,

    handleMouseDown: function (e) {
        const index = this.draggableDivs.indexOf(e.currentTarget);
        if (index !== -1) {
            this.isDragging = true;
            this.currentDraggableDiv = e.currentTarget;
    
            this.initialMouseX = e.clientX;
            this.initialMouseY = e.clientY;
            this.initialDivX = e.currentTarget.offsetLeft;
            this.initialDivY = e.currentTarget.offsetTop;
    
            document.body.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
    
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        }
    },
    

    handleMouseMove: function (e) {
        if (this.isDragging && this.currentDraggableDiv) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
    
            const deltaX = mouseX - this.initialMouseX;
            const deltaY = mouseY - this.initialMouseY;
    
            const newDivX = this.initialDivX + deltaX;
            const newDivY = this.initialDivY + deltaY;
    
            this.currentDraggableDiv.style.left = `${newDivX}px`;
            this.currentDraggableDiv.style.top = `${newDivY}px`;
    
            this.initialMouseX = mouseX;
            this.initialMouseY = mouseY;
            this.initialDivX = newDivX;
            this.initialDivY = newDivY;
        }
    },
    

    handleMouseUp: function (e) {
        if (this.isDragging) {
            this.isDragging = false;

            document.body.style.cursor = 'grab';
            document.body.style.userSelect = 'auto';

            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            document.removeEventListener('mouseup', this.handleMouseUp.bind(this));

            // Save final position in local storage if needed

            switch (this.currentDraggableDiv.className)
            {
                case 'prp1 draggableDiv':
                    localStorage.setItem('prp1-top', this.initialDivY);
                    localStorage.setItem('prp1-left', this.initialDivX);
                    console.log('prp1 pos delta');
                    break;
                case 'prp2 draggableDiv':
                    localStorage.setItem('prp2-top', this.initialDivY);
                    localStorage.setItem('prp2-left', this.initialDivX);
                    console.log("prp2 pos delta");
                    break;
                case 'prp3 draggableDiv':
                    localStorage.setItem('prp3-top', this.initialDivY);
                    localStorage.setItem('prp3-left', this.initialDivX);
                    console.log("prp3 pos delta");
                    break;
                case 'prp4 draggableDiv':
                    localStorage.setItem('prp4-top', this.initialDivY);
                    localStorage.setItem('prp4-left', this.initialDivX);
                    console.log("prp4 pos delta");
                    break;
                case 'prp5 draggableDiv':
                    localStorage.setItem('prp5-top', this.initialDivY);
                    localStorage.setItem('prp5-left', this.initialDivX);
                    console.log("prp5 pos delta");
                    break;
                default:
                    break;
            }
        }
    },

    init: function () {
        const draggableDivs = document.querySelectorAll('.draggableDiv');
        this.draggableDivs = Array.from(draggableDivs);

        this.draggableDivs.forEach((div) => {
            div.addEventListener('mousedown', this.handleMouseDown.bind(this));
        });
    },

    unload: function () {
        this.draggableDivs.forEach((div) => {
            div.removeEventListener('mousedown', this.handleMouseDown.bind(this));
        });

        // Reset variables
        this.draggableDivs = [];
        this.isDragging = false;
        this.initialMouseX = 0;
        this.initialMouseY = 0;
        this.initialDivX = 0;
        this.initialDivY = 0;

        // Remove event listeners from document if needed
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    }
};

// document.addEventListener('DOMContentLoaded', function () {
//     propmove.init();
// });

// To unload the script, call the unload method
// propmove.unload();
