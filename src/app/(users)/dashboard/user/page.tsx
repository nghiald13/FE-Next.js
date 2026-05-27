import { auth } from "@/auth";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious } from "@/components/ui/pagination";
import { getListUsers } from "@/utils/actions";
import queryString from "query-string";

const ManageUsersPage = async (
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) => {
    const {
        current = 1,
        pageSize = 5,
    } = await searchParams

    const session = await auth()
    console.log(session)
    const listUsers = await getListUsers(queryString.stringify(
        { current, pageSize }),
        session?.access_token as string
    )
    const { results, totalPages, error, message } = listUsers

    return (
        <div>
            {!results ? JSON.stringify(message) : JSON.stringify(results)}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href='#'/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default ManageUsersPage;