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
        height: 100,
        paddingHorizontal: 10,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
});

export default CustomHeader;
