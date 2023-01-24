export default function generateProgressPercentage(
    amount: number | string,
    completed: number | string
) {
    return Math.round((Number(completed) / Number(amount)) * 100)
}
