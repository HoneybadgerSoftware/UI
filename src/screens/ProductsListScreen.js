import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, TextInput, Animated, StyleSheet} from 'react-native';
import ProductTile from '../components/ProductTile';
import axios from 'axios';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ProductsListScreen = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 50; // Wysokość dla nagłówka i paska wyszukiwania

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://<twój_backend>/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania produktów:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const handleAddToCart = (product) => {
        // logika dodawania do koszyka
    };

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Szukaj..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Animated.View>
            <AnimatedFlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductTile product={item} onAddToCart={handleAddToCart} />}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'white',
        zIndex: 10,
        paddingHorizontal: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        marginBottom: 10,
    },
});

export default ProductsListScreen;
