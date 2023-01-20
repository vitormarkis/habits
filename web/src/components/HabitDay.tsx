import * as Checkbox from "@radix-ui/react-checkbox"
import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"
import dayjs from "dayjs"
import Check from "phosphor-react/src/icons/Check"
import ProgressBar from "./ProgressBar"

interface HabitDayProps {
  date: Date
  completed?: number
  amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const completedRate = amount > 0 ? Math.round((completed / amount) * 100) : 0
  const dayAndMonth = dayjs(date).format("DD/MM")
  const weekDayString = dayjs(date).format("dddd")

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("border-2 border-zinc-800 h-10 w-10 rounded-lg", {
          "bg-zinc-900 border-zinc-800": completedRate === 0,
          "bg-violet-900 border-violet-800":
            completedRate > 0 && completedRate < 20,
          "bg-violet-800 border-violet-700":
            completedRate >= 20 && completedRate < 40,
          "bg-violet-700 border-violet-600":
            completedRate >= 40 && completedRate < 60,
          "bg-violet-600 border-violet-500":
            completedRate >= 60 && completedRate < 80,
          "bg-violet-500 border-violet-400": completedRate >= 80,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{weekDayString}</span>
          <span className="text-white mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedRate} />

          <div className="mt-6 flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div
                className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg flex items-center justify-center
            group-data-[state=checked]:bg-green-600
            group-data-[state=checked]:border-green-600
            "
              >
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span
                className="
            text-white font-semibold text-xl leading-tight
            group-data-[state=checked]:line-through
            group-data-[state=checked]:text-zinc-4g00
            "
              >
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export function HabitDayPlaceholder() {
  return (
    <div className="border-2 border-zinc-900 h-10 w-10 rounded-lg opacity-70 cursor-not-allowed"></div>
  )
}
