import {router} from "@inertiajs/react";

export function sortChanged(name, queryParams) {
    if (name === queryParams.sort_field) {
        queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
        queryParams.sort_field = name;
        queryParams.sort_direction = 'asc';
    }

    router.get(
        window.location.pathname,
        queryParams,
        {
            preserveScroll: true,
            preserveState: true
        }
    );
}
