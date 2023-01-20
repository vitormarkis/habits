import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import {
  DAY_SIZE,
  HabitDay,
  HabitDayPlaceholder,
} from '../components/HabitDay';
import Header from '../components/Header';
import Loading from '../components/Loading';

import { api } from '../libs/axios';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';

const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumHabitsPlaceholder = 10 * 7;
const amountOfDaysToFill =
  minimumHabitsPlaceholder - datesFromYearBeginning.length;

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type SummaryProps = {
  id: string;
  date: string;
  amount: string;
  completed: string;
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps[] | null>([]);

  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('summary');
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="bg-background flex-1 px-8 pt-16">
      <Header />

      {/* Letreiro, dias da semana */}
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

      {/* Summary Days */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex flex-wrap flex-row">
            {/* Dia Ativo */}
            {datesFromYearBeginning.map(date => {
              const dayWithHabits = summary.find(day => {
                return dayjs(date).isSame(day.date, 'day');
              });

              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  completed={dayWithHabits?.completed}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                />
              );
            })}

            {/* Dia Inativo */}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, idx) => (
                <HabitDayPlaceholder key={idx} />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Home;
