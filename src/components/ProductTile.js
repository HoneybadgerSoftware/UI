import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCart} from '../context/CartContext';
import {useNavigation} from '@react-navigation/native';


const ProductTile = ({product}) => {
    const navigation = useNavigation();
    const {addToCart} = useCart();


    return (
        <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate('ProductDetails', {product})}
        >
            <Image source={{uri: product.image}} style={styles.image}/>
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{`${product.price} zł`}</Text>

                <TouchableOpacity onPress={() => addToCart(product)}>
                    <Text style={styles.addToCart}>Dodaj do koszyka</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        elevation: 3, // cień dla Android
        shadowOpacity: 0.3, // cień dla iOS
    },
    image: {
        width: '33%',
        height: 100,
        marginRight: 10,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
    },
    addToCart: {
        fontSize: 14,
        color: 'blue',
    },
});

export default ProductTile;
