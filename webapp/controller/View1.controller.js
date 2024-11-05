sap.ui.define([
    "sap/ui/core/Element",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Element, Controller, MessageToast) {
    "use strict";

    return Controller.extend("rbx.107.controller.View1", {
        onInit: function () {
            this.routes = this.getOwnerComponent().getRouter()
        },
        onQRCodeScanned: function (oEvent) {

            var sScannedValue = oEvent.getParameter("value");
            console.log("Scanned QR Code Value: ", sScannedValue);
            this._processQRCode(sScannedValue);
        },
        _processQRCode: function (sQRCode) {
            // Example: Call an OData service to fetch details based on the QR code
            // Perform your business logic here
        },
        onFocusQRCodeInput: function () {
            this.byId("qrCodeInput").focus();
        },
        onNav2() {
            this.routes.navTo("RouteView2")
        },
        onNav3() {
            this.routes.navTo("RouteView3")
        },
        onNav4() {
            this.routes.navTo("RouteView4")
        },
    });
});





