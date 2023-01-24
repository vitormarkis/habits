import { createContext, useState } from "react"
import Header from "./components/Header"
import SummaryTable from "./components/SummaryTable"
import { AmountProvider } from "./contexts/amount"
import "./index.css"
import "./libs/dayjs"

interface AmountContextProps {
  amountRate: number
  setAmountRate: React.Dispatch<React.SetStateAction<number>>
}

export const AmountContext = createContext<AmountContextProps>({
  amountRate: 0,
  setAmountRate: () => {},
})

function App() {
  const [amountRate, setAmountRate] = useState(0)

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-main_dark text-white">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <AmountProvider>
          <AmountContext.Provider value={{ amountRate, setAmountRate }}>
            <Header />
            <SummaryTable />
          </AmountContext.Provider>
        </AmountProvider>
      </div>
    </div>
  )
}

export default App
