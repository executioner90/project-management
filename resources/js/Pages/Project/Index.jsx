import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHead from "@/Components/TableHead.jsx";

export default function Index({ projects, auth, errors, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams);
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

        router.get(route('project.index'), queryParams);
    }

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                        Projects
                    </h2>
                }
            >
                <Head title="Projects" />

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="overflow-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Project name"
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
                                                    {Object.entries(PROJECT_STATUS_TEXT_MAP).map(([key, label]) => (
                                                        <option key={key} value={key}>{label}</option>
                                                    ))}
                                                </SelectInput>
                                            </th>
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

                                            <th className="px-3 py-2">Created By</th>
                                            <th className="px-3 py-2 text-right">Actions</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {projects.data.map(project => (
                                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th className="px-3 py-2">{project.id}</th>
                                                <td className="px-3 py-2">
                                                    <img className="imag !w-[60px]" src={project.image} alt="image"/>
                                                </td>
                                                <td className="px-3 py-2 hover:underline">
                                                    <Link
                                                        href={route('project.show', project)}
                                                    >
                                                        {project.name}
                                                    </Link>

                                                </td>
                                                <td className="px-3 py-2">
                                                <span className={
                                                    'px-2 py-1 rounded text-white ' +
                                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                                }>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                                </td>
                                                <td className="px-3 py-2">{project.created_at}</td>
                                                <td className="px-3 py-2">{project.due_date}</td>
                                                <td className="px-3 py-2">{project.created_by.name}</td>
                                                <td className="px-3 py-2">
                                                    <Link
                                                        href={route('project.edit', project)}
                                                        className=" font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <Link
                                                        href={route('project.destroy', project)}
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

                                <Pagination links={projects.meta.links}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
