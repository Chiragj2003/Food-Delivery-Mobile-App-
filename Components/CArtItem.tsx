import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import type { CartCustomization, CartItem as CartStoreItem } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

/**
 * Displays a cart line item with quantity controls connected to the cart store.
 */
const CartItem = ({ item }: { item: CartStoreItem }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();
    const customizations: CartCustomization[] = item.customizations ?? [];
    const customizationUpcharge = customizations.reduce(
        (sum, option) => sum + option.price,
        0
    );
    const unitPrice = item.price + customizationUpcharge;
    const lineTotal = unitPrice * item.quantity;

    return (
        <View className="cart-item">
            <View className="flex flex-row items-center gap-x-3">
                <View className="cart-item__image">
                    <Image
                        source={item.imageSource}
                        className="size-4/5 rounded-lg"
                        resizeMode="contain"
                    />
                </View>

                <View>
                    <Text className="base-bold text-dark-100">{item.name}</Text>
                    <Text className="paragraph-semibold text-gray-400 mt-1">
                        ${unitPrice.toFixed(2)} each
                    </Text>

                    {customizations.length > 0 && (
                        <Text
                            className="body-regular text-gray-400 mt-1"
                            numberOfLines={1}
                        >
                            {customizations.map((option) => option.name).join(", ")}
                        </Text>
                    )}

                    <View className="flex flex-row items-center gap-x-4 mt-2">
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, customizations)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.minus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>

                        <Text className="base-bold text-dark-100">{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, customizations)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.plus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className="items-end">
                <Text className="paragraph-bold text-dark-100">
                    ${lineTotal.toFixed(2)}
                </Text>
                <TouchableOpacity
                    onPress={() => removeItem(item.id, customizations)}
                    className="flex-center mt-3"
                >
                    <Image
                        source={images.trash}
                        className="size-5"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItem;