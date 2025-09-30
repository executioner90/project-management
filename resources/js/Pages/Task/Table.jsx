import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/constants.jsx";
import TableHead from "@/Components/TableHead.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function Table({
    tasks,
    queryParams,
    hideProjectCol = false,
}) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(
            window.location.pathname,
            queryParams,
            { preserveScroll: true }
        );
    }

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(
            window.location.pathname,
            queryParams,
            { preserveScroll: true }
        );
    }

    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        {!hideProjectCol && (
                            <th className="px-3 py-2"></th>
                        )}
                        <th className="px-3 py-2">
                            <TextInput
                                className="w-full"
                                defaultValue={queryParams.name}
                                placeholder="Task name"
                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                onKeyPress={e => onKeyPress('name', e)}
                            ></TextInput>
                        </th>
                        <th className="px-3 py-2">
                            <SelectInput
                                className="w-full"
                                defaultValue={queryParams.status}
                                onChange={e => searchFieldChanged('status', e.target.value)}
                            >
                                <option value="">Select status</option>
                                {Object.entries(TASK_STATUS_TEXT_MAP).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </SelectInput>
                        </th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                    </tr>
                    </thead>

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <TableHead
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            ID
                        </TableHead>

                        <th className="px-3 py-2">Image</th>

                        {!hideProjectCol && (
                            <th className="px-3 py-2">Project Name</th>
                        )}

                        <TableHead
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Name
                        </TableHead>

                        <TableHead
                            name="status"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Status
                        </TableHead>

                        <TableHead
                            name="priority"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Priority
                        </TableHead>

                        <TableHead
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Created AT
                        </TableHead>

                        <TableHead
                            name="due_date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                        >
                            Due Date
                        </TableHead>

                        <th className="px-3 py-2">Assigned To</th>
                        <th className="px-3 py-2">Created By</th>
                        <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tasks.data.map(task => (
                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-3 py-2">{task.id}</th>
                            <td className="px-3 py-2">
                                <img className="imag !w-[60px]" src={task.image} alt="image"/>
                            </td>
                            {!hideProjectCol && (
                                <td>{task.project.name}</td>
                            )}
                            <td className="px-3 py-2">{task.name}</td>
                            <td className="px-3 py-2">
                                                <span className={
                                                    'px-2 py-1 rounded text-white ' +
                                                    TASK_STATUS_CLASS_MAP[task.status]
                                                }>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                            </td>
                            <td className="px-3 py-2">
                                                <span className={
                                                    'px-2 py-1 rounded text-white ' +
                                                    TASK_PRIORITY_CLASS_MAP[task.priority]
                                                }>
                                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                                </span>
                            </td>
                            <td className="px-3 py-2">{task.created_at}</td>
                            <td className="px-3 py-2">{task.due_date}</td>
                            <td className="px-3 py-2">{task.assigned_to.name}</td>
                            <td className="px-3 py-2">{task.created_by.name}</td>
                            <td className="px-3 py-2">
                                <Link
                                    href={route('task.edit', task)}
                                    className=" font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>

                                <Link
                                    href={route('task.destroy', task)}
                                    className=" font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination links={tasks.meta.links}></Pagination>
        </>
    );
}
