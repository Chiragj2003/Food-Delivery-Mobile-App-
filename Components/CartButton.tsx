import { images } from '@/constants';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


/**
 * Floating cart entry point that displays the current item count badge.
 */
const CartButton: () => React.ReactElement = () => {
    const totalItems = 10;

    return(
        <TouchableOpacity className="cart-btn" onPress={() => {  }} >
            <Image source={images.bag} className="size-5" resizeMode="contain" />
            {totalItems > 0 && (
                <View className="cart-badge">
                    <Text className="small-bold text-white">{totalItems}</Text>
                </View>)}
        </TouchableOpacity>
    )
}

export default CartButton;
