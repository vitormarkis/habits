export default function generateProgressPercentage(
  amount: number,
  completed: number
) {
  return Math.round((completed / amount) * 100);
}
