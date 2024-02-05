import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
    const { cart, removeFromCart } = useContext(CartContext);

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemText}>{item.name} - {item.quantity} x ${item.price}</Text>
                        <Button title="Usuń" onPress={() => removeFromCart(item.id)} />
                    </View>
                )}
            />
            <Text style={styles.total}>Total: ${getTotalPrice()}</Text>
            <Button title="Przejdź do płatności" onPress={() => navigation.navigate('PaymentScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    itemText: {
        fontSize: 18,
    },
    total: {
        fontSize: 24,
        marginVertical: 20,
    },
});

export default CartScreen;
