import { HabitDayPlaceholder } from "./HabitDay"

interface UncoloredSummaryDaysProps {
  amount: number
}

export function UncoloredSummaryDays({ amount }: UncoloredSummaryDaysProps) {
  return (
    <>
      {amount > 0 &&
        Array.from({ length: amount }).map((_, i) => (
          <HabitDayPlaceholder key={i} />
        ))}
    </>
  )
}
