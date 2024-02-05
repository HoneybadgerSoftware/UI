import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppNavigator from "./src/navigation/AppNavigator";
import {CartProvider} from './src/context/CartContext';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <CartProvider>
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>

        </CartProvider>
    );
};

export default App;
