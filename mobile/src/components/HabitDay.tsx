import clsx from 'clsx';
import dayjs from 'dayjs';
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import generateProgressPercentage from '../utils/generate-progress-percentage';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  completed?: number;

  date: Date;
}

export function HabitDay({
  amountOfHabits = 0,
  completed = 0,
  date,
  ...rest
}: Props) {
  // amounted completed percentage
  const a_c_Percentage =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, completed)
      : 0;

      const today = dayjs().startOf('day').toDate()
      const isCurrentDay = dayjs(date).isSame(today)
      
  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"]: a_c_Percentage === 0,
        ["bg-violet-900 border-violet-700"]: a_c_Percentage > 0 && a_c_Percentage < 20,
        ["bg-violet-800 border-violet-600"]: a_c_Percentage >= 20 && a_c_Percentage < 40,
        ["bg-violet-700 border-violet-500"]: a_c_Percentage >= 40 && a_c_Percentage < 60,
        ["bg-violet-600 border-violet-500"]: a_c_Percentage >= 60 && a_c_Percentage < 80,
        ["bg-violet-500 border-violet-400"]: a_c_Percentage >= 80,
        ["border-white"]: isCurrentDay,
      })}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE,
      }}
      activeOpacity={0.7}
      {...rest}
    />
  );
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
  );
}
