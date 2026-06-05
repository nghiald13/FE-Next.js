import { Sparkles, BadgeCheck, CreditCard, Bell, LogOut, LogIn, Cog } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { SidebarFooter, SidebarMenuButton } from "../ui/sidebar"
import { signOut } from "next-auth/react"
import Link from "next/link"

const SidebarUserFooter = (props: any) => {

    const { session } = props

    return (
        <SidebarFooter>
            <DropdownMenu>
                {!session?.user ?
                    <>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="py-5" asChild>
                                <Link href="/auth/signin"><LogIn />Sign in</Link>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                    </>
                    :
                    <>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="py-5">
                                <Avatar>
                                    <AvatarImage src="https://pbs.twimg.com/media/G5IXXkfWoAAhjNQ?format=png&name=360x360" alt="username" />
                                </Avatar>
                                <div className="grid flex text-left leading-tight ">
                                    <span className="truncate font-medium">{session.user.name}</span>
                                    <span className="truncate text-xs">{session.user.email}</span>
                                </div>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            side="right"
                            align="end"
                            sideOffset={4}
                        >
                            {session.user.role !== 'ADMIN' ? <></> :
                                <>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Cog />
                                            Upgrade to Pro
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                </>
                            }
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => signOut()}>
                                <LogOut />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </>
                }
            </DropdownMenu>
        </SidebarFooter>
    )
}

export default SidebarUserFooter