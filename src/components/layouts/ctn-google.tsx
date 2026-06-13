'use client'
import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"

const ContinueWithGoogleBtn = () => {
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
        setLoading(true)
        toast.loading("Redirecting to Google...")
        return signIn("google", { redirectTo: "/products" })
    }
    return (
        <Button
            disabled={loading}
            onClick={handleClick}
            variant="outline"
            type="button"
            className={cn("w-full py-3 flex items-center justify-center gap-3 font-medium text-gray-700 hover:bg-gray-50 border-gray-300 rounded-xl shadow-sm transition-all duration-200"
            )}>

            {loading ? <Spinner /> :
                <>
                    <img
                        className="w-6 h-6 object-contain"
                        src="/google-icons/svg/light/web_light_rd_na.svg"
                        alt="Google Logo"
                    />
                    <span>Continue with Google</span>
                </>
            }
        </Button>
    )
}

export default ContinueWithGoogleBtn