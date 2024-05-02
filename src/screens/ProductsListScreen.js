import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, TextInput, Animated, StyleSheet} from 'react-native';
import ProductTile from '../components/ProductTile';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ProductsListScreen = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = 50;
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async (page) => {
            try {
                const response = await axios.get('http://products-dns-dvdvmxy4.hcp.polandcentral.azmk8s.io/products');
                const productTiles = response.data.map(transformToProductTile);
                setProducts(prevProducts => [...prevProducts, ...productTiles]);
                setFilteredProducts(prevProducts => [...prevProducts, ...productTiles]);
            } catch (error) {
                console.error('Błąd podczas pobierania produktów:', error);
            }
        };

        fetchData(page);
    }, [page]);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const handleAddToCart = (product) => {
            let productExists = cart.find(item => item.id === product.id);

            if (productExists) {
                productExists.quantity += 1;
            } else {
                addToCart({ ...product, quantity: 1 });
            }
    };

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
        extrapolate: 'clamp',
    });

    const transformToProductTile = (rawProduct) => {
    return {
        id: rawProduct.id,
        name: rawProduct.name,
        price: rawProduct.price,
        image: rawProduct.image,
    };
};

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
                onEndReached={() => setPage(prevPage => prevPage + 1)}
                onEndReachedThreshold={0.5}
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
