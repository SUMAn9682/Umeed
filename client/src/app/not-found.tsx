import Link from "next/link"

function NotFound() {
  return (
    <div className="min-h-screen flex items-center flex-col">
        <h1>404 | Page Not Found</h1>
        <Link href="/" className="text-primary hover:underline">Go to Home</Link>
    </div>
  )
}

export default NotFound