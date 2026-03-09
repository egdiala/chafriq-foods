import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { usePathname } from "next/navigation"
import Link, { type LinkProps } from "next/link"
import { type RouteType } from "next/dist/lib/load-custom-routes"

export const NavItem = ({ children, className, ...props }: LinkProps<RouteType>) => {
    const pathname = usePathname()

    const isActive = useMemo(() => {
        return props.href.toString() !== "/vendor" ? pathname.startsWith(props.href.toString()) : pathname === props.href.toString()
    }, [pathname, props.href])
    
    return (
        <Link
            className={cn(
                "flex items-center gap-1 px-3 py-2 h-9 [&_svg]:size-3.5 font-normal text-sm rounded-full",
                isActive ? "bg-orange-2 text-orange-5" : "bg-grey-dark-4 text-grey-dark-2 [&_svg]:text-grey-dark-3",
                className
            )}
            {...props}
        >
            {children}
        </Link>
    )
}