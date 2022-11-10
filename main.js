window.onload = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    document
      .querySelector("a-text")
      .setAttribute(
        "gps-entity-place",
        `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`
      );
    console.log("hej");
    // CUSTOM CODE START
    var backCam2 = devices.filter((d) => {
      console.log("kamera koll");
      return d.label && d.label == "camera2 0, facing back";
    });
    if (backCam2.length) {
      userMediaConstraints.video.deviceId = backCam2[0].deviceId;
    }
    // CUSTOM CODE END
  });
};
