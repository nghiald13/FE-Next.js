'use client'

import { cn } from "@/lib/utils"
import { Field, FieldGroup, FieldLabel, } from "../ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Spinner } from "../ui/spinner"
import { useEffect, useState } from "react"

import { sendVerificationEmail, verifyAccount } from "@/utils/actions"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import { MailCheck } from "lucide-react"

const AccountVerifyForm = (props: any) => {

    // first send state 
    const [firstSend, setFirstSend] = useState(true)

    // disableSend
    const [disableSend, setDisableSend] = useState(false)

    // countdown timer
    const [timeLeft, setTimeLeft] = useState(30)

    // router to redirect
    const router = useRouter()

    // get params from url
    const { _id } = props

    // spinner states
    const [isLoading, setIsLoading] = useState(false)

    // inputOTP auto submit
    const inputOTPonChange = async (val: string) => {
        if (val.length === 6) {
            setIsLoading(true)
            // call backend here
            try {
                const isVerified = await verifyAccount(_id, val)
                if (isVerified) {
                    toast.success("Your account has been verified. Thank you!")
                    setTimeout(() => {
                        router.push("/dashboard")
                    }, 5000)
                } else {
                    toast.error("Invalid OTP code. Please try again!")
                }
            } catch (error) {
                toast.dismiss("There is something wrong. Please try again later!")
            } finally {
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        if (!disableSend) return

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        if (!timeLeft) {
            setDisableSend(false)
        }

        return () => clearInterval(interval)
    }, [disableSend, timeLeft])

    // Button Send Verification Email on click
    const sendMail = async () => {
        setFirstSend(false)
        setDisableSend(true)
        setTimeLeft(30)

        // call backend
        toast("Mail sent!", {
            icon: <MailCheck className="text-blue-500" />,
            description: "A verification code has been sent to your email. Please check and continue the process!",
        })

        await sendVerificationEmail(_id)
    }

    return (
        <>
            {/** toaster / notification */}
            <Toaster className="flex justify-center items-center" />

            <Card className="shadow-2xl w-ful m-10 flex flex-col p-10 gap-5 items-center">
                <CardHeader className="w-full text-center">
                    <h1 className="text-2xl font-extrabold">Let us know that it's you</h1>
                </CardHeader>
                <Separator className="max-w-[50%]" />
                <CardDescription>
                    <div className="text-lg">In order to confirm that you are the one making this decision</div>
                    <div className="text-lg">Please proceed to the following verification steps:</div>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>Click the "Send verification code" button below</li>
                        <li>A verification code will be sent to your email. Check out your inbox to get code</li>
                        <li>Input the code manually or simply copy and paste into below input dialog</li>
                        <li>The verification process will be conducted automatically and notify you the result</li>
                    </ul>
                    <div className="text-red-500">Code is expired within 5 minutes</div>
                </CardDescription>
                <Separator className="max-w-[50%]" />

                {/** =============== Only display when the "Send verification code" button is clicked at least once */}
                {!firstSend && (
                    <>
                        <CardContent className="w-full flex flex-col items-center justify-center">
                            <form onSubmit={(e) => e.preventDefault()} className={cn("w-full flex flex-col items-center gap-6")}>
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
                        <Separator className="max-w-[50%]" />
                    </>
                )}


                <CardFooter className="w-full flex justify-center items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="inline-block w-fit">
                                    <Button disabled={disableSend} onClick={sendMail} variant="outline">
                                        {!disableSend ? "Send verification code" : `You can resend mail after ${timeLeft} seconds`}
                                    </Button>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{!disableSend ? "This feature is currently unavailable" : "You will have to wait 30 seconds between sending codes"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardFooter>
            </Card>


        </>
    )
}

export default AccountVerifyForm