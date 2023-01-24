import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"
import dayjs from "dayjs"
import { useContext, useState } from "react"
import { AmountContext } from "../App"
import { HabitsDayList } from "./HabitsDayList"
import ProgressBar from "./ProgressBar"
import Text from "./Text"


interface HabitDayProps {
  date: Date
  completed?: number
  amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const [completedRate, setCompletedRate] = useState<number>(completed)
  const { amountRate, setAmountRate } = useContext(AmountContext)

  function handleCompletedHabits(
    updated_completed: number,
    updated_amount: number
  ) {
    setCompletedRate(updated_completed)
    setAmountRate(updated_amount)
  }

  const new_completed_value =
    amount > 0 ? Math.round((completedRate / amountRate) * 100) : 0

  const dayAndMonth = dayjs(date).format("DD/MM")
  const weekDayString = dayjs(date).format("dddd")

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "border-2 border-zinc-800 h-10 w-10 rounded-lg transition-colors",
          {
            "bg-zinc-900 border-zinc-800": new_completed_value === 0,
            "bg-violet-900 border-violet-800":
              new_completed_value > 0 && new_completed_value < 20,
            "bg-violet-800 border-violet-700":
              new_completed_value >= 20 && new_completed_value < 40,
            "bg-violet-700 border-violet-600":
              new_completed_value >= 40 && new_completed_value < 60,
            "bg-violet-600 border-violet-500":
              new_completed_value >= 60 && new_completed_value < 80,
            "bg-violet-500 border-violet-400": new_completed_value >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <Text color="zinc" size="medium" weight="semibold">
            {weekDayString}
          </Text>
          <Text color="white" size="big" weight="extrabold">
            {dayAndMonth}
          </Text>

          <ProgressBar progress={new_completed_value} />
          <HabitsDayList date={date} onCheckHabit={handleCompletedHabits} />
          <Popover.Arrow height={8} width={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
    // </AmountContext.Provider>
  )
}

export function HabitDayPlaceholder() {
  return (
    <div className="border-2 border-zinc-900 h-10 w-10 rounded-lg opacity-70 cursor-not-allowed"></div>
  )
}
