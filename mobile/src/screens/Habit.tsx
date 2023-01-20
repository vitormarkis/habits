import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { ScrollView, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Checkbox from '../components/Checkbox';
import ProgressBar from '../components/ProgressBar';

interface Params {
  date: string;
}

function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedData = dayjs(date);
  const dayOfWeek = parsedData.format('dddd');
  const dayAndMonth = parsedData.format('DD/MM');

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl lowercase">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={60} />

        <View className="mt-6">
          <Checkbox title="Comer barra de chocolate" checked />
          <Checkbox title="Tomar refrigerante" />
          <Checkbox title="Comer doritos" />
        </View>
      </ScrollView>
    </View>
  );
}

export default Habit;
