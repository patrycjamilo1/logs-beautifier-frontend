<script setup lang="ts">
const opened = ref(false);
</script>

<template>
    <div class="collapse-wrapper">
        <div class="header">
            <slot name="header" />
            <button class="clean collapse-toggle" @click="opened = !opened">
                <span v-if="!opened">&#43</span>
                <span v-else>&#727</span>
            </button>
        </div>
        <div class="content" :class="{ opened }">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.collapse-toggle {
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.collapse-wrapper {
    padding: 1rem;
    @apply border border-primary-500 rounded-sm;
    margin-bottom: 1rem;
    .header {
        font-weight: bold;
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
       @apply border-b-2 border-gray;
    }
    .content {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 500ms;
        &:slotted(> *) {
            overflow: hidden;
        }

        &.opened {
            grid-template-rows: 1fr;
        }
    }
}
</style>