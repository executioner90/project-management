import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";

export default function Index({ projects, auth, errors }) {
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
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Image</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Status</th>
                                        <th className="px-3 py-2">Created at</th>
                                        <th className="px-3 py-2">Due Date</th>
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
                                            <td className="px-3 py-2">{project.name}</td>
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

                                <Pagination links={projects.meta.links}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
