function mouserotate() {
    var gimbal, isDragging, startX, startY, startRotationX, startRotationY;

    gimbal = document.getElementById('pad');
    isDragging = false;

    function handleMouseMove(event) {
        if (isDragging) {
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;

            const sensitivity = 0.2; // Adjust the sensitivity as needed

            const pitch = deltaY * sensitivity;
            const yaw = 0;
            const roll = deltaX * sensitivity;

            const newRotationX = startRotationX + pitch;
            const newRotationY = startRotationY + roll;

            gimbal.style.transform = `perspective(800px) rotateX(${newRotationX}deg) rotateZ(${newRotationY}deg)`;
        }
    }

    document.getElementById('pad').addEventListener('mousedown', handleMouseDown);

    function handleMouseDown(event) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        startRotationX = getRotationX();
        startRotationY = getRotationY();

        // Add event listeners for mousemove and mouseup
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    function getRotationX() {
        const transformValue = getComputedStyle(gimbal).transform;
        const matrix = new DOMMatrix(transformValue);
        return Math.atan2(matrix.m23, matrix.m22) * (180 / Math.PI);
    }

    function getRotationY() {
        const transformValue = getComputedStyle(gimbal).transform;
        const matrix = new DOMMatrix(transformValue);
        return Math.atan2(matrix.m13, matrix.m11) * (180 / Math.PI);
    }

    function handleMouseUp() {
        isDragging = false;

        // Remove event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
};
