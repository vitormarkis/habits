import { ScrollView, Text, View } from 'react-native';
import { DAY_SIZE, Habit, HabitPlaceholder } from '../components/Habit';
import Header from '../components/Header';

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';

const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumHabitsPlaceholder = 10 * 7;
const amountOfDaysToFill =
  minimumHabitsPlaceholder - datesFromYearBeginning.length;

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function Home() {
  return (
    <View className="bg-background flex-1 px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, idx) => (
          <Text
            key={`${weekDay}-${idx}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex flex-wrap flex-row">
          {datesFromYearBeginning.map(date => (
            <Habit key={date.toISOString()} />
          ))}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, idx) => (
              <HabitPlaceholder key={idx} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;