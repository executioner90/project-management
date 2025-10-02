import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/constants.jsx";

export default function Show({task}) {
    return (
        <>
            <AuthenticatedLayout header={
                <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                    {`Task ${task.name}`}
                </h2>
            }>
                <Head title={`Task ${task.name}`} description={task.description} />

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className=" text-gray-900 dark:textgray-100">
                            <img
                                src={task.image}
                                alt="image"
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                            <div className="grid gap-4 grid-cols-3 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Task ID</label>
                                        <p className="mt-1 ">{task.id}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Name</label>
                                        <p className="mt-1 ">{task.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project</label>

                                        <p className="mt-1 hover:underline">
                                            <Link href={route('project.show', task.project)}>
                                                {task.project.name}
                                            </Link>
                                        </p>

                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Status</label>
                                        <p className="mt-1 ">
                                        <span className={
                                            'px-2 py-1 rounded text-white ' +
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }>
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1 ">{task.created_by.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1 ">{task.due_date}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created At</label>
                                        <p className="mt-1 ">{task.created_at}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Owner</label>
                                        <p className="mt-1 ">{task.assigned_to.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Priority</label>
                                        <p className="mt-1 ">
                                        <span className={
                                            'px-2 py-1 rounded text-white ' +
                                            TASK_PRIORITY_CLASS_MAP[task.priority]
                                        }>
                                            {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                        </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1 ">{task.updated_by.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label>Task Description</label>
                                <p>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
