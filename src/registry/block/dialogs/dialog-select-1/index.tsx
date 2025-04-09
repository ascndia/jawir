"use client"

import * as React from "react"
import { X, FileText, Eye, Info, Check } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DialogSelect1AProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function DialogSelect1A({ open, onOpenChange }: DialogSelect1AProps) {
  const [selectedOption, setSelectedOption] = React.useState<"custom" | "auto">("custom")
  const [wordCount, setWordCount] = React.useState("4500")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-semibold">Choose Word Count</h2>
          </div>
          <p className="text-gray-600 mt-1">
            Looking to outsource some of those "time consuming" SEO tasks? Our platform can help with just about
            anything SEO related.
          </p>
        </div>

        <RadioGroup
          value={selectedOption}
          onValueChange={(value) => setSelectedOption(value as "custom" | "auto")}
          className="px-6 pb-6 space-y-3"
        >
          <div>
            <RadioGroupItem
              value="custom"
              id="custom"
              className="peer sr-only"
              aria-label="Choose your own word count"
            />
            <Label
              htmlFor="custom"
              className="flex flex-col items-start rounded-lg border-2 border-muted p-4 peer-data-[state=checked]:border-primary cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="bg-gray-100 rounded-lg p-2 h-14 w-14 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Choose your own word count</h3>
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded">Recommended</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    Looking to outsource some of those "time consuming" SEO tasks? The SearchEye platform can help with
                    just about any specific SEO request, including: audits, content outlines, keyword research, FAQs,
                    Product Hunt launches and more!
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Enter Word Count:</span>
                      <Input
                        type="text"
                        value={wordCount}
                        onChange={(e) => setWordCount(e.target.value)}
                        placeholder="Words"
                        className="w-[180px]"
                        disabled={selectedOption !== "custom"}
                        />
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-gray-500 text-xs">
                      <Info className="h-3.5 w-3.5" />
                      <span>For "Best Of" articles, we recommend a minimum of 3,000 words</span>
                    </div>
                  </div>
                </div>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="auto"
              id="auto"
              className="peer sr-only"
              aria-label="Let Searcheye choose"
            />
            <Label
              htmlFor="auto"
              className="flex flex-col items-start rounded-lg border-2 border-muted p-4 peer-data-[state=checked]:border-primary cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="bg-green-100 rounded-lg p-2 h-14 w-14 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Let Searcheye choose</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Build content at scale. Each piece of content includes a comprehensive guide outline, with options for
                    Clearscope optimization and editing by a Subject Matter Expert (SME).
                  </p>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex justify-between items-center p-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-primary hover:bg-primary/90">Select and Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}