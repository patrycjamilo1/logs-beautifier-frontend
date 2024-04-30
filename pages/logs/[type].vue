<script setup lang="ts">
import type { LogsModel, Pagination } from '~/types/general';

const route = useRoute();
const appStore = useAppStore();
const page = Number(route.query.page) || 1;
createPager(`logs`, page, 5);
const pager = computed(() => appStore.pagers[`logs`]);
const logs = ref<LogsModel[]>([]);
const filterObject = ref({
    type: '',
    level: '',
    message: '',
    startDate: '',
    endDate: '',
});
const format = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'UTC',
    }).format(date)
}
const isLoading = ref(false);
async function fetchLogs(filters?: Record<string, unknown>) {
    isLoading.value = true;
    try {
        const response = await $fetch<Pagination<{logs: LogsModel[]}>>('logs', {
            method: 'GET',
            baseURL: 'http://localhost:8000',
            query: { ...filters, page: pager.value?.currentPage, limit: pager.value?.perPage }
        })
        if (response) {
            logs.value = response.data.logs;
            const { data, ...paginationInfo } = response 
            updatePager('logs', paginationInfo);
        }
    }
    finally {
        isLoading.value = false;
    }
};

function resetFilters () {
    for (const key in filterObject.value) {
        filterObject.value[key as keyof typeof filterObject.value] = '';
    }
    fetchLogs();
}

function calculateEnumeration (index: number) {
    if(pager.value?.perPage && pager.value.currentPage) {
        return (pager.value.currentPage - 1) * pager.value.perPage + index + 1;
    }
    return index + 1;
}
fetchLogs();
</script>

<template>
   <div class="logs-table flex flex-col">
        <Filters identifier="logs" @changed="fetchLogs" @reset="resetFilters">
            <div class="filter-input">
                <label for="type">Type:</label>
                <input id="type" type="text" name="type" placeholder="type" v-model="filterObject.type" />
            </div>
            <div class="filter-input">
                <label for="type">Level:</label>
                <input id="level" type="text" name="level" placeholder="level" v-model="filterObject.level" />
            </div>
            <div class="filter-input">
                <label for="type">Start date:</label>
                <input id="from" type="date" name="startDate" placeholder="start date" v-model="filterObject.startDate" />
            </div>
            <div class="filter-input">
                <label for="type">End date:</label>
                <input id="to" type="date" name="endDate" placeholder="end date" v-model="filterObject.endDate" />
            </div>
        </Filters>
        <UiLoader v-if="isLoading" class="self-center" />
        <div class="content overflow-auto max-w-[90vw]" v-if="logs.length">
            <table class="logs-table table-auto w-full">
                <thead>
                    <tr>
                        <td>Lp.</td>
                        <td>Type</td>
                        <td>Level</td>
                        <td>Message</td>
                        <td>Created at</td>
                        <td>Updated at</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(log, index) in logs" :key="log._id">
                        <td>{{ calculateEnumeration(index) }}.</td>
                        <td>{{  log.type }}</td>
                        <td>{{  log.level }}</td>
                        <td>{{  log.message }}</td>
                        <td>{{  format(new Date(log.createdAt)) }}</td>
                        <td>{{  format(new Date(log.updatedAt)) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination identifier="logs" @change="fetchLogs" />
   </div>
</template>

<style lang="scss" scoped>
.logs-page {
    display: flex;
}
aside {
    max-width: 250px;
    min-height: 100vh;
    @apply bg-primary-500 flex flex-col items-center;

    img {
        max-width: 200px;
    }
}

thead {
    td {
        @apply border border-primary-400 px-6 py-3 bg-primary-500 text-xs font-medium text-white uppercase tracking-wider text-center;
    }
}

tbody {
    td {
        &:first-child {
            @apply border-l border-l-gray;
        }
        @apply px-6 py-4 text-center border-b border-b-gray border-r border-r-gray whitespace-pre-wrap;
    }
}
</style>