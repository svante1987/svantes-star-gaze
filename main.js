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

// get available devices
navigator.mediaDevices.enumerateDevices().then(function(devices) {
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


if (null !== _this.parameters.deviceId) {
userMediaConstraints.video.deviceId = {
    exact: _this.parameters.deviceId
};
}
// get a device which satisfy the constraints
navigator.mediaDevices.getUserMedia(userMediaConstraints).then(function success(stream) {
// set the .src of the domElement
domElement.srcObject = stream;
var event = new CustomEvent('camera-init', {stream: stream});
window.dispatchEvent(event);
// to start the video, when it is possible to start it only on userevent. like in android
document.body.addEventListener('click', function(){
    domElement.play();
});
// domElement.play();
             // TODO listen to loadedmetadata instead
// wait until the video stream is ready
var interval = setInterval(function() {
    if (!domElement.videoWidth)	return;
    onReady()
    clearInterval(interval)
}, 1000/50);
}).catch(function(error) {
onError({
    name: error.name,
    message: error.message
});
});
}).catch(function(error) {
onError({
message: error.message
});
});

// init controls for camera
var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: 'pattern',
    patternUrl: THREEx.ArToolkitContext.baseURL + 'js/lib/data/patt.hiro',
    // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
    // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
    changeMatrixMode: 'cameraTransformMatrix',
    deviceId: 2 // we need to let the user switch between available cameras here...
})