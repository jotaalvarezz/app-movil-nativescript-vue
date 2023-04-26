<template>
    <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
        <!-- <Button backgroundColor="#43b883" @tap="openScan">Open Scan</Button> -->
        <Button row="2" backgroundColor="#43b883" text="back camera, with flip"
            @tap="doScanWithBackCameraWithFlip"></Button>
        <!-- <Label text="first" height="70" backgroundColor="#43b883" v-if="activate" /> -->
        <BarcodeScanner row="1" height="300" formats="QR_CODE, EAN_13, UPC_A" beepOnScan="true" reportDuplicates="true"
            preferFrontCamera="false" :pause="pause" @scanResult="onScanResult" v-if="activate">
        </BarcodeScanner>
    </FlexboxLayout>
</template>

<script>
import { isIOS } from "@nativescript/core";
import { BarcodeScanner } from "nativescript-barcodescanner";

export default {
    data() {
        return {
            activate: false,
            isIOS
        }
    },

    methods: {
        openScan() {
            if (this.activate) {
                this.activate = false
            } else {
                this.activate = true
            }
        },

        onScanResult(evt) {
            console.log(`onScanResult: ${evt.text} (${evt.format})`);
        },

        doScanWithBackCameraWithFlip() {
            this.scan(false, true);
        },

        doScanWithFrontCameraNoFlip() {
            this.scan(true, false);
        },

        scan(preferFrontCamera, showFlipCameraButton) {
            new BarcodeScanner().scan({
                cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
                cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
                message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
                preferFrontCamera,            // Android only, default false
                showFlipCameraButton,         // default false
                showTorchButton: true,        // iOS only, default false
                torchOn: false,               // launch with the flashlight on (default false)
                resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
                beepOnScan: true,             // Play or Suppress beep on scan (default true)
                openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
                closeCallback: () => {
                    console.log("Scanner closed @ " + new Date().getTime());
                }
            }).then(
                function (result) {
                    console.log("--- scanned: " + result.text);
                    // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
                    setTimeout(function () {
                        // if this alert doesn't show up please upgrade to {N} 2.4.0+
                        alert({
                            title: "Scan result",
                            message: "Format: " + result.format + ",\nValue: " + result.text,
                            okButtonText: "OK"
                        });
                    }, 500);
                },
                function (errorMessage) {
                    console.log("No scan. " + errorMessage);
                }
            );
        },
    },
};
</script>