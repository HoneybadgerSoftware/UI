import React from 'react';
import {createDrawerNavigator, DrawerToggleButton} from '@react-navigation/drawer';
import ProductsListScreen from '../screens/ProductsListScreen';
import Opcja1Screen from '../screens/Opcja1Screen';
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
            <Drawer.Screen name="Opcja 1" component={Opcja1Screen}/>
            <Drawer.Screen name="Mój koszyk" component={CartScreen}/>
            {/*<Drawer.Screen name="Opcja 3" component={Opcja3Screen} />*/}
            {/*<Drawer.Screen name="Opcja 4" component={Opcja4Screen} />*/}
        </Drawer.Navigator>
    );
}

export default AppNavigator;
