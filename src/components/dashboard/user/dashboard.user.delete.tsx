'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteUser } from "@/utils/actions"
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

const DashboardUserDelete = (props: any) => {

    const { user, session, setListUsers, onEditClick } = props
    const handleDeleteUser = (userId: string) => {
        toast.warning("Danger Action Alert!!!", {
            position: "top-center",
            description:
                <p className="text-black">
                    You are executing an action considered dangerous! Continue?
                </p>,
            action: {
                label: 'Confirm',
                onClick: () => {
                    const currentToast = toast.loading("Processing delete user...")
                    setTimeout(async () => {
                        const result = await deleteUser(userId, session.access_token)
                        if (!result.error) {
                            setListUsers((prev: any) => prev.filter((user: any) => user._id !== userId))
                            toast.success(result.message, { id: currentToast })
                        } else {
                            toast.info(result.error, {
                                description: result.message,
                                id: currentToast
                            })
                        }
                    }, 1500)
                }
            },
        })

    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon /><span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditClick(user)}>
                        <Pencil className="mr-2 size-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteUser(user._id)} variant="destructive">
                        <Trash2 />Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default DashboardUserDelete