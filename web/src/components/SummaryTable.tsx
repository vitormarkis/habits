import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../libs/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay, HabitDayPlaceholder } from "./HabitDay"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = {
  id: string
  date: string
  amount: string
  completed: string
}

function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([])

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data)
    })
  }, [])

  return (
    <div className="flex w-full">
      {/* Dia da semana! */}
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, idx) => (
          <div
            key={`${weekDay}-${idx}`}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      {/* Summary days coloridos! */}
      <div className="grid grid-rows-7 grid-flow-col gap-3 text-white">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find(day => (
            dayjs(date).isSame(day.date, 'day')
          ))
          
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {/* Summary days SEM COR! */}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <HabitDayPlaceholder key={i} />
          ))}
      </div>
    </div>
  )
}

export default SummaryTable
