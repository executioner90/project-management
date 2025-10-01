import {Head, Link, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Form({user = {}}) {
    const {data, setData, post, put, processing, errors} = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
    });

    function onSubmit(e) {
        e.preventDefault();

        if (user.id) {
            put(route('user.update', user));
        } else {
            post(route('user.store'));
        }
    }


    return (
        <>
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                            {user.id ? 'Update' : 'Create'} new user {user.name || ''}
                        </h2>
                    </div>
                }
            >
                <Head title={user.id ? `Update - ${user.name}` : 'Create new user'}/>

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name"/>

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => {
                                            setData('name', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email"/>

                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('email', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password"/>

                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('password', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm password"/>

                                    <TextInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) => {
                                            setData('password_confirmation', e.target.value)
                                        }}
                                    />

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('user.index')}
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
