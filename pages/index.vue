<script setup>
import Logo from '~/assets/img/logo.png'
import Mikrotik from '~/assets/img/devices/mikrotik.png'
</script>

<template>
    <div class="homepage">
        <img :src="Logo" alt="Logs Beautifier" />
        <div class="content-frame">
            <h1 class="text-2xl text-center font-bold uppercase mb-8">Choose your device</h1>
            <div class="devices-to-pick-from">
                <NuxtLink :to="{ name: 'logs-type', params: { type: 'mikrotik'} }" class="device">
                    <img :src="Mikrotik" alt="Mikrotik" />
                    <span class="device-name">Mikrotik</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .homepage {
        min-height: 100vh;
        background-image: url('~/assets/img/wave.svg');
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: 150%;
        @apply flex flex-col items-center;

        img {
            max-width: 400px;
            max-height: 300px;
        }

        .devices-to-pick-from {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            @apply px-12 gap-2 place-content-center border-l-4 border-r-4 w-full max-w-[800px]; 

            .device {
                @apply flex flex-col p-3 items-center shadow-sm shadow-black hover:shadow-md hover:shadow-black relative bg-white transition ease-in-out;
                img {
                    max-width: 100%;
                }

                .device-name {
                    @apply font-semibold text-xl absolute bottom-1;
                }
            }
        }
    }
</style>