import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import colors from "tailwindcss/colors"
import BackButton from "../components/BackButton"
import Checkbox from "../components/Checkbox"
import { api } from "../libs/axios"

const availableWeekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function New() {
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [name, setName] = useState<string>("")
    const { navigate } = useNavigation()

    function handleToggleWeekDays(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays((prevState) =>
                prevState.filter(
                    (actualActiveDay) => actualActiveDay !== weekDayIndex
                )
            )
        } else {
            setWeekDays((prevState) => [...prevState, weekDayIndex])
        }
    }

    const createNewHabitObject = () => ({ name, weekDays })
    const checkNullishInputs = {
        name: () => {
            if (name.trim() === "") {
                Alert.alert("Novo hábito", "Insira o nome do novo hábito")
                return true
            }
            return false
        },
        weekDays: () => {
            if (weekDays.length === 0) {
                Alert.alert(
                    "Novo hábito",
                    "Insira os dias que você realizará os novo hábitos"
                )
                return true
            }
            return false
        },
    }
    const isNullishDataValue = () =>
        checkNullishInputs.name() || checkNullishInputs.weekDays()

    async function handleSubmitNewHabit() {
        try {
            if (isNullishDataValue()) return
            const new_habit_object = createNewHabitObject()
            setName("")
            setWeekDays([])
            console.log(new_habit_object)
            await api.post("habits", new_habit_object)
            Alert.alert("Novo hábito", "Novo hábito registrado")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 60 }}
                showsVerticalScrollIndicator={false}
            >
                <BackButton />
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>
                <Text className="mt-6 text-white font-semibold text-base">
                    Qual o seu compromentimento?
                </Text>

                <TextInput
                    className="text-white h-12 pl-4 rounded-lg mt-3 bg-zinc-800 focus:border-2 border-violet-600 border focus:border-violet-4 00"
                    placeholder="Exercícios, dormir bem, etc.."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setName}
                    value={name}
                />

                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrência?
                </Text>

                {availableWeekDays.map((weekDay, index) => (
                    <Checkbox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => handleToggleWeekDays(index)}
                    />
                ))}

                {/* BOTÃO DE CONFIRMAR */}
                <TouchableOpacity
                    className="flex-row max-w-3 justify-center items-center mt-6 h-14 rounded-lg bg-violet-600"
                    activeOpacity={0.7}
                    onPress={handleSubmitNewHabit}
                >
                    <Feather name="check" size={20} color={colors.white} />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default New
