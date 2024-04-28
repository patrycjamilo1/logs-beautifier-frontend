<script setup lang="ts">
const uiStore = useUiStore();
</script>

<template>
    <nav :class="{'expanded': uiStore.menuOpened}">
        <button type="button" class="menu-toggle" title="Press to close the menu" @click="uiStore.menuOpened = false">
            x
        </button>
        <NuxtLink to="/">
            <img src="~/assets/img/logo-dark.png" alt="budget boss" class="logo"/>
        </NuxtLink>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    @apply bg-primary-500 flex flex-col items-center;
    min-width: 250px;
    padding: 1rem;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    a {
        align-self: center;
    }
    .logo {
        max-width: 250px;
        margin-bottom: 5rem;
    }

    &.expanded {
        transform: translateX(0);
    }

    .menu-toggle {
        display: none;
    }

    @media screen and (max-width: 768px) {
        transform: translateX(-100vw);
        position: absolute;
        inset: 0;
        .menu-toggle {
            display: inline-block;
        }
    }
}

.menu-toggle {
    border: 0;
    background-color: 0;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 1.3rem;
    @apply text-white;
}
</style>
