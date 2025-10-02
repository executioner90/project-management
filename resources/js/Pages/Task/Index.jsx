import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import TaskTable from "@/Pages/Task/Table.jsx";

export default function Index({tasks, queryParams = {}, success}) {
    return (
        <>
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                            Tasks
                        </h2>

                        <Link
                            href={route('task.create')}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Add new task
                        </Link>
                    </div>
                }
            >
                <Head title="Tasks"/>

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100 text-nowrap">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {success && (
                            <div className="mb-4 bg-emerald-500 py-2 px-4 text-white rounded">
                                {success}
                            </div>
                        )}

                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <TaskTable
                                    tasks={tasks}
                                    queryParams={queryParams}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
