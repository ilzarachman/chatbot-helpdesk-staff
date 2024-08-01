import React, { ForwardRefExoticComponent, RefAttributes } from "react"
import Link from "next/link"
import { LucideProps } from "lucide-react"
import { useRouter } from "next/navigation"

type NavItemProps = {
    id: string
    title: string
    href: string
    active: boolean
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    setNavActive: (title: string) => void
}

export default function NavItem({ id, title, href, active, Icon, setNavActive }: NavItemProps) {
    const router = useRouter()

    const handleClick = () => {
        router.push(href)
        setNavActive(id)
    }

    if (active) {
        return (
            <div className="nav-item flex items-center w-full bg-slate-900 p-6 py-4 text-white">
                <Icon className="mr-2 h-5 w-5" />
                <span className='grow-1'>{title}</span>
            </div>
        )
    }

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className="nav-item flex items-center w-full bg-background hover:bg-secondary p-6 py-4">
                <Icon className="mr-2 h-5 w-5" />
                <span className='grow-1'>{title}</span>
            </div>
        </div>
    )
}