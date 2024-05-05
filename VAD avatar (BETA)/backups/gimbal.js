function mouserotate(){
    if(document.getElementById('pad')){
        const gimbal = document.getElementById('pad');
        let isDragging = false;
        // let startX, startY;
        // let startRotationX = 0;
        // let startRotationY = 0;
    }

    var gimbal, isDragging, startX, startY, startRotationX, startRotationY;

    document.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mousemove', drag);

    function startDrag(event) {
        if (event.target === gimbal) {
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;
            startRotationX = getRotationX();
            startRotationY = getRotationY();
            // gimbal.style.transition = 'none';
        }
    }

    function endDrag() {
        isDragging = false;
        // gimbal.style.transition = 'transform 0.5s ease'; // Add transition back
    }

    function drag(event) {
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
};