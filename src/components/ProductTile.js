import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';


const ProductTile = ({product, onAddToCart}) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const handleLongPress = ({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
            setModalVisible(true);
        }
    };
    return (
        <LongPressGestureHandler onHandlerStateChange={handleLongPress} minDurationMs={2000}>
            <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ProductDetails', {product})}>
                <Image source={{uri: product.image}} style={styles.image}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{`${product.price} zł`}</Text>
                    <TouchableOpacity onPress={() => onAddToCart(product)}>
                        <Text style={styles.addToCart}>Dodaj do koszyka</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>{product.name}</Text>
                            <Text>{product.price}</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        </LongPressGestureHandler>
    );
};

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        elevation: 3,
        shadowOpacity: 0.3,
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
