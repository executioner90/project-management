import {Head, Link, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";

export default function Form({project = {}}) {
    const {data, setData, post, put, processing, errors, reset} = useForm({
        name: project.name || "",
        description: project.description || "",
        due_date: project.due_date || "",
        status: project.status || "",
        image: "",
    });

    function onSubmit(e) {
        e.preventDefault();

        if (project.id) {
            data['_method'] = 'put';

            router.post(route('project.update', project.id), data);
        } else {
            post(route('project.store'));
        }
    }


    return (
        <>
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                            {project.id ? 'Update' : 'Create'} new project {project.name || ''}
                        </h2>
                    </div>
                }
            >
                <Head title={project.id ? `Update - ${project.name}` : 'Create new project'}/>

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                {project.image && (
                                    <div className="mb-4">
                                        <img src={project.image} alt="Image" className="w-64"/>
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
                                        value={
                                            data.due_date
                                                ? new Date(data.due_date.split('-').reverse().join('-'))
                                                    .toISOString()
                                                    .slice(0, 10)
                                                : ''
                                        }
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('due_date', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Status"/>
                                    {data.status}
                                    <SelectInput
                                        id="status"
                                        className="mt-1 block w-full"
                                        defaultValue={data.status}
                                        onChange={(e) => {
                                            setData('status', e.target.value)
                                        }}
                                    >
                                        <option value="">Select status</option>
                                        {Object.entries(PROJECT_STATUS_TEXT_MAP).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </SelectInput>

                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('project.index')}
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
