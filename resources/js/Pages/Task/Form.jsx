import {Head, Link, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_PRIORITY_TEXT_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";

export default function Form({task = {}, projects, users}) {
    const {data, setData, post, put, processing, errors, reset} = useForm({
        project_id: task.project.id || "",
        name: task.name || "",
        description: task.description || "",
        due_date: task.due_date || "",
        status: task.status || "",
        image: "",
        assigned_to: task.assigned_to.id || "",
        priority: task.priority || "",
    });

    function onSubmit(e) {
        e.preventDefault();

        if (task.id) {
            data['_method'] = 'put';

            router.post(route('task.update', task.id), data);
        } else {
            post(route('task.store'));
        }
    }


    return (
        <>
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                            {task.id ? 'Update' : 'Create'} new task {task.name || ''}
                        </h2>
                    </div>
                }
            >
                <Head title={task.id ? `Update - ${task.name}` : 'Create new task'}/>

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                {task.image && (
                                    <div className="mb-4">
                                        <img src={task.image} alt="Image" className="w-64"/>
                                    </div>
                                )}

                                <div>
                                    <InputLabel htmlFor="image" value="Image"/>

                                    <TextInput
                                        id="image"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('image', e.target.files[0]);
                                        }}
                                    />

                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="project" value="Project"/>

                                    <SelectInput
                                        id="status"
                                        className="mt-1 block w-full"
                                        defaultValue={data.project_id}
                                        onChange={(e) => {
                                            setData('project_id', e.target.value)
                                        }}
                                    >
                                        <option value="">Select project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))}
                                    </SelectInput>

                                    <InputError message={errors.project_id} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name"/>

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('name', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description"/>

                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('description', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="due_date" value="Due date"/>

                                    <TextInput
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('due_date', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Status"/>

                                    <SelectInput
                                        id="status"
                                        className="mt-1 block w-full"
                                        defaultValue={data.status}
                                        onChange={(e) => {
                                            setData('status', e.target.value)
                                        }}
                                    >
                                        <option value="">Select status</option>
                                        {Object.entries(TASK_STATUS_TEXT_MAP).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </SelectInput>

                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="priority" value="Priority"/>

                                    <SelectInput
                                        id="priority"
                                        className="mt-1 block w-full"
                                        defaultValue={data.priority}
                                        onChange={(e) => {
                                            setData('priority', e.target.value)
                                        }}
                                    >
                                        <option value="">Select priority</option>
                                        {Object.entries(TASK_PRIORITY_TEXT_MAP).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </SelectInput>

                                    <InputError message={errors.priority} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="assigned_to" value="Owner"/>

                                    <SelectInput
                                        id="assigned_to"
                                        className="mt-1 block w-full"
                                        defaultValue={data.assigned_to}
                                        onChange={(e) => {
                                            setData('assigned_to', e.target.value)
                                        }}
                                    >
                                        <option value="">Select owner</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </SelectInput>

                                    <InputError message={errors.assigned_to} className="mt-2" />
                                </div>

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('task.index')}
                                        className="inline-block bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all mr-2 hover:bg-gray-200"
                                    >
                                        Cancel
                                    </Link>

                                    <button disabled={processing} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
