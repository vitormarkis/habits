import clsx from "clsx"
import {
    Dimensions,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native"
import { checkToday } from "../utils/check-today"
import generateProgressPercentage from "../utils/generate-progress-percentage"

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5
export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
    Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number | string
    completed?: number | string

    date: Date
}

export function HabitDay({
    amountOfHabits = 0,
    completed = 0,
    date,
    ...rest
}: Props) {
    // completed amount percentage
    const c_a_Percentage =
        amountOfHabits > 0
            ? generateProgressPercentage(amountOfHabits, completed)
            : 0

    const { isTodayHabit } = checkToday(date)

    return (
        <TouchableOpacity
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"]: c_a_Percentage === 0,
                ["bg-violet-900 border-violet-700"]:
                    c_a_Percentage > 0 && c_a_Percentage < 20,
                ["bg-violet-800 border-violet-600"]:
                    c_a_Percentage >= 20 && c_a_Percentage < 40,
                ["bg-violet-700 border-violet-500"]:
                    c_a_Percentage >= 40 && c_a_Percentage < 60,
                ["bg-violet-600 border-violet-500"]:
                    c_a_Percentage >= 60 && c_a_Percentage < 80,
                ["bg-violet-500 border-violet-400"]: c_a_Percentage >= 80,
                ["border-white"]: isTodayHabit,
            })}
            style={{
                width: DAY_SIZE,
                height: DAY_SIZE,
            }}
            activeOpacity={0.7}
            {...rest}
        />
    )
}

export function HabitDayPlaceholder() {
    return (
        <TouchableOpacity
            className="bg-zinc-900/50 rounded-lg border-2 m-1 border-zinc-900"
            style={{
                width: DAY_SIZE,
                height: DAY_SIZE,
            }}
            activeOpacity={1}
        />
    )
}
