/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Orders_and_production from "./component/Orders_and_production"
import Traders_tab from './component/Traders/Traders_tab';
import Map_tab from './component/Map/Map_tab';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createMaterialBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#f20404"

        barStyle={{ backgroundColor: '#fff' }} >
        <Tab.Screen name="المنتجات و الطلبات" component={Orders_and_production}
          options={{
            tabBarLabel: 'المنتجات و الطلبات',
            tabBarIcon: ({ focused }) => (
              <Icon name="fire" color={focused ? "#f20404" : "#777"} size={20} />
            ),
          }}

        />
        <Tab.Screen name="التٌجار" component={Traders_tab}
          options={{
            tabBarLabel: 'التُجار',
            tabBarIcon: ({ focused }) => (
              <Icon name="users" color={focused ? "#f20404" : "#777"} size={18} />
            ),
          }}

        />
        <Tab.Screen name="الخريطه" component={Map_tab}
          options={{
            tabBarLabel: 'الخريطه',

            tabBarIcon: ({ focused }) => (
              <Icon name="map" color={focused ? "#f20404" : "#777"} size={18} />
            ),
          }}

        />
      </Tab.Navigator>
    </NavigationContainer>

  );
}


export default App;
