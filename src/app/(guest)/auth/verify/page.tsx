
import { auth } from "@/auth"
import AccountVerifyForm from "@/components/auth/verify-form"

const VerifyPage = async (props: any) => {
    const session = await auth()
    return (
        <AccountVerifyForm session={session} />
    )
}

export default VerifyPage