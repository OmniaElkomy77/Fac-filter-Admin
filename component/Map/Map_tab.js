import Map from "./Map"
import Trader_profile from "./Trader_profile";
import Traders_stats from "../Traders/Traders_stats";
import Previous_Orders from "../Traders/Previous_Orders"
import User_orders_details from "../Traders/User_orders_details";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
function Map_tab() {
    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Trader_profile" component={Trader_profile} />
            <Stack.Screen name="Traders_stats" component={Traders_stats} />
            <Stack.Screen name="Previous_Orders" component={Previous_Orders} />
            <Stack.Screen name="User_orders_details" component={User_orders_details} />
        </Stack.Navigator>
    );
}
export default Map_tab;