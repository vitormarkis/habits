import { useEffect, useState } from "react"
import { api } from "../libs/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import ColoredSummaryDays from "./ColoredSummaryDays"
import { SummaryDaysContainer } from "./SummaryDaysContainer"
import { UncoloredSummaryDays } from "./UncoloredSummaryDays"
import { WeekDaysIndicator } from "./WeekDaysIndicator"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export type SummaryProps = {
  id: string
  date: string
  amount: string
  completed: string
}

function SummaryTable() {
  const [summaryAPIData, setSummaryAPIData] = useState<SummaryProps[]>([])

  useEffect(() => {
    api.get("summary")
    .then((response) => setSummaryAPIData(response.data) )
  }, [])

  return (
    <div className="flex w-full">
      <WeekDaysIndicator letters={weekDays} />

      {summaryAPIData.length > 0 && (
        <SummaryDaysContainer>
          <ColoredSummaryDays
            summary_api_data={summaryAPIData}
            summary_dates={summaryDates}
          />
          <UncoloredSummaryDays amount={amountOfDaysToFill} />
        </SummaryDaysContainer>
      )}
    </div>
  )
}

export default SummaryTable
