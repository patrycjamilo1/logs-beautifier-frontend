<script setup>
import Logo from '~/assets/img/logo.png'
</script>

<template>
    <div class="homepage">
        <img :src="Logo" alt="Logs Beautifier" />
        <h1 class="text-4xl">Choose you device:</h1>
    </div>
</template>

<style lang="scss" scoped>
    .homepage {
        min-height: 100vh;
        background-image: url('~/assets/img/wave.svg');
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: 150%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            max-width: 400px;
            max-height: 300px;
        }
    }
</style>