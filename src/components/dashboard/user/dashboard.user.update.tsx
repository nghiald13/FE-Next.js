import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateUser } from "@/utils/actions";
import { useState } from "react";
import { toast } from "sonner";

const DashboardUserUpdate = (props: any) => {

    const { user, session, open, onOpenChange, setListUsers } = props

    const userRoles = [
        { label: "USER", value: "USER" },
        { label: "ADMIN", value: "ADMIN" },
    ]

    const [switchVal, setSwitchVal] = useState(user.isActive)

    const handleSubmitChanges = async (e: any) => {
        e.preventDefault();

        const currentToast = toast.loading("Making changes...")
        const formData = new FormData(e.currentTarget)
        const values = {
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role'),
            isActive: switchVal,
        }
        console.log(values)

        toast.loading("Commit changes to database...", { id: currentToast })
        try {
            const res = await updateUser({ _id: user._id, ...values }, session.access_token)
            if (res.statusCode === 200) {
                toast.success(res.message, { id: currentToast })
                setListUsers((prev: any) =>
                    prev.map((u: any) => u._id === user._id ? { ...u, ...values } : u)
                )
                onOpenChange(false)
            } else {
                toast.error(res.error, {
                    id: currentToast,
                    description: res.message
                })
            }
        } catch (error) {
            toast.error("Oops!! Something is wrong", {
                id: currentToast,
                description: "There is an unknown error. Please try again later!"
            })
        }
    }

    return (
        <>

            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={(e) => handleSubmitChanges(e)}>
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to user profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" defaultValue={user.name} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Email</Label>
                                <Input type="email" id="username-1" name="email" defaultValue={user.email} />
                            </Field>
                            <Field>
                                <Select name="role" defaultValue={user.role}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>User Role</SelectLabel>
                                            {userRoles.map(role => (
                                                <SelectItem key={role.label} value={role.value}>
                                                    <Badge variant="outline">{role.value}</Badge>
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <FieldLabel htmlFor="switch-active">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Activate Account Zone</FieldTitle>
                                        <FieldDescription>
                                            {switchVal === user.isActive ?
                                                `This account is currently ${switchVal ? "activated" : "inactivated"}. Make changes?`
                                                :
                                                `This account WILL BE ${switchVal ? "activated" : "inactivated"} on your changes`
                                            }
                                        </FieldDescription>
                                    </FieldContent>
                                    <Switch name="isActive" onClick={() => setSwitchVal(!switchVal)} id="switch-active" defaultChecked={user.isActive} />
                                </Field>
                            </FieldLabel>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DashboardUserUpdate