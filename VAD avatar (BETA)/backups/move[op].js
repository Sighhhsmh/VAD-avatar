function mousemove() {
    var draggableDiv = document.querySelector('.draggable');
    var isDragging = false;
    var startX, startY;

    function handleMouseMove(e) {
        if (isDragging) {
            // Calculate the delta mouse movement
            var deltaX = e.clientX - startX;
            var deltaY = e.clientY - startY;

            // Update the div's position based on the delta values
            var currentX = parseFloat(draggableDiv.style.left) || 0;
            var currentY = parseFloat(draggableDiv.style.top) || 0;

            draggableDiv.style.left = currentX + deltaX + 'px';
            draggableDiv.style.top = currentY + deltaY + 'px';

            // Update start coordinates for the next movement
            startX = e.clientX;
            startY = e.clientY;
        }
    }
    
    draggableDiv.addEventListener('mousedown', handleMouseDown);

    function handleMouseDown(e) {
        isDragging = true;

        // Get the initial mouse coordinates
        startX = e.clientX;
        startY = e.clientY;

        // Change cursor style and prevent text selection during drag
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseUp() {
        isDragging = false;

        // Restore cursor style and text selection
        document.body.style.cursor = 'grab';
        document.body.style.userSelect = 'auto';

        // Remove event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // Add event listener for mousedown on the face div
    // if(document.getElementById('rotateCheckbox').checked){
    //     draggableDiv.addEventListener('mousedown', handleMouseDown);
    // }
    // if(!document.getElementById('rotateCheckbox').checked){
    //     draggableDiv.removeEventListener('mousedown', handleMouseDown);
    // }
}
