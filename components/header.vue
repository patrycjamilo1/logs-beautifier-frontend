<script setup lang="ts">
const uiStore = useUiStore();
</script>

<template>
    <header>
        <button type="button" title="Click to open the menu" @click="uiStore.menuOpened = !uiStore.menuOpened">
            <div class="hamburger-lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>  
        </button>
    </header>
</template>

<style lang="scss" scoped>
header {
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
    @media screen and (min-width: 768px){
        display: none;
    }

    button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        min-width: 20px;
        min-height: 20px;
        font-size: 1.3rem;
        display: none;
        @media screen and (max-width: 768px) {
            display: inline-block;
        }
    }
}

.hamburger-lines {
  display: block;
  height: 20px;
  width: 24px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-lines .line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: #0e2431;
}
</style>