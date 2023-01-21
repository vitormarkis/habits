import * as Checkbox from "@radix-ui/react-checkbox"
import { FormEvent, useState } from "react"
import Check from "../../node_modules/phosphor-react/src/icons/Check"
import { api } from "../libs/axios"
import Text from "./Text"

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

function NewHabitForm() {
  const [name, setName] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!name || weekDays.length === 0) {
      return
    }

    const newHabitObject = {
      name,
      weekDays,
    }

    await api.post("habits", newHabitObject)
    setName("")
    setWeekDays([])
  }

  const toggleWeekDay = (index: number) => {
    if (weekDays.includes(index)) {
      const updatedWeekDays = weekDays.filter((weekDay) => weekDay !== index)
      setWeekDays(updatedWeekDays)
    } else {
      setWeekDays((prevState) => [...prevState, index])
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        <Text weight="semibold" size="medium">
          Criar hábito
        </Text>
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex: exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        <Text weight="semibold" size="medium">
          Qual a recorrência?
        </Text>
      </label>

      {availableWeekDays.map((weekDay, index) => (
        <div className="mt-3 flex-col gap-3">
          <Checkbox.Root
            onCheckedChange={() => toggleWeekDay(index)}
            key={weekDay}
            checked={weekDays.includes(index)}
            className="flex items-center gap-3 group"
          >
            <div
              className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg flex items-center justify-center
            group-data-[state=checked]:bg-green-600
            group-data-[state=checked]:border-green-600
            "
            >
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span
              className="
            text-white leading-tight
            "
            >
              {weekDay}
            </span>
          </Checkbox.Root>
        </div>
      ))}

      <button
        type="submit"
        className="mt-6 rounded-lg flex items-center justify-center gap-3 font-semibold bg-green-600 p-4 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}

export default NewHabitForm
