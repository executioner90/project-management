import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TaskTable from "@/Pages/Task/Table.jsx";

export default function Show({project, tasks, queryParams}) {
    return (
        <>
            <AuthenticatedLayout header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                        {`Project ${project.name}`}
                    </h2>

                    <Link
                        href={route('project.edit', project)}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Edit
                    </Link>
                </div>

            }>
                <Head title={`Project ${project.name}`} description={project.description} />

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className=" text-gray-900 dark:textgray-100">
                            <img
                                src={project.image}
                                alt="image"
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1 ">{project.id}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Name</label>
                                        <p className="mt-1 ">{project.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Status</label>
                                        <p className="mt-1 ">
                                        <span className={
                                            'px-2 py-1 rounded text-white ' +
                                            PROJECT_STATUS_CLASS_MAP[project.status]
                                        }>
                                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                                        </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1 ">{project.created_by.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className={`py-2 px-3 ${
                                            new Date(project.due_date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                                                ? "text-red-600" // past
                                                : new Date(project.due_date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
                                                    ? "text-yellow-600" // today
                                                    : "text-green-600" // future
                                        }`}
                                        >
                                            {project.due_date}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created At</label>
                                        <p className="mt-1 ">{project.created_at}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1 ">{project.created_by.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label>Project Description</label>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                            <TaskTable
                                tasks={tasks}
                                queryParams={queryParams}
                                hideProjectCol={true}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
