import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay, HabitDayPlaceholder } from "./HabitDay"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const summaryDays = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDays.length

function SummaryTable() {
  return (
    <div className="flex w-full">
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

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDays.map((summaryDay) => (
          <HabitDay key={summaryDay.toString()} />
        ))}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <HabitDayPlaceholder key={i} />
          ))}
      </div>
    </div>
  )
}

export default SummaryTable
