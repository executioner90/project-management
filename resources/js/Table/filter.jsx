import {router} from "@inertiajs/react";

export function searchFieldChanged(name, value, queryParams){
    if (value) {
        queryParams[name] = value;
    } else {
        delete queryParams[name];
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

export function onKeyPress(name, e ,queryParams){
    if (e.key !== "Enter") return

    searchFieldChanged(name, e.target.value, queryParams);
}
