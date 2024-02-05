import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{`${product.price} zł`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
    },
});

export default ProductDetailsScreen;
