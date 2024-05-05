function mousemove() {
    var draggableDiv = document.querySelector('.draggable');
    var offsetX, offsetY, isDragging = false;

    // Event listener for mousedown to start dragging
    draggableDiv.addEventListener('mousedown', function (e) {
        isDragging = true;

        // Get the initial mouse coordinates
        offsetX = e.clientX - draggableDiv.getBoundingClientRect().left;
        offsetY = e.clientY - draggableDiv.getBoundingClientRect().top;

        // Change cursor style and prevent text selection during drag
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    });

    // Event listener for mousemove to update div position
    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            // Calculate new div position based on mouse movement
            var x = e.clientX - offsetX;
            var y = e.clientY - offsetY;

            // Update the div's position
            draggableDiv.style.left = x + 'px';
            draggableDiv.style.top = y + 'px';
        }
    });

    // Event listener for mouseup to stop dragging
    document.addEventListener('mouseup', function () {
        if (isDragging) {
            // Reset dragging state
            isDragging = false;

            // Restore cursor style and text selection
            document.body.style.cursor = 'grab';
            document.body.style.userSelect = 'auto';
        }
    });
};