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
                        src="https://img.freepik.com/premium-vector/otp-authentication-secure-verification_7087-3082.jpg?semt=ais_hybrid&w=740&q=80"
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