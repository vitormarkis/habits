import * as Checkbox from "@radix-ui/react-checkbox"
import dayjs from "dayjs"
import Check from "phosphor-react/src/icons/Check"
import { useEffect, useState } from "react"
import { api } from "../libs/axios"

interface HabitDayListProps {
  date: Date
  onCheckHabit: (completed: number, amount: number) => void
}

interface ListHabitProps {
  possibleHabits: {
    id: string
    name: string
    created_at: string
  }[]
  completedHabits: string[]
}

export function HabitsDayList({ date, onCheckHabit }: HabitDayListProps) {
  const [habitList, setHabitList] = useState<ListHabitProps>()

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitList(response.data))
  }, [])

  async function handleToggleHabit(habit_id: string) {
    await api.patch(`/habits/${habit_id}/toggle`)

    const isHabitAlreadyCompleted =
      habitList!.completedHabits.includes(habit_id)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitList!.completedHabits.filter(
        (id) => id !== habit_id
      )
    } else {
      completedHabits = [...habitList!.completedHabits, habit_id]
    }

    setHabitList({
      possibleHabits: habitList!.possibleHabits,
      completedHabits,
    })

    onCheckHabit(completedHabits.length, habitList!.possibleHabits.length)
  }

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitList?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitList.completedHabits.includes(habit.id)}
          // disabled={isDateInPast}
          className="flex items-center gap-3 group"
        >
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
            group-data-[state=checked]:text-zinc-500
            "
          >
            {habit.name}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  )
}
