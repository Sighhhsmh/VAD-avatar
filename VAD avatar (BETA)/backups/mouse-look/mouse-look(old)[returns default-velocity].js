window.onload = function () {
  const consolidatedDiv = document.getElementById('consolidated');
  const maxPitch = 30; // Maximum pitch (tilt up-down) value in degrees
  const maxYaw = 45;  // Maximum yaw (tilt left-right) value in degrees
  const velocityThreshold = 0; // Mouse velocity threshold for triggering transition (adjust as needed)
  let mouseX = 0;
  let prevMouseX = 0;
  let mouseY = 0;
  let prevMouseY = 0;
  let lastTimestamp = 0;

  document.addEventListener('mousemove', (e) => {
      prevMouseX = mouseX;
      mouseX = e.clientX;
      prevMouseY = mouseY;
      mouseY = e.clientY;

      // Calculate time difference between mouse moves
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimestamp;
      lastTimestamp = currentTime;

      // Calculate velocity
      const velocityX = (mouseX - prevMouseX) / deltaTime;
      const velocityY = (mouseY - prevMouseY) / deltaTime;

      // Calculate tilt angles between the current and previous mouse positions
      const pitch = prevMouseY - mouseY; // Invert the pitch effect
      const yaw = mouseX - prevMouseX;

      // Cap the tilt values
      const cappedPitch = Math.min(Math.max(pitch, -maxPitch), maxPitch);
      const cappedYaw = Math.min(Math.max(yaw, -maxYaw), maxYaw);

      // Apply tilt transformations
      consolidatedDiv.style.transform = `perspective(700px) rotateX(${cappedPitch}deg) rotateY(${cappedYaw}deg)`;

      // Check if mouse velocity is under the threshold to trigger the transition back to default
      // const totalVelocity = Math.sqrt(velocityX ** 2 + velocityY ** 2);
      // if (totalVelocity < velocityThreshold) {
      //     smoothTransition();
      // }
  });

  // Smoothly transition back to default state
  // function smoothTransition() {
  //     consolidatedDiv.style.transition = 'transform 0.5s ease-in-out';
  //     consolidatedDiv.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
  //     setTimeout(() => {
  //         consolidatedDiv.style.transition = 'transform 0.3s ease-out';
  //     }, 500);
  // }
};
