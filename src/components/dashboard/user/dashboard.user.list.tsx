'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/sonner"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteUser } from "@/utils/actions"
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const DashboardUserList = (props: any) => {

    const { session, results, statusCode, message } = props

    // useEffect for redirecting to sign in when access_token expires
    useEffect(() => {
        if (statusCode === 401) {
            toast.info("Sign in session expired. You will be redirected!")

            setTimeout(() => {
                signOut({ callbackUrl: '/auth/signin' })
            }, 1500)
        }
    }, [statusCode])

    // useState for monitoring results from server
    const [listUsers, setListUsers] = useState(results)

    // useEffect for listUsers on changed
    useEffect(() => {
        if (results) {
            setListUsers(results)
        }
    }, [results])
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
            <Toaster />

            <div className="max-w-4xl w-full h-[90vh] mx-auto mt-8 p-4 overflow-hidden">
                <div className="rounded-md h-full shadow-sm flex flex-col p-8 overflow-hidden">
                    <ScrollArea className="flex-1 w-full h-full rounded-md">
                        <Table className="w-full">
                            <TableHeader className="sticky top-0 z-10">
                                <TableRow className="">
                                    <TableHead className="">Role</TableHead>
                                    <TableHead className="">Full Name</TableHead>
                                    <TableHead className="">Email</TableHead>
                                    <TableHead className="text-center">Active</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="h-full">
                                {listUsers?.map((user: any) => (
                                    <TableRow key={user._id} className="w-full items-center border-b">
                                        <TableCell className="font-medium">
                                            <Badge variant="outline">{user.role}</Badge>
                                        </TableCell>
                                        <TableCell className="">{user.name}</TableCell>
                                        <TableCell className="">{user.email}</TableCell>
                                        <TableCell className="text-center">
                                            {user.isActive ? (
                                                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="size-8">
                                                        <MoreHorizontalIcon /><span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem><Pencil />Edit</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleDeleteUser(user._id)} variant="destructive">
                                                        <Trash2 />Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div >

        </>
    )
}

export default DashboardUserList