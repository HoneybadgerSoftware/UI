import React from 'react';
import {createDrawerNavigator, DrawerToggleButton} from '@react-navigation/drawer';
import ProductsListScreen from '../screens/ProductsListScreen';
import CheckPriceScreen from '../screens/CheckPriceScreen';
import CartScreen from '../screens/CartScreen';

const Drawer = createDrawerNavigator();

function AppNavigator() {
    return (
        <Drawer.Navigator screenOptions={{
            drawerPosition: 'right',
            headerLeft: false,
            headerRight: () => <DrawerToggleButton/>,
        }}>
            <Drawer.Screen name="Home" component={ProductsListScreen}/>
            <Drawer.Screen name="Sprawdź cenę" component={CheckPriceScreen}/>
            <Drawer.Screen name="Mój koszyk" component={CartScreen}/>
        </Drawer.Navigator>
    );
}

export default AppNavigator;
