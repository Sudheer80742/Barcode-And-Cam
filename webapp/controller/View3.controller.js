sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("rbx.107.controller.View3", {
        onInit: function () {
            // Initialize a JSON Model
            this.oModel = new JSONModel({
                imageData: null
            });
            this.getView().setModel(this.oModel);
            this.video = null; // Store the video element reference
            this.stream = null; // Store the media stream reference
        },

        onOpeningCam: function () {
            // Check if the browser supports getUserMedia
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Create a video element if it doesn't already exist
                if (!this.video) {
                    this.video = document.createElement("video");
                    this.video.setAttribute("autoplay", true);
                    this.video.setAttribute("playsinline", true); // For iOS

                    // Clear the container and append the video element
                    const oVBox = this.getView().byId("cont");
                    oVBox.removeAllItems();
                    oVBox.getDomRef().appendChild(this.video); 

                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then((stream) => {
                            this.stream = stream; // Store the media stream
                            this.video.srcObject = stream;
                        })
                        .catch((error) => {
                            console.error("Error accessing the camera: ", error);
                        });
                }
            } else {
                console.error("Camera not supported on this browser.");
            }
        },

        onTakePicture: function () {
            if (!this.video) {
                console.error("Camera is not open.");
                return;
            }

            // Create a canvas to take the snapshot
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            context.drawImage(this.video, 0, 0);
            const imageData = canvas.toDataURL("image/png");

            // Store image data in the JSON model
            this.oModel.setProperty("/imageData", imageData);

            // Update the Image control source
            this.getView().byId("capturedImage").setSrc(imageData);
            this.getView().byId("imageInfo").setText("Image captured!");

            // Stop the video stream
            this.stream.getTracks().forEach(track => track.stop());
            this.video.pause();
            this.video.srcObject = null;

            // Clear the video element from the container
            const oVBox = this.getView().byId("cont");
            oVBox.removeAllItems(); // Clear the video element
            this.video = null; // Reset video reference
        }
    });
});
