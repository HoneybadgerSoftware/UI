// src/components/CustomHeader.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={'../assets/adaptive-icon.png'}
                style={styles.logo}
            />
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image
                    source={'../assets/adaptive-icon.png'}
                    style={styles.menuIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100, // Dostosuj wysokość
        paddingHorizontal: 10,
    },
    logo: {
        // Stylizacja logo
        width: 50, // Przykładowa szerokość
        height: 50, // Przykładowa wysokość
        resizeMode: 'contain',
    },
    menuIcon: {
        // Stylizacja ikony menu
        width: 30, // Przykładowa szerokość
        height: 30, // Przykładowa wysokość
    },
});

export default CustomHeader;
