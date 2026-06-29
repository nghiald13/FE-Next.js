'use client'

import { Badge } from "@/components/ui/badge"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import DashboardUserDelete from "./dashboard.user.delete"
import DashboardUserUpdate from "./dashboard.user.update"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const DashboardUserList = (props: any) => {

    const { session, results, statusCode, message, meta } = props
    const router = useRouter()
    const searchParams = useSearchParams()

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
    const [totalResults, setTotalResults] = useState(meta?.totalItems || 0)

    // useEffect for listUsers on changed
    useEffect(() => {
        if (results) setListUsers(results)
        if (meta?.totalItems) setTotalResults(meta?.totalItems)

    }, [results, meta?.totalItems])

    const [openEdit, setOpenEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const handleTriggerEdit = (user: any) => {
        setSelectedUser(user)
        setOpenEdit(true)
    }

    const [kw, setKW] = useState(searchParams.get('kw') || '')
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (kw) {
                params.set('kw', kw)
                params.set('current', '1')
            } else {
                params.delete('kw')
            }

            router.push(`/dashboard/user?${params.toString()}`)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [kw])




    return (
        <>
            <Toaster />

            {!selectedUser ? <></> : <DashboardUserUpdate
                user={selectedUser}
                session={session}
                open={openEdit}
                onOpenChange={setOpenEdit}
                setListUsers={setListUsers}
            />}

            <div className="max-w-4xl w-full h-[90vh] mx-auto mt-8 p-4 overflow-hidden">
                <div className="rounded-md h-full shadow-sm flex flex-col p-8 overflow-hidden">
                    <InputGroup className="">
                        <InputGroupInput onChange={(e) => setKW(e.target.value)} placeholder="Search by name or email " />
                        <InputGroupAddon><Search /></InputGroupAddon>
                        <InputGroupAddon align="inline-end" className="italic text-xs">{meta?.totalItems} results</InputGroupAddon>
                    </InputGroup>
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

                                        {/** Action */}
                                        <TableCell className="text-right">
                                            <DashboardUserDelete
                                                user={user}
                                                session={session}
                                                setListUsers={setListUsers}
                                                onEditClick={handleTriggerEdit}
                                            />
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