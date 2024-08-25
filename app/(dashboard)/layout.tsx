"use client"

import { BookText, Home, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import NavItem from '@/components/sidebar/nav-item';
import React from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/middleware';

const navbarItems = [
    {
        id: "home",
        title: 'Home',
        href: '/',
        Icon: Home
    },
    {
        id: "documents",
        title: 'Documents',
        href: '/documents',
        Icon: BookText
    },
    {
        id: "questions",
        title: 'Questions',
        href: '/questions',
        Icon: FileQuestion
    }
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [navActive, setNavActive] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const router = useRouter()

    React.useEffect(() => {
        checkAuth(0, () => {
            setLoading(false);
        }, () => {
            router.push("/login");
        });

        setNavActive(window.location.pathname)
    }, [])

    return (
        <>
            {loading ? <div className="w-svw h-svh absolute top-0 left-0 bg-background z-50"></div> : ""}
            <div className="h-svh w-svw flex bg-background justify-between flex-shrink-0">

                <div className="h-svh w-[260px] w-max-[260px]">
                    <div className="h-full">

                        <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                                <div className="logo flex items-center p-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-2 h-6 w-6"
                                    >
                                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                                    </svg>
                                    <h1 className="text-base font-medium">Helpdesk Admin</h1>
                                </div>
                                <div className="nav mt-10 flex-1">
                                    {navbarItems.map((item) => (
                                        <NavItem
                                            key={item.id}
                                            id={item.href}
                                            title={item.title}
                                            href={item.href}
                                            active={navActive === item.href}
                                            Icon={item.Icon}
                                            setNavActive={setNavActive}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="logout p-6">
                                <Link href="/logout">Logout</Link>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="vertical-line h-full w-[1px] bg-slate-900"></div>

                <div className="h-svh flex-grow flex-shrink overflow-auto">
                    <div className="p-6">{children}</div>
                </div>
            </div>
        </>
    )
}