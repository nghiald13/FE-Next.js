'use client'

import { cn } from "@/lib/utils"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Spinner } from "../ui/spinner"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { verifyAccount } from "@/utils/actions"
import { toast, Toaster } from "sonner"

const AccountVerifyForm = (props: any) => {
    const { _id } = props
    const [isLoading, setIsLoading] = useState(false)
    const inputOTPonChange = async (val: string) => {
        if (val.length === 6) {
            setIsLoading(true)

            // call backend here
            const isVerified = await verifyAccount(_id, val)
            if (isVerified) {
                toast.success("Your account has been verified. Thank you!")
                setIsLoading(false)
            }


        }

    }

    return (
        <>
            <Toaster />
            {/** =================== Layout Grid 2 cols =================== */}
            <div className="grid lg:grid-cols-2 justify-center">

                {/** =================== Left Area =================== */}
                <div className="hidden lg:block">
                    <img
                        className="h-full"
                        src="https://img.freepik.com/premium-vector/otp-authentication-secure-verification_7087-3082.jpg?semt=ais_hybrid&w=740&q=80"
                    />
                </div>

                {/** =================== Right Area =================== */}

                <div className="flex flex-1 justify-center items-center min-h-screen">
                    <Card className="w-ful m-10 flex flex-col p-10 gap-5 items-center">
                        <CardHeader className="w-full text-center">
                            <h1 className="text-2xl font-extrabold">Verify Your Account</h1>
                        </CardHeader>
                        <Separator className="max-w-[50%]" />
                        <CardDescription>
                            <div className="text-lg">We have sent an email contains verifying code to <span className="italic">{_id}</span></div>
                            <div className="text-lg">Please input the code below to proceed</div>
                            <div className="text-red-500">Code is expired within 5 minutes</div>
                        </CardDescription>
                        <Separator className="max-w-[50%]" />
                        <CardContent className="w-full flex flex-col items-center justify-center">
                            <form className={cn("w-full flex flex-col items-center gap-6")}>
                                <FieldGroup className="w-full flex justify-center">
                                    <Field className="flex flex-col items-center gap-2">
                                        <FieldLabel className="flex w-full justify-center">
                                            <h2 className="font-bold">Please input the code below</h2>
                                        </FieldLabel>
                                        <div className="flex items-center justify-center gap-2">
                                            <InputOTP
                                                maxLength={6} pattern={REGEXP_ONLY_DIGITS}
                                                onChange={(val) => inputOTPonChange(val)}
                                                disabled={isLoading}
                                            >
                                                <InputOTPGroup>
                                                    {Array.from({ length: 6 }, (_, index) => (
                                                        <InputOTPSlot key={index} index={index} />
                                                    ))}

                                                </InputOTPGroup>
                                            </InputOTP>
                                            <Spinner className={cn("mx-2 size-4", !isLoading && "hidden")} />
                                        </div>

                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default AccountVerifyForm