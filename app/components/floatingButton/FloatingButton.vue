<template>
    <StackLayout class="floating-button" @tap="onTap">
        <Label class="floating-button-label" text="Botón flotante" />
    </StackLayout>
</template>

<style scoped>
.floating-button {
    width: 56;
    height: 56;
    background-color: #ff0000;
    border-radius: 28;
    position: absolute;
    right: 16;
    bottom: 16;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
    justify-content: center;
    align-items: center;
}

.floating-button-label {
    color: white;
    font-size: 16;
    font-weight: bold;
    text-align: center;
}
</style>

<script>
export default {
    methods: {
        onTap() {
            // Lógica a ejecutar cuando se presione el botón flotante
            console.log("Botón flotante presionado");
        }
    }
}
</script>
