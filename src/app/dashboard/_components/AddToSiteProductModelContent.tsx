"use client"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { env } from "@/data/env/client"
import { CopyCheckIcon, CopyIcon, CopyXIcon } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type CopyState = "idle" | "copied" | "error"

export function AddToSiteProductModalContent({ id }: { id: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle")
  const code = `<script src="${env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}/banner"></script>`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState("copied")
      setTimeout(() => setCopyState("idle"), 2000)
    } catch (error) {
      setCopyState("error")
      setTimeout(() => setCopyState("idle"), 2000)
      console.error('Failed to copy:', error)
    }
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Start Earning PPP Sales!</DialogTitle>
        <DialogDescription className="text-base">
          All you need to do is copy the below script into your site and your
          customers will start seeing PPP discounts!
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <pre className="relative overflow-x-auto p-4 bg-secondary rounded-lg font-mono text-sm text-secondary-foreground">
          <code className="break-words whitespace-pre-wrap">{code}</code>
        </pre>

        {copyState === "error" && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to copy code to clipboard. Please try again or copy manually.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2 justify-end">
          <Button
            onClick={handleCopy}
            className="min-w-[120px] transition-all duration-200"
            variant={copyState === "error" ? "destructive" : "default"}
          >
            <CopyStateIcon state={copyState} />
            <span className="ml-2">{getCopyStateText(copyState)}</span>
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  )
}

function CopyStateIcon({ state }: { state: CopyState }) {
  switch (state) {
    case "idle":
      return <CopyIcon className="size-4" />
    case "copied":
      return <CopyCheckIcon className="size-4" />
    case "error":
      return <CopyXIcon className="size-4" />
  }
}

function getCopyStateText(state: CopyState): string {
  switch (state) {
    case "idle":
      return "Copy Code"
    case "copied":
      return "Copied!"
    case "error":
      return "Try Again"
  }
}
