import Traders from "./Traders"
import Traders_stats from "./Traders_stats"
import Search_product from "./Search_product"
import Previous_Orders from "./Previous_Orders";
import User_orders_details from "./User_orders_details"
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
function Traders_tab() {
    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Traders" component={Traders} />
            <Stack.Screen name="Traders_stats" component={Traders_stats} />
            <Stack.Screen name="Search_product" component={Search_product} />
            <Stack.Screen name="Previous_Orders" component={Previous_Orders} />
            <Stack.Screen name="User_orders_details" component={User_orders_details} />
        </Stack.Navigator>
    );
}
export default Traders_tab;