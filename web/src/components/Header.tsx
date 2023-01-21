import * as Dialog from "@radix-ui/react-dialog"
import Plus from "../../node_modules/phosphor-react/src/icons/Plus"
import X from "../../node_modules/phosphor-react/src/icons/X"

import Logo from "../assets/logo.svg"
import NewHabitForm from "./NewHabitForm"
import Text from "./Text"

function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={Logo} alt="" />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="font-bold p-3 rounded-2xl border border-violet-600 flex items-center gap-3 hover:border-violet-300"
        >
          <Plus className="text-violet-600" weight="bold" />
          <Text color="white" size="medium" weight="semibold">Adicionar novo hábito</Text>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="h-screen w-screen fixed bg-black/50 inset-0" />
          <Dialog.Content className="text-white absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute top-6 right-6 text-zinc-400">
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>
            <Dialog.Title>
              <Text color="white" size="big" weight="extrabold">
                Criar hábito
              </Text>
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default Header
