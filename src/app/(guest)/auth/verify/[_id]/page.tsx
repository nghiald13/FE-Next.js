import AccountVerifyForm from "@/components/auth/verify-form"

const VerifyPage = async (
    { params, }: { params: { _id: string } }
) => {
    const { _id } = await params
    const decoder_id = decodeURIComponent(_id)

    return (
        <>
            {/** =================== Layout Grid 2 cols =================== */}
            < div className="grid lg:grid-cols-3 justify-center" >

                {/** =================== Left Area =================== */}
                <div className="hidden lg:block" >
                    <img
                        className="h-full"
                        src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                </div>

                {/** =================== Right Area =================== */}

                < div className="col-span-2 flex flex-1 justify-center items-center min-h-screen" >
                    <AccountVerifyForm _id={decoder_id} />
                </div >
            </div >
        </>
    )
}

export default VerifyPage