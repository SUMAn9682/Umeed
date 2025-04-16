"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

function BackBtn({ cn = "" }: { cn?: string }) {
    const router = useRouter()

    return (
        <Button
            variant={"ghost"}
            className={`${cn} flex items-center`}
            onClick={() => router.back()}
            aria-label="Back"
        >
            <ArrowLeft className="w-4 h-4 mr-1" /><span>Back</span>
        </Button>
    )
}

export default BackBtn