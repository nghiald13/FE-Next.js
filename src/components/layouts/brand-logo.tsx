import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const BrandLogo = () => {
    return (
        <>
            <div className="flex justify-center items-center gap-2 p-2 border rounded-xl hover:scale-[1.05] transition-transform duration-200">
                <Avatar >
                    <AvatarImage src="/brand-logo/mecsu-logo.jpg" alt="Brand Logo" />
                    <AvatarFallback />
                </Avatar>
                <span className="text-center text-xl font-bold tracking-tight text-balance">ANOTHER WAY</span>
            </div>

        </>
    )
}

export default BrandLogo