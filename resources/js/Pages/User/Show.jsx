import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import TaskTable from "@/Pages/Task/Table.jsx";

export default function Show({user, tasks, queryParams}) {
    return (
        <>
            <AuthenticatedLayout header={
                <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                    {`User ${user.name}`}
                </h2>
            }>
                <Head title={`User ${user.name}`} description={user.description} />

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className=" text-gray-900 dark:textgray-100">
                            <img
                                src={user.image}
                                alt="image"
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">User ID</label>
                                        <p className="mt-1 ">{user.id}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">User Name</label>
                                        <p className="mt-1 ">{user.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Status</label>
                                        <p className="mt-1 ">
                                        <span className={
                                            'px-2 py-1 rounded text-white ' +
                                            USER_STATUS_CLASS_MAP[user.status]
                                        }>
                                            {USER_STATUS_TEXT_MAP[user.status]}
                                        </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1 ">{user.created_by.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1 ">{user.due_date}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created At</label>
                                        <p className="mt-1 ">{user.created_at}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1 ">{user.created_by.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label>User Description</label>
                                <p>{user.description}</p>
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
                                hideUserCol={true}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
