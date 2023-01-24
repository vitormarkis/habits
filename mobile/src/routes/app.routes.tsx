import { createNativeStackNavigator } from "@react-navigation/native-stack"

const { Navigator, Screen } = createNativeStackNavigator()

import newH from "../screens/Habit"
import Home from "../screens/Home"
import New from "../screens/New"

function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name="home" component={Home} />
            <Screen name="new" component={New} />
            <Screen name="habit" component={newH} />
        </Navigator>
    )
}

export default AppRoutes
