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
  const video = document.getElementById("video");
  const button = document.getElementById("button");
  const select = document.getElementById("select");
  let currentStream;

  function stopMediaTracks(stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  button.addEventListener("click", (event) => {
    if (typeof currentStream !== "undefined") {
      stopMediaTracks(currentStream);
    }
    const videoConstraints = {};
    if (select.value === "") {
      videoConstraints.facingMode = "environment";
    } else {
      videoConstraints.deviceId = { exact: select.value };
    }
    const constraints = {
      video: true,
      audio: false,
    };
    
    navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error);
    });
  });

  function gotDevices(mediaDevices) {
    select.innerHTML = "";
    select.appendChild(document.createElement("option"));
    let count = 1;
    mediaDevices.forEach((mediaDevice) => {
      if (mediaDevice.kind === "videoinput") {
        const option = document.createElement("option");
        option.value = mediaDevice.deviceId;
        const label = mediaDevice.label || `Camera ${count++}`;
        const textNode = document.createTextNode(label);
        option.appendChild(textNode);
        select.appendChild(option);
      }
    });
  }
  navigator.mediaDevices.enumerateDevices().then(gotDevices);
};