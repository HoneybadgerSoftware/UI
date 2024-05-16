import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// import { CartContext } from '../context/CartContext';
import * as Location from 'expo-location';
import axios from 'axios';

const CheckPriceScreen = () => {
    // const { cart } = useContext(CartContext);
    const [shareLocation, setShareLocation] = useState(false);
    const [radius, setRadius] = useState('');
    const [location, setLocation] = useState(null);
    const [shopData, setShopData] = useState(null);

    const handleShareLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: parseFloat(location.coords.latitude.toFixed(6)),
            longitude: parseFloat(location.coords.longitude.toFixed(6))
        });
    };

    const handleCheckPrice = async () => {
        if (shareLocation && location) {
            const response = await axios.post('http://products-dns-dvdvmxy4.hcp.polandcentral.azmk8s.io/location', {
                latitude: location.latitude,
                longitude: location.longitude,
                radius: parseInt(radius)
            });

            const shops = response.data.data;

            const availabilityResponse = await axios.post('http://products-dns-dvdvmxy4.hcp.polandcentral.azmk8s.io/availability/check', {
                productIds: cart.map(item => item.id),
                shopIds: shops.map(shop => shop.id)
            });

            setShopData(availabilityResponse.data.data);
        } else {
            const availabilityResponse = await axios.post('http://products-dns-dvdvmxy4.hcp.polandcentral.azmk8s.io/availability/check', {
                productIds: cart.map(item => item.id),
                shopIds: []
            });

            setShopData(availabilityResponse.data.data);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Udostępnij lokalizację" onPress={handleShareLocation} />
            <TextInput
                style={styles.input}
                placeholder="Promień wyszukiwania w metrach"
                value={radius}
                onChangeText={setRadius}
                keyboardType="numeric"
            />
            <Button title="Sprawdź dostępność i ceny" onPress={handleCheckPrice} />
            {shopData && shopData.length > 0 ? (
                <FlatList
                    data={shopData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.itemText}>Nazwa sklepu: {item.name} - Cena całkowita: {item.totalPriceOfProducts}</Text>
                            <FlatList
                                data={item.productsPrices}
                                keyExtractor={product => product.productId.toString()}
                                renderItem={({ product }) => {
                                    const cartProduct = cart.find(cartItem => cartItem.id === product.productId);
                                    return (
                                        <Text style={styles.itemText}>Produkt: {cartProduct ? cartProduct.name : 'Nieznana'} - Cena: {product.price}</Text>
                                    );
                                }}
                            />
                        </View>
                    )}
                />
            ) : (
                <Text>Obecnie nie możemy znaleźć sklepów, w których kupisz wszystkie produkty wpisane przez Ciebie na listę</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    itemText: {
        fontSize: 18,
    },
});

export default CheckPriceScreen;