"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ServiceNameStepProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function ServiceNameStep({ value, onChange, error }: ServiceNameStepProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="service-name">Service Name</Label>
        <Input
          id="service-name"
          placeholder="Enter your service name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="text-sm text-muted-foreground">
        <p>Choose a clear and descriptive name for your service.</p>
        <p>A good name helps potential clients understand what you offer at a glance.</p>
      </div>
    </div>
  )
}

