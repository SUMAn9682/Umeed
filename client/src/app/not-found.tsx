import Link from "next/link"

function NotFound() {
  return (
    <div className="text-3xl text-orange-500 pt-20 flex flex-col items-center justify-center h-screen">
        <h1>404 | Page Not Found</h1>
        <Link href="/" className="text-primary hover:underline">Go to Home</Link>
    </div>
  )
}

export default NotFound