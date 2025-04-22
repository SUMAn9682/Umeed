import Footer from "@/components/footer/Footer"

const Layout = ({ children }: {children: React.ReactNode}) => {

    return(
        <div>
            {children}
            <Footer />
        </div>
    )
}

export default Layout