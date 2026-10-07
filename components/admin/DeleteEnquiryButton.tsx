"use client"

import { useState } from "react"

type DeleteEnquiryButtonProps = {
  id: string
}

export default function DeleteEnquiryButton({
  id,
}: DeleteEnquiryButtonProps) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry? This action cannot be undone."
    )

    if (!confirmed) return

    try {
      setDeleting(true)

      const response = await fetch("/api/enquiries", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete enquiry")
      }

      window.location.reload()
    } catch (error) {
      console.error("Delete enquiry error:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete enquiry. Please try again."
      )

      setDeleting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="border border-destructive px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  )
}