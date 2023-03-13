<template>
    <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
        <Button backgroundColor="#43b883" @tap="openScan">Open Scan</Button>
        <Label text="first" height="70" backgroundColor="#43b883" v-if="activate" />
        <!-- <BarcodeScanner row="1" height="300" formats="QR_CODE, EAN_13, UPC_A" beepOnScan="true" reportDuplicates="true"
                preferFrontCamera="false" :pause="pause" @scanResult="onScanResult" v-if="activate">
            </BarcodeScanner> -->
    </FlexboxLayout>
</template>

<script>
export default {
    name:'Scan',
    data() {
        return {
            activate: false
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

        onScanResult() {
            console.log('scan... ')
        }
    },
}
</script>