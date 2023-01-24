import { Feather } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import clsx from "clsx"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native"
import colors from "tailwindcss/colors"
import BackButton from "../components/BackButton"
import Checkbox from "../components/Checkbox"
import Loading from "../components/Loading"
import ProgressBar from "../components/ProgressBar"
import { api } from "../libs/axios"
import { checkToday } from "../utils/check-today"

import generateProgressPercentage from "../utils/generate-progress-percentage"

// export type DayInfoProps = {
//     id: string
//     date: string
//     amount: string
//     completed: string
// }

interface DayInfoProps {
    possibleHabits: {
        id: string
        name: string
        created_at: string
    }[]
    completedHabits: string[]
}

interface Params {
    date: string
}

function Habit() {
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps>()
    const [completedHabits, setCompletedHabits] = useState<string[]>([])
    const [touchPastHabitsToggle, setTouchPastHabitsToggle] = useState("")
    const { navigate } = useNavigation()

    const route = useRoute()
    const { date } = route.params as Params

    const { isTodayHabit } = checkToday(date)
    const parsedData = dayjs(date)
    const dayOfWeek = parsedData.format("dddd")
    const dayAndMonth = parsedData.format("DD/MM")
    const isDateInPast = parsedData.endOf("day").isBefore(new Date())

    const progressState = dayInfo?.possibleHabits.length
        ? generateProgressPercentage(
              dayInfo.possibleHabits.length,
              completedHabits.length
          )
        : 0

    async function fetchHabitsData() {
        try {
            setLoading(true)
            const response = await api.get("day", { params: { date } })
            console.log(date)
            const dayInfoObject: DayInfoProps = response.data
            setDayInfo(dayInfoObject)
            setCompletedHabits(dayInfoObject.completedHabits)
        } catch (error) {
            console.log(error)
            Alert.alert("Não foi possível carregar as informações dos hábitos.")
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleCompletHabit(habitId: string) {
        try {
            api.patch(`/habits/${habitId}/toggle`)
            if (completedHabits.includes(habitId)) {
                setCompletedHabits((completedHabits) =>
                    completedHabits.filter((habit) => habit !== habitId)
                )
            } else {
                setCompletedHabits((completedHabits) => [
                    ...completedHabits,
                    habitId,
                ])
            }
        } catch (error) {
            Alert.alert("Ops", "Não foi possível atualizar o status do hábito.")
            console.log(error)
        }
    }

    function handleOnPressCheckbox(habitID: string) {
        if (isDateInPast) {
            console.log("chegou aqui")
            setTouchPastHabitsToggle(
                "Você não pode editar hábitos de dias anteriores a hoje."
            )
            return
        }
        handleToggleCompletHabit(habitID)
    }

    useEffect(() => {
        fetchHabitsData()
    }, [])

    useEffect(() => {
        console.log(dayInfo?.possibleHabits.length === 0)
    }, [completedHabits])

    if (loading) {
        return <Loading />
    }

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

                <ProgressBar progress={progressState} />

                <View
                    className={clsx("mt-6", {
                        "opacity-50": isDateInPast,
                    })}
                >
                    {dayInfo?.possibleHabits ? (
                        dayInfo?.possibleHabits.map((habit, idx) => {
                            console.log(habit.id)
                            console.log(completedHabits)
                            return (
                                <Checkbox
                                key={`${habit}-${idx}`}
                                title={habit.name}
                                checked={completedHabits.includes(habit.id)}
                                onPress={() => handleOnPressCheckbox(habit.id)}
                            />
                            )
                        })
                    ) : (
                        <Text className="text-zinc-500 text-base">
                            Você não possui hábitos registrados nesse dia
                        </Text>
                    )}
                </View>
                {isTodayHabit && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row h-11 pr-4 rounded-lg items-center "
                        onPress={() => navigate("new")}
                    >
                        <Feather
                            name="plus"
                            color={colors.blue[200]}
                            size={20}
                        />
                        <Text className="text-white font-light italic ml-3 font-semibold text-base">
                            Novo
                        </Text>
                    </TouchableOpacity>
                )}
                {isDateInPast && dayInfo?.possibleHabits.length !== 0 && (
                    <Text className="text-white text-base mt-3">
                        {touchPastHabitsToggle}
                    </Text>
                )}
            </ScrollView>
        </View>
    )
}

export default Habit
