window.onload = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    document
      .querySelector("a-text")
      .setAttribute(
        "gps-entity-place",
        `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`
      );
  });
};

var userMediaConstraints = {
    audio: false,
    video: {
    facingMode: 'environment',
    width: {
    ideal: _this.parameters.sourceWidth,
    // min: 1024,
    // max: 1920
    },
    height: {
    ideal: _this.parameters.sourceHeight,
    // min: 776,
    // max: 1080
    }
    }
    }
    
    // CUSTOM CODE START
    var backCam2 = devices.filter(d=>{
    return d.label && d.label == "camera2 0, facing back";
    })
    if (backCam2.length) {
    userMediaConstraints.video.deviceId = backCam2[0].deviceId
    }
    // CUSTOM CODE END