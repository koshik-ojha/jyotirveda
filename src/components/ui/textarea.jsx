import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] resize-y",
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        "focus-visible:border-veda-orange focus-visible:ring-3 focus-visible:ring-veda-orange/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
