import { SignupForm } from "@/components/auth/signup-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GalleryVerticalEndIcon } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* ==================== Half view background image ==================== */}
      <div className="relative hidden bg-muted lg:block"> {/* Default hidden for <= lg devices, else display block */}
        <img
          src="https://gmhsart.weebly.com/uploads/6/4/9/6/6496393/man-1246233-1920_orig.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">

        {/* ==================== Brand Logo ==================== */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Avatar >
                <AvatarImage src="https://pbs.twimg.com/media/G5IXXkfWoAAhjNQ?format=png&name=360x360" alt="Varka" />
                <AvatarFallback />
              </Avatar>
            </div>
            Want some drinks?
          </a>
        </div>

        {/* ==================== Signup Area ==================== */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}
