<script setup lang="ts">
import type { LogsModel, Pagination } from '~/types/general';

const route = useRoute();
const appStore = useAppStore();
const page = Number(route.query.page) || 1;
createPager(`logs`, page, 15);
const pager = computed(() => appStore.pagers[`logs`]);
const logs = ref<LogsModel[]>([]);
const filterObject = ref<Record<string, unknown>>({});
const format = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'UTC',
    }).format(date)
}
async function fetchLogs(filters?: Record<string, unknown>) {
    try {
        const response = await $fetch<Pagination<{logs: LogsModel[]}>>('logs', {
            method: 'GET',
            baseURL: 'http://localhost:8000',
            query: filters
        })
        if (response) {
            logs.value = response.data.logs;
        }
    }
    catch(err) {
        
    }
};

fetchLogs();
console.log('aaaaa')
</script>

<template>
   <div class="logs-table">
        <Filters identifier="logs" @changed="fetchLogs">
            <div class="filter-input">
                <label for="type">Type:</label>
                <input id="type" type="text" name="type" placeholder="type" />
            </div>
        </Filters>
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
                        <td>{{  index + 1 }}.</td>
                        <td>{{  log.type }}</td>
                        <td>{{  log.level }}</td>
                        <td>{{  log.message }}</td>
                        <td>{{  format(new Date(log.createdAt)) }}</td>
                        <td>{{  format(new Date(log.updatedAt)) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
        @apply px-6 py-4 whitespace-nowrap text-center border-b border-b-gray border-r border-r-gray;
    }
}
</style>