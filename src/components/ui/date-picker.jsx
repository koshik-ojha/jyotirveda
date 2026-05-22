"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function isSameDay(a, b) {
  return (
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDisplay(date) {
  if (!date) return ""
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function Calendar({ value, onChange, minDate, maxDate }) {
  const [viewDate, setViewDate] = React.useState(value || new Date())
  const [view, setView] = React.useState("days") // "days" | "months" | "years"
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const today = new Date()

  const minY = minDate ? minDate.getFullYear() : 1900
  const maxY = maxDate ? maxDate.getFullYear() : 2100

  const stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const isDayDisabled = (d) => {
    if (minDate && d < stripTime(minDate)) return true
    if (maxDate && d > stripTime(maxDate)) return true
    return false
  }
  const isMonthDisabled = (y, m) => {
    const last = new Date(y, m + 1, 0)
    const first = new Date(y, m, 1)
    if (maxDate && first > stripTime(maxDate)) return true
    if (minDate && last < stripTime(minDate)) return true
    return false
  }
  const isYearDisabled = (y) => y < minY || y > maxY

  const goPrev = () => {
    if (view === "days") setViewDate(new Date(year, month - 1, 1))
    else if (view === "months") setViewDate(new Date(year - 1, month, 1))
    else setViewDate(new Date(year - 12, month, 1))
  }
  const goNext = () => {
    if (view === "days") setViewDate(new Date(year, month + 1, 1))
    else if (view === "months") setViewDate(new Date(year + 1, month, 1))
    else setViewDate(new Date(year + 12, month, 1))
  }

  // ── DAYS VIEW ────────────────────────────────────────────────────────────
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  // ── YEARS VIEW: window of 12 years centred on current ────────────────────
  const yearWindowStart = year - 6
  const years = Array.from({ length: 12 }, (_, i) => yearWindowStart + i)

  const headerLabel =
    view === "days" ? `${MONTHS[month]} ${year}` :
    view === "months" ? `${year}` :
    `${years[0]} – ${years[years.length - 1]}`

  const headerNextView = view === "days" ? "months" : view === "months" ? "years" : "days"

  return (
    <div className="w-[260px] p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          className="inline-flex size-7 items-center justify-center rounded-md text-foreground hover:bg-muted"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setView(headerNextView)}
          className="rounded-md px-2 py-1 text-sm font-medium hover:bg-muted transition-colors"
        >
          {headerLabel}
        </button>
        <button
          type="button"
          onClick={goNext}
          className="inline-flex size-7 items-center justify-center rounded-md text-foreground hover:bg-muted"
          aria-label="Next"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      {view === "days" && (
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1 text-center text-[0.7rem] font-medium text-muted-foreground">{d}</div>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <div key={`e-${i}`} />
            const dayDate = new Date(year, month, d)
            const selected = isSameDay(dayDate, value)
            const todayMatch = isSameDay(dayDate, today)
            const disabled = isDayDisabled(dayDate)
            return (
              <button
                key={d}
                type="button"
                disabled={disabled}
                onClick={() => onChange?.(dayDate)}
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors",
                  "hover:bg-muted",
                  selected && "bg-veda-orange text-white hover:bg-veda-orange/90",
                  !selected && todayMatch && "ring-1 ring-veda-orange",
                  disabled && "pointer-events-none opacity-40",
                )}
              >
                {d}
              </button>
            )
          })}
        </div>
      )}

      {view === "months" && (
        <div className="grid grid-cols-3 gap-2 py-1">
          {MONTHS.map((m, i) => {
            const selected = value && value.getFullYear() === year && value.getMonth() === i
            const disabled = isMonthDisabled(year, i)
            return (
              <button
                key={m}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setViewDate(new Date(year, i, 1))
                  setView("days")
                }}
                className={cn(
                  "py-2 rounded-md text-sm transition-colors hover:bg-muted",
                  selected && "bg-veda-orange text-white hover:bg-veda-orange/90",
                  disabled && "pointer-events-none opacity-40",
                )}
              >
                {m.slice(0, 3)}
              </button>
            )
          })}
        </div>
      )}

      {view === "years" && (
        <div className="grid grid-cols-3 gap-2 py-1">
          {years.map((y) => {
            const selected = value && value.getFullYear() === y
            const disabled = isYearDisabled(y)
            return (
              <button
                key={y}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setViewDate(new Date(y, month, 1))
                  setView("months")
                }}
                className={cn(
                  "py-2 rounded-md text-sm transition-colors hover:bg-muted",
                  selected && "bg-veda-orange text-white hover:bg-veda-orange/90",
                  disabled && "pointer-events-none opacity-40",
                )}
              >
                {y}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled,
  minDate,
  maxDate,
  ...props
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="date-picker-trigger"
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
          <span className="truncate">{value ? formatDisplay(value) : placeholder}</span>
          <CalendarIcon className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className={cn(
            "z-50 rounded-lg border bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          )}
        >
          <Calendar
            value={value}
            onChange={(d) => {
              onChange?.(d)
              setOpen(false)
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { DatePicker, Calendar }
