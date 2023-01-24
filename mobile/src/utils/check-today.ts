import dayjs from "dayjs"


export function checkToday(date: string | Date) {
    const today = dayjs().startOf("day").toDate()
    const isTodayHabit = dayjs(date).isSame(today)
    return {
        isTodayHabit
    }
}