import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import TaskTable from "@/Pages/Task/Table.jsx";

export default function Index({tasks, queryParams = null,}) {
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                        Tasks
                    </h2>
                }
            >
                <Head title="Tasks"/>

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
