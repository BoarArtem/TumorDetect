"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PasswordInput } from "@/components/auth/password-input"
import { SocialAuth } from "@/components/auth/social-auth"

const roles = [
  "Neurosurgeon",
  "Radiologist",
  "Resident / Fellow",
  "Researcher",
  "Other",
]

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [accepted, setAccepted] = React.useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!accepted) {
      toast.error("Please accept the terms to continue.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success("Account created", {
        description: "Your Tumor Detect workspace is ready.",
      })
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Start reading studies with AI-assisted segmentation.
        </p>
      </div>

      <SocialAuth label="Sign up" />

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Dr. Jane Doe" required className="h-10" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="org">Organization</Label>
            <Input id="org" name="org" placeholder="City General Hospital" required className="h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue="Neurosurgeon">
              <SelectTrigger id="role" className="h-10 w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@hospital.org"
            required
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
            required
            className="h-10"
          />
        </div>

        <Label htmlFor="terms" className="items-start font-normal text-muted-foreground">
          <Checkbox
            id="terms"
            name="terms"
            className="mt-0.5"
            checked={accepted}
            onCheckedChange={(v) => setAccepted(v === true)}
          />
          <span>
            I agree to the{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            , and understand this is a clinical decision-support tool.
          </span>
        </Label>

        <Button type="submit" className="h-10" disabled={loading}>
          {loading && <Loader2Icon className="size-4 animate-spin" />}
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
