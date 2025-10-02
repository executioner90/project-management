import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/constants.jsx";

export default function Dashboard({ data, activeTasks }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 dark:bg-gray-900 dark:text-white">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid gap-2 grid-cols-3">
                    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-amber-600 font-semibold text-2xl">Pending Tasks</h3>

                            <p className=" text-xl mt-4">
                                <span className="mr-2">{data.myPendingTasks}</span>/<span className="ml-2">{data.totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-blue-600 font-semibold text-2xl">In Progress Tasks</h3>

                            <p className=" text-xl mt-4">
                                <span className="mr-2">{data.myInProgressTasks}</span>/<span className="ml-2">{data.totalInProgressTasks}</span>
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-green-600 font-semibold text-2xl">Completed Tasks</h3>

                            <p className=" text-xl mt-4">
                                <span className="mr-2">{data.myCompletedTasks}</span>/<span className="ml-2">{data.totalCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-2">
                    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-gray-200 font-semibold text-2xl mb-2">
                                My Active Tasks
                            </h3>

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                                <tr>
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Name</th>
                                    <th className="px-3 py-2">Project</th>
                                    <th className="px-3 py-2">Priority</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Due Date</th>
                                </tr>
                                </thead>

                                <tbody>
                                {activeTasks.data.map(task => (
                                    <tr key={task.id}>
                                        <td className="py-2 px-3">{task.id}</td>
                                        <th className="py-2 px-3 hover:underline">
                                            <Link
                                                href={route('task.show', task)}
                                            >
                                                {task.name}
                                            </Link>
                                        </th>
                                        <th className="py-2 px-3 hover:underline">
                                            <Link
                                                href={route('project.show', task.project)}
                                            >
                                                {task.project.name}
                                            </Link>
                                        </th>
                                        <td className="py-2 px-3 text-nowrap">
                                            <span className={
                                                'px-2 py-1 rounded text-white ' +
                                                TASK_PRIORITY_CLASS_MAP[task.priority]
                                            }>
                                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                                </span>
                                        </td>
                                        <td className="py-2 px-3 text-nowrap">
                                            <span className={
                                                'px-2 py-1 rounded text-white ' +
                                                TASK_STATUS_CLASS_MAP[task.status]
                                            }>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                        </td>
                                        <td className={`py-2 px-3 ${
                                            new Date(task.due_date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                                                ? "text-red-600" // past
                                                : new Date(task.due_date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
                                                    ? "text-yellow-600" // today
                                                    : "text-green-600" // future
                                        }`}
                                        >
                                            {task.due_date}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
