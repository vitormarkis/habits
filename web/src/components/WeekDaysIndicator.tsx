interface WeekDaysIndicatorProps {
  letters: string[]
}

export function WeekDaysIndicator({
  letters,
}: WeekDaysIndicatorProps) {
  return (
    <div className="grid grid-rows-7 grid-flow-row gap-3">
      {letters.map((letter, idx) => (
        <div
          key={`${letter}-${idx}`}
          className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
        >
          {letter}
        </div>
      ))}
    </div>
  )
}
