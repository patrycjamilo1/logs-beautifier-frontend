
import { useAppStore } from '~/stores/appStore';
import type { Pagination } from '~/types/general';

export function createPager(identifier: string | number, currentPage: number | string, perPage: number | null = 20)
{
    const store = useAppStore();

    const fragments = { currentPage: Number(currentPage), perPage };

    store.setPager(identifier, { ...fragments, totalPage: 0, totalRows: 0 });

    return fragments;
}

export function updatePager(identifier: string | number, data: Omit<Pagination<unknown>, 'data'>)
{
    const store = useAppStore();

    store.setPager(identifier, {
        ...store.pagers[identifier],
        totalPage: data.totalPages,
        totalRows: data.totalRows,
        currentPage: data.page,
        perPage: data.limit,
    });
}

export interface PagerInfo
{
    currentPage: number;
    perPage: number | null;
    totalPage: number;
    totalRows: number;
}