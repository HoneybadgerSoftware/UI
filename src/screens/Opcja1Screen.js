import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Opcja1Screen = () => {
    return (
        <View style={styles.container}>
            <Text>Opcja 1</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Opcja1Screen;
