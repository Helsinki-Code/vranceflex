"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard/subscription')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-green-500 mb-4">
        <CheckCircle className="h-16 w-16" />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Subscription Updated Successfully!
      </h1>
      <p className="text-gray-500 text-center">
        Redirecting you back to the dashboard...
      </p>
    </div>
  )
}
