import AccountVerifyForm from "@/components/auth/verify-form"

const VerifyPage = async ({
    params,
}: {
    params: Promise<{ _id: string }>
}) => {

    const { _id } = await params
    return (
        <AccountVerifyForm session={_id} />
    )
}

export default VerifyPage