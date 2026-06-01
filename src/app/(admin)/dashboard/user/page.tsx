import { auth } from "@/auth";
import DashboardForbidden from "@/components/dashboard/user/dashboard.forbidden";
import DashboardUserList from "@/components/dashboard/user/dashboard.user.list";
import ResultsPagination from "@/components/layouts/results-pagination";
import { getListUsers } from "@/utils/actions";
import queryString from "query-string";

const ManageUsersPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {

    const {
        kw = "",
        current = 1,
        pageSize = 25,
    } = await searchParams

    const session = await auth()
    const listUsers = await getListUsers(queryString.stringify(
        { kw, current, pageSize }),
        session?.access_token as string
    )
    const { results, meta, statusCode, message } = listUsers

    if (statusCode === 403) {
        return (
            <DashboardForbidden />
        )
    }

    return (
        <div>
            <DashboardUserList meta={meta} session={session} results={results} statusCode={+statusCode} message={message} />
            <ResultsPagination current={+current} meta={meta} url="/dashboard/user" />
        </div>
    )
}

export default ManageUsersPage;