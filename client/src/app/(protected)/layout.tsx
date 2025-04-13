// "use client"
// import { useAuthStore } from "@/store/Auth"

const Layout = ({ children }: {children: React.ReactNode}) => {
    // const { isAuthenticated } = useAuthStore()

    // if(isAuthenticated) return null;

    return(
        // !isAuthenticated && (
            <div>
                {children}
            </div>
        // )
    )
}

export default Layout