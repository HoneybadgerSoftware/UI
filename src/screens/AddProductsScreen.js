import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddProductsScreen = () => {
    const [shopName, setShopName] = useState('');
    const [shopId, setShopId] = useState(null);
    const [product, setProduct] = useState({ name: '', manufacturer: '', description: '', price: '', imageUrl: '' });
    const [products, setProducts] = useState([]);

    const addProduct = () => {
        setProducts([...products, product]);
        setProduct({ name: '', manufacturer: '', description: '', price: '', imageUrl: '' });
    };

    const synchronizeProducts = async () => {
        try {
            const response = await axios.get('http://products-dns-dvdvmxy4.hcp.polandcentral.azmk8s.io/location', { params: { name: shopName } });
setShopId(response.data.shopId);

const syncResponse = await axios.post('http://products-dns-dvdvmxy4.hcp.polandcentral.azmk8s.io/synchronizeProducts', {
    shopId: response.data.shopId,
    data: products
});

console.log(syncResponse.data);
} catch (error) {
    console.error(error);
}
};

return (
    <View style={styles.container}>
        <TextInput placeholder="Nazwa sklepu" value={shopName} onChangeText={setShopName} />
        <TextInput placeholder="Nazwa produktu" value={product.name} onChangeText={(text) => setProduct({ ...product, name: text })} />
        <TextInput placeholder="Producent" value={product.manufacturer} onChangeText={(text) => setProduct({ ...product, manufacturer: text })} />
        <TextInput placeholder="Opis" value={product.description} onChangeText={(text) => setProduct({ ...product, description: text })} />
        <TextInput placeholder="Cena" value={product.price} onChangeText={(text) => setProduct({ ...product, price: text })} />
        <TextInput placeholder="URL obrazu" value={product.imageUrl} onChangeText={(text) => setProduct({ ...product, imageUrl: text })} />
        <Button title="Wprowadź produkt" onPress={addProduct} />
        <Button title="Wyślij informacje o produktach do bazy danych" onPress={synchronizeProducts} />
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default AddProductsScreen;