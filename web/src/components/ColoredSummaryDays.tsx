import dayjs from "dayjs"
import { HabitDay } from "./HabitDay"
import { SummaryProps } from "./SummaryTable"

interface ColoredSummaryDaysProps {
  summary_dates: Date[]
  summary_api_data: SummaryProps[]
}

export default function ColoredSummaryDays({
  summary_dates,
  summary_api_data,
}: ColoredSummaryDaysProps) {
  return (
    <>
      {summary_dates.map((date) => {
        const dayInSummary = summary_api_data.find((day) =>
          dayjs(date).isSame(day.date, "day")
        )
        return (
          <HabitDay
            key={date.toString()}
            date={date}
            amount={Number(dayInSummary?.amount)}
            completed={Number(dayInSummary?.completed)}
          />
        )
      })}
    </>
  )
}
