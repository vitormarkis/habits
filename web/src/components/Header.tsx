import Plus from "../../node_modules/phosphor-react/src/icons/Plus"
import Logo from "../assets/logo.svg"

function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={Logo} alt="" />
      <button
        type="button"
        className="font-bold p-3 rounded-2xl border border-violet-600 flex items-center gap-3 hover:border-violet-300"
      >
        <Plus className="text-violet-600" weight="bold" />
        Adicionar novo hábito
      </button>
    </div>
  )
}

export default Header