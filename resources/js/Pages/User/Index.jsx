import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHead from "@/Components/TableHead.jsx";
import {searchFieldChanged, onKeyPress} from "@/Table/filter.jsx";

export default function Index({ users, queryParams = {}, success }) {
    const deleteUser = (user) => {
        if (!window.confirm(`Are you sure you want to delete the user ${user.name}?`)) {
            return;
        }

        router.delete(
            route('user.destroy', user),
            {
                preserveScrollX: true,
                preserveState: true,
            }
        );
    }

    return (
        <>
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight dark:bg-gray-800">
                            Users
                        </h2>

                        <Link
                            href={route('user.create')}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Add new user
                        </Link>
                    </div>
                }
            >
                <Head title="Users" />

                <div className="py-12 dark:bg-gray-900 dark:text-gray-100">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {success && (
                            <div className="mb-4 bg-emerald-500 py-2 px-4 text-white rounded">
                                {success}
                            </div>
                        )}

                        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="overflow-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2" colSpan="2">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.search}
                                                    placeholder="User name or email"
                                                    onBlur={e => searchFieldChanged('search', e.target.value, queryParams)}
                                                    onKeyPress={e => onKeyPress('search', e, queryParams)}
                                                ></TextInput>
                                            </th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                        </tr>
                                        </thead>

                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHead
                                                name="id"
                                                queryParams={queryParams}
                                            >
                                                ID
                                            </TableHead>

                                            <TableHead
                                                name="name"
                                                queryParams={queryParams}
                                            >
                                                Name
                                            </TableHead>

                                            <TableHead
                                                name="email"
                                                queryParams={queryParams}
                                            >
                                                Email
                                            </TableHead>

                                            <TableHead
                                                name="created_at"
                                                queryParams={queryParams}
                                            >
                                                Created AT
                                            </TableHead>

                                            <th className="px-3 py-2 text-right">Actions</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {users.data.map(user => (
                                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th className="px-3 py-2">{user.id}</th>
                                                <td className="px-3 py-2">{user.name}</td>
                                                <td className="px-3 py-2">{user.email}</td>
                                                <td className="px-3 py-2">{user.created_at}</td>
                                                <td className="px-3 py-2 text-right text-nowrap">
                                                    <Link
                                                        href={route('user.edit', user)}
                                                        className=" font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() => deleteUser(user)}
                                                        className=" font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination links={users.meta.links}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
