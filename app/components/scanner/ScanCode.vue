<template>
    <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
        <TextField v-model="pallet" paddingLeft="10" fontSize="30" @textChange="insertData(pallet)" />
        <!-- <Button backgroundColor="#43b883" @tap="openScan">Open Scan</Button> -->
        <Button row="2" backgroundColor="#43b883" text="back camera, with flip"
            @tap="doScanWithBackCameraWithFlip"></Button>
        <!-- <Label text="first" height="70" backgroundColor="#43b883" v-if="activate" /> -->
        <BarcodeScanner row="1" height="300" formats="QR_CODE, EAN_13, UPC_A" beepOnScan="true" reportDuplicates="true"
            preferFrontCamera="false" :pause="pause" @scanResult="onScanResult" v-if="activate">
        </BarcodeScanner>
        <Button text="Crear tabla" @tap="createTable" />
        <Button text="Insertar datos" @tap="insertData" />
        <Button text="Mostrar datos" @tap="getData" />
        <Button text="open1" @tap="open1" />
        <Button text="open" @tap="open" />
    </FlexboxLayout>
</template>

<script>
import { isIOS } from "@nativescript/core";
import { BarcodeScanner } from "nativescript-barcodescanner";
const { createTable, insertData, allData, openDatabase } = require('../../sqlite/database.js');

export default {
    data() {
        return {
            pallet: '',
            pallets: [],
            activate: false,
            isIOS
        }
    },

    methods: {
        async open(){
            try {
                let open = await openDatabase()
                console.log("open ",open)
            } catch (error) {
                console.log(error)
            }
        },

        async createTable() {
            try {
                let table = await createTable();
                console.log('Tabla creada correctamente ', table);
            } catch (error) {
                console.error('Error al crear la tabla:', error);
            }
        },

        async insertData(pallet) {
            try {
                const id = await insertData(pallet);
                console.log('Datos insertados correctamente. ID:', id);
            } catch (error) {
                consol.log('insert error ',error)
            }
        },

        async getData() {
            try {
                const res = await allData()
                console.log('data: ',res)
            } catch (error) {
                console.log(error)
            }
        },

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
            }).then((response) => {
                console.log(response)
                this.pallet = response.text
                this.pallets.push(this.pallet)
            });
        },
    },
};
</script>
