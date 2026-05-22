"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const pad = (n) => String(n).padStart(2, "0")

function parseTime(value) {
  if (!value || typeof value !== "string") return { h: null, m: null }
  const [hh, mm] = value.split(":")
  const h = Number(hh)
  const m = Number(mm)
  return {
    h: Number.isFinite(h) ? h : null,
    m: Number.isFinite(m) ? m : null,
  }
}

function formatDisplay(value, use24Hour) {
  if (!value) return ""
  const { h, m } = parseTime(value)
  if (h === null || m === null) return ""
  if (use24Hour) return `${pad(h)}:${pad(m)}`
  const period = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${pad(h12)}:${pad(m)} ${period}`
}

function ScrollColumn({ items, selected, onSelect, ariaLabel }) {
  const ref = React.useRef(null)
  const selectedRef = React.useRef(null)

  React.useEffect(() => {
    if (selectedRef.current && ref.current) {
      selectedRef.current.scrollIntoView({ block: "center" })
    }
  }, [selected])

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={ariaLabel}
      className="h-48 w-14 overflow-y-auto rounded-md border bg-background py-1"
    >
      {items.map((it) => {
        const isActive = selected === it.value
        return (
          <button
            key={it.value}
            type="button"
            ref={isActive ? selectedRef : null}
            onClick={() => onSelect(it.value)}
            className={cn(
              "block w-full px-2 py-1 text-center text-sm transition-colors",
              "hover:bg-muted",
              isActive && "bg-veda-orange text-white hover:bg-veda-orange/90",
            )}
          >
            {it.label}
          </button>
        )
      })}
    </div>
  )
}

function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  className,
  disabled,
  use24Hour = true,
  minuteStep = 1,
  ...props
}) {
  const [open, setOpen] = React.useState(false)
  const { h, m } = parseTime(value)

  const hourItems = React.useMemo(() => {
    if (use24Hour) {
      return Array.from({ length: 24 }, (_, i) => ({ value: i, label: pad(i) }))
    }
    return Array.from({ length: 12 }, (_, i) => {
      const v = i + 1
      return { value: v, label: pad(v) }
    })
  }, [use24Hour])

  const minuteItems = React.useMemo(() => {
    const out = []
    for (let i = 0; i < 60; i += minuteStep) out.push({ value: i, label: pad(i) })
    return out
  }, [minuteStep])

  const period = h !== null && h >= 12 ? "PM" : "AM"
  const display24Hour = h !== null ? h : null
  const display12Hour = h !== null ? (h % 12 === 0 ? 12 : h % 12) : null

  function setHour(nextHour) {
    let next = nextHour
    if (!use24Hour) {
      const isPM = period === "PM"
      next = nextHour % 12 + (isPM ? 12 : 0)
    }
    onChange?.(`${pad(next)}:${pad(m ?? 0)}`)
  }

  function setMinute(nextMinute) {
    onChange?.(`${pad(h ?? 0)}:${pad(nextMinute)}`)
  }

  function setPeriod(nextPeriod) {
    if (h === null) {
      const base = nextPeriod === "PM" ? 12 : 0
      onChange?.(`${pad(base)}:${pad(m ?? 0)}`)
      return
    }
    const h12 = h % 12
    const next = nextPeriod === "PM" ? h12 + 12 : h12
    onChange?.(`${pad(next)}:${pad(m ?? 0)}`)
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="time-picker-trigger"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-left text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow]",
            "hover:bg-muted/30",
            "focus-visible:border-veda-orange focus-visible:ring-3 focus-visible:ring-veda-orange/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-muted-foreground",
            className,
          )}
          {...props}
        >
          <span className="truncate">{value ? formatDisplay(value, use24Hour) : placeholder}</span>
          <ClockIcon className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className={cn(
            "z-50 rounded-lg border bg-popover p-3 text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          )}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground">Select time</span>
            <span className="text-sm font-medium tabular-nums">
              {value ? formatDisplay(value, use24Hour) : "--:--"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <ScrollColumn
              items={hourItems}
              selected={use24Hour ? display24Hour : display12Hour}
              onSelect={setHour}
              ariaLabel="Hours"
            />
            <ScrollColumn
              items={minuteItems}
              selected={m}
              onSelect={setMinute}
              ariaLabel="Minutes"
            />
            {!use24Hour && (
              <div className="flex h-48 w-12 flex-col gap-1 rounded-md border bg-background p-1">
                {["AM", "PM"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={cn(
                      "flex-1 rounded text-sm transition-colors",
                      "hover:bg-muted",
                      period === p && h !== null && "bg-veda-orange text-white hover:bg-veda-orange/90",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { TimePicker }
