import Select_order_or_product from "./Select_order_or_product "
import Orders from "./Orders"
import NewOrders from './Orders_Type/NewOrders';
import Finished_Orders from "./Orders_Type/Finished_Orders"
import Pending_Orders from "./Orders_Type/Pending_Orders"
import Orders_details from './Orders_Type/Orders_details';
import Rejected_Orders from "./Orders_Type/Rejected_Orders"
import The_way_Orders from "./Orders_Type/The_way_Orders"
import Products from "./Products";
// import Loading from "./Orders_Type/loading"
import MyLoader from "./Orders_Type/loading";
import Myloading from "./Orders_Type/loading2";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Products_search from "./Product_search";
const Stack = createStackNavigator();
function Orders_and_production() {
    return (

        <Stack.Navigator

            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Group>
                <Stack.Screen name="Select_order_or_product" component={Select_order_or_product} />
                <Stack.Screen name="Orders" component={Orders} />
                <Stack.Screen name="NewOrders" component={NewOrders} />
                <Stack.Screen name="Finished_Orders" component={Finished_Orders} />
                <Stack.Screen name="Pending_Orders" component={Pending_Orders} />
                <Stack.Screen name="The_way_Orders" component={The_way_Orders} />
                <Stack.Screen name="Rejected_Orders" component={Rejected_Orders} />
                <Stack.Screen name="Orders_details" component={Orders_details} />
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen name="MyLoader" component={MyLoader} />
                <Stack.Screen name="Myloading" component={Myloading} />
                {/* <Stack.Screen name="Products_search" component={Products_search} /> */}

            </Stack.Group>
        </Stack.Navigator>

    );
}
export default Orders_and_production;