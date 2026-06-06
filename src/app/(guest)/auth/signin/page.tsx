import { SignInForm } from "@/components/auth/signin-form";
import BrandLogo from "@/components/layouts/brand-logo";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const SignInPage = () => {

  return (
    <>
      <Toaster />
      <div className="grid min-h-svh lg:grid-cols-2"> {/** Default grid 1 column with min height for devices < lg */}
        <div className="flex flex-col gap-4 p-6 md:p-10">

          {/* ==================== Brand Logo ==================== */}
          <div className="flex justify-center gap-2 md:justify-start">
            <BrandLogo />
          </div>

          {/* ==================== Signin Area ==================== */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <Suspense fallback={
                <div className="flex flex-col items-center gap-2 text-center">
                  <Spinner />
                  <p className="text-sm text-muted-foreground">Loading login form...</p>
                </div>
              }>
                <SignInForm />
              </Suspense>
            </div>
          </div>
        </div>

        {/* ==================== Half view background image ==================== */}
        <div className="relative hidden bg-muted lg:block"> {/* Default hidden for <= lg devices, else display block */}
          <img
            src="/brand-logo/mecsu-sign-logo.jfif"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div >
    </>

  )
}

export default SignInPage;