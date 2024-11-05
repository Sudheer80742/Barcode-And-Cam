/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"rbx.107/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
