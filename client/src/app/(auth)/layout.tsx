"use client"
import { useAuthStore } from "@/store/Auth"
import React from "react"

const Layout = ({ children }: {children: React.ReactNode}) => {
    const { isAuthenticated } = useAuthStore()

    if(isAuthenticated) return null;

    return(
        !isAuthenticated && (
            <div className="min-h-screen flex items-center justify-center">
                {children}
            </div>
        )
    )
}

export default Layout