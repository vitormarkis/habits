import { createContext, useContext, useState } from "react"

interface AmountContextProps {
  amount: number
  setAmount: React.Dispatch<React.SetStateAction<number>>
}

const AmountContext = createContext<AmountContextProps>({
  amount: 0,
  setAmount: () => {},
})

export function AmountProvider({ children }) {
  const [amount, setAmount] = useState(0)

  return (
    <AmountContext.Provider value={{ amount, setAmount }}>
      {children}
    </AmountContext.Provider>
  )
}

export const useAmount = () => useContext(AmountContext)
