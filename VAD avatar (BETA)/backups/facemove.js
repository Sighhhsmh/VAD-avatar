window.onload = function () {
    const faceDiv = document.getElementById('facegroup'); //f
    const handle = document.getElementById('draggableDiv');
  
    let isDragging = false;
    let initialMouseX, initialMouseY, initialDivX, initialDivY;
  
    function handleMouseMove(e) {
      if (isDragging) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
  
        // Calculate the change in mouse position
        const deltaX = mouseX - initialMouseX;
        const deltaY = mouseY - initialMouseY;
  
        // Update the div's position, considering its width and height
        let newDivX = initialDivX + deltaX;
        let newDivY = initialDivY + deltaY;
  
        // Restrict the div within the window boundaries
        const maxX = window.innerWidth - faceDiv.clientWidth;
        const maxY = window.innerHeight - faceDiv.clientHeight;

        var scale = document.getElementById('facesize').value / 10;
  
        newDivX = Math.max(-faceDiv.clientWidth/scale, Math.min(newDivX, maxX+(faceDiv.clientHeight/scale)));
        newDivY = Math.max(-faceDiv.clientHeight/scale, Math.min(newDivY, maxY+(faceDiv.clientHeight/scale)));
  
        // Apply translation to the div
        faceDiv.style.left = `${newDivX}px`;
        faceDiv.style.top = `${newDivY}px`;
  
        // Update initial positions for the next movement
        initialMouseX = mouseX;
        initialMouseY = mouseY;
        initialDivX = newDivX;
        initialDivY = newDivY;
      }
    }
  
    function handleMouseDown(e) {
      isDragging = true;
  
      // Store initial mouse and div positions
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      initialDivX = faceDiv.offsetLeft;
      initialDivY = faceDiv.offsetTop;
  
      // Add event listeners for mousemove and mouseup
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  
    function handleMouseUp() {
      isDragging = false;
  
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  
    // Add event listener for mousedown on the face div
    faceDiv.addEventListener('mousedown', handleMouseDown);
  };