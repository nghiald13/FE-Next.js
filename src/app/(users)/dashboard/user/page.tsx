import { auth } from "@/auth";
import DashboardUserList from "@/components/dashboard/user/dashboard.user.list";
import DashboardUserPagination from "@/components/dashboard/user/dashboard.user.pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { getListUsers } from "@/utils/actions";
import queryString from "query-string";

const ManageUsersPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {

    const {
        current = 1,
        pageSize = 25,
    } = await searchParams

    const session = await auth()
    const listUsers = await getListUsers(queryString.stringify(
        { current, pageSize }),
        session?.access_token as string
    )
    const { results, totalPages, statusCode, message } = listUsers

    return (
        <div>
            <DashboardUserList session={session} results={results} statusCode={+statusCode} message={message} />
            <DashboardUserPagination current={+current} totalPages={+totalPages} />
        </div>
    )
}

export default ManageUsersPage;