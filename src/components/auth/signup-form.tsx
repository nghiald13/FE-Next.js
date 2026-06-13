'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Spinner } from "../ui/spinner"
import { createAccount } from "@/utils/actions"
import { CircleCheck, CircleX } from "lucide-react"
import { Toaster } from "../ui/sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ContinueWithGoogleBtn from "../layouts/ctn-google"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  // state for router
  const router = useRouter()

  // states for Strong Password
  const [password, setPassword] = useState("");
  const isLenValid = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9\s]/.test(password);

  // states for Confirm Password
  const [confirmPw, setConfirmPw] = useState("");
  const isPwMatched = confirmPw === password;

  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if (!isLenValid || !hasLower || !hasCapital || !hasNumber || !hasSymbol) {
      toast.error("Your password strength doesn't meet requirements.")
      setIsLoading(false)
      return
    }

    if (!isPwMatched) {
      toast.error("Confirm password doesn't match with password. Please check again!")
      setIsLoading(false)
      return
    }

    // get formData fields
    const formData = new FormData(e.currentTarget)
    const values = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      const result = await createAccount(
        values.name,
        values.email,
        values.password
      )

      if (!result?.error) {
        toast.success("Sign up successfully. You will be redirected in 5 seconds for next step")
        setTimeout(() => {
          router.push(`/auth/verify/${values.email}`)
        }, 5000)

      } else {
        toast.error(result.message)
      }
    } catch (error) {

    } finally {
      setIsLoading(false)
    }

  }

  return (
    <>
      <Toaster />
      <form onSubmit={(e) => handleSignUp(e)} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Fill in the form below to create your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="bg-background"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-background"
            />
            <FieldDescription>
              We&apos;ll use this to contact you. We will not share your email
              with anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-background"
              onChange={(e) => setPassword(e.target.value)}
            />

            <FieldDescription>
              <ul className="ml-6 list-disc text-sm">
                <li className={isLenValid ? "text-green-800" : "text-red-800"}>
                  Must be at least 8 characters length {isLenValid ? <CircleCheck size={16} className="inline" /> : <CircleX size={16} className="inline" />}
                </li>
                <li className={hasLower ? "text-green-800" : "text-red-800"}>
                  Contains at least 1 lower letter {hasLower ? <CircleCheck size={16} className="inline" /> : <CircleX size={16} className="inline" />}
                </li>
                <li className={hasCapital ? "text-green-800" : "text-red-800"}>
                  Contains at least 1 upper letter {hasCapital ? <CircleCheck size={16} className="inline" /> : <CircleX size={16} className="inline" />}
                </li>
                <li className={hasNumber ? "text-green-800" : "text-red-800"}>
                  Contains at least 1 number {hasNumber ? <CircleCheck size={16} className="inline" /> : <CircleX size={16} className="inline" />}
                </li>
                <li className={hasSymbol ? "text-green-800" : "text-red-800"}>
                  Contains at least 1 symbol {hasSymbol ? <CircleCheck size={16} className="inline" /> : <CircleX size={16} className="inline" />}
                </li>
              </ul>
            </FieldDescription>

          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              className="bg-background"
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <FieldDescription className={isPwMatched ? "text-green-800" : "text-red-800"}>
              Must be matched with your password above {isPwMatched ? <CircleCheck size={16} className="inline" /> : <CircleX size={16} className="inline" />}
            </FieldDescription>
          </Field>
          <Field>
            <Button disabled={isLoading} type="submit">
              {!isLoading ? "Sign up" : <Spinner />}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Field>
            <ContinueWithGoogleBtn />
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/auth/signin" passHref className="inline underline">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  )
}
