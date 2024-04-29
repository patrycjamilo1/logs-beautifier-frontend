<script lang="ts" setup>
interface Props {
    identifier: string;
    isLoading?: boolean;
}
interface Emits {
    (e: 'changed', value: Record<string, unknown>): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const appStore = useAppStore();
function filter (e: Event) {
    const target = (e as SubmitEvent).target as HTMLFormElement;
    const elements = target.elements;
    const data: Record<string, unknown> = {};
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLButtonElement;
        
        // Check if the element is an input or select
        if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            // Add the element's name and value to the formData object
            data[element.name] = element.value;
        }
    }
    emits('changed', data)
}
</script>

<template>
    <UiCollapse>
        <template #header>
            Filters
        </template>
        <template #default>
            <form @submit.prevent="filter">
                <div class="inputs">
                    <slot />
                </div>
                <div class="filter-actions">
                    <button type="submit" class="bg-primary-500 text-white rounded-sm px-3 py-2 font-bold tracking-wider">
                        Filter
                    </button>
                    <button type="button" class="bg-black text-white rounded-sm px-3 py-2 font-bold tracking-wider" @click="emits('changed', {})">
                        Reset
                    </button>
                </div>
            </form>
        </template>
    </UiCollapse>
</template>

<style lang="scss" scoped>
.inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 1rem;

    @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(auto-fit, 300px);
    }
}

.filter-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}
</style>