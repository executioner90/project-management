import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";
import {sortChanged} from "@/Table/sort.jsx";

export default function TableHead({
   name,
   sortable = true,
    queryParams = {},
   children,
}) {
    return (
        <th onClick={() => sortChanged(name, queryParams)}>
            <div className="px-3 py-2 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={
                            'w-4 ' +
                            (queryParams.sort_field === name && queryParams.sort_direction === 'asc' ? 'text-white' : ' ')
                        } />
                        <ChevronDownIcon className={
                            'w-4 -mt-2 ' +
                            (queryParams.sort_field === name && queryParams.sort_direction === 'desc' ? 'text-white' : ' ')
                        } />
                    </div>
                )}
            </div>
        </th>
    );
}
