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
import { authenticate } from "@/utils/actions"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Spinner } from "../ui/spinner"
import Link from "next/link"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import ContinueWithGoogleBtn from "../layouts/ctn-google"


export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || ''

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const handleSignIn = async (e: any) => {

    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const values = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const res = await authenticate(values.email, values.password, callbackUrl)
    if (res?.error) {
      //If exists error, notify user regardless cases
      toast.error(res.error, {
        description: <p className="text-black">{res.message}</p>
      })

      //Case inactive account: redirect user to verify page after 5secs delay
      if (res.statusCode === 400) {
        setTimeout(() => {
          router.push(`/auth/verify/${values.email}`)
        }, 5000)
      }

      setIsLoading(false)

      //Case no error (signin successfully)
    } else {
      // redirect
      router.push('/products')
    }
  }

  return (

    <form onSubmit={(e) => handleSignIn(e)} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to sign in to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
            name="email"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
            name="password"
          />
        </Field>
        <Field>
          <Button disabled={isLoading} type="submit">
            {isLoading ? <Spinner /> : "Sign in"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <ContinueWithGoogleBtn />
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" passHref className="inline underline">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}