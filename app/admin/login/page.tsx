"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, LockKeyhole } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!password.trim()) {
      setError("Please enter your password.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.error || "Invalid password.")
        return
      }

      router.push("/admin/enquiries")
      router.refresh()
    } catch (error) {
      console.error(error)

      setError(
        "Unable to connect to the server. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17,17,17,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,17,17,.045) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <section className="relative flex min-h-screen items-center justify-center px-5 py-16">
        <div className="w-full max-w-md border border-border bg-background shadow-sm">
          <div className="border-b border-border bg-secondary px-7 py-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Crystal VMM
            </p>

            <h1 className="mt-3 font-mono text-3xl font-black uppercase tracking-[-0.04em]">
              Admin Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Sign in to access customer quotation enquiries.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-6 p-7"
          >
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest"
              >
                Admin password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter admin password"
                  className="h-13 w-full border border-border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="border border-red-500/30 bg-red-500/5 px-4 py-3">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-red-600">
                  Login failed
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-13 w-full items-center justify-center gap-3 bg-primary px-6 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}

              {!loading && (
                <ArrowRight className="size-4" />
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}