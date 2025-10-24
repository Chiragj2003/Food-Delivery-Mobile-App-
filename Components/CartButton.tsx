import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";


/**
 * Floating cart entry point that displays the current item count badge.
 */
const CartButton: () => React.ReactElement = () => {
    const totalItems = useCartStore((state) => state.getTotalItems());

    return(
        <TouchableOpacity
            className="cart-btn"
            onPress={() => router.push("/(tabs)/cart")}
        >
            <Image source={images.bag} className="size-5" resizeMode="contain" />
            {totalItems > 0 && (
                <View className="cart-badge">
                    <Text className="small-bold text-white">{totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default CartButton;
