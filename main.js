window.onload = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    document
      .querySelector("a-text")
      .setAttribute(
        "gps-entity-place",
        `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`
      );
  });
  // Välj kamera
  const video = document.getElementById('video');
  const button = document.getElementById('button');
  
  button.addEventListener('click', event => {
    const constraints = {
      video: true,
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(error => {
        console.error(error);
      });
  });
};

