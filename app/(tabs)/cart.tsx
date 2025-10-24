import CartItem from "@/Components/CArtItem";
import CustomButton from "@/Components/CustomButton";
import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const Cart = () => {
    const {
        items,
        clearCart,
        getTotalItems,
        getTotalPrice,
    } = useCartStore();

    const totalItems = getTotalItems();
    const hasItems = totalItems > 0;
    const subtotal = getTotalPrice();
    const delivery = hasItems ? 3.5 : 0;
    const tax = hasItems ? subtotal * 0.08 : 0;
    const total = subtotal + delivery + tax;

    const handlePrimaryAction = () => {
        if (hasItems) {
            Alert.alert(
                "Checkout",
                "Checkout flow is coming soon. Thanks for shopping with us!"
            );
        } else {
            router.push("/(tabs)/search");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-5 pt-3 pb-4 flex-row items-center justify-between">
                <View>
                    <Text className="h3-bold text-dark-100">Your Cart</Text>
                    <Text className="body-regular text-gray-400">
                        {hasItems ? `${totalItems} items` : "Add something tasty!"}
                    </Text>
                </View>

                {hasItems && (
                    <TouchableOpacity
                        className="flex-row items-center gap-2"
                        onPress={clearCart}
                    >
                        <Image
                            source={images.trash}
                            className="size-4"
                            tintColor="#FF7070"
                        />
                        <Text className="paragraph-medium text-red-400">Clear</Text>
                    </TouchableOpacity>
                )}
            </View>

            {hasItems ? (
                <FlatList
                    data={items}
                    keyExtractor={(item) =>
                        `${item.id}-${item.customizations
                            ?.map((c) => c.id)
                            .join("-") ?? "base"}`
                    }
                    renderItem={({ item }) => <CartItem item={item} />}
                    contentContainerClassName="px-5 pb-36"
                    ItemSeparatorComponent={() => <View className="h-4" />}
                />
            ) : (
                <View className="flex-1 items-center justify-center gap-6 px-6">
                    <Image
                        source={images.emptyState}
                        className="size-40"
                        resizeMode="contain"
                    />
                    <Text className="h3-bold text-dark-100 text-center">
                        Your cart is empty
                    </Text>
                    <Text className="body-regular text-gray-400 text-center">
                        Browse our menu and add your favorite items to get started.
                    </Text>
                </View>
            )}

            <View className="absolute bottom-0 left-0 right-0 bg-white px-5 pb-8 pt-6 rounded-t-3xl shadow-xl shadow-black/10">
                {hasItems && (
                    <>
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="paragraph-medium text-gray-500">Subtotal</Text>
                            <Text className="paragraph-bold text-dark-100">
                                ${subtotal.toFixed(2)}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="paragraph-medium text-gray-500">Delivery</Text>
                            <Text className="paragraph-bold text-dark-100">
                                ${delivery.toFixed(2)}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="paragraph-medium text-gray-500">Tax</Text>
                            <Text className="paragraph-bold text-dark-100">
                                ${tax.toFixed(2)}
                            </Text>
                        </View>

                        <View className="flex-row justify-between items-center mb-5">
                            <Text className="paragraph-bold text-dark-100 text-lg">
                                Total
                            </Text>
                            <Text className="h3-bold text-primary">
                                ${total.toFixed(2)}
                            </Text>
                        </View>
                    </>
                )}

                <CustomButton
                    title={hasItems ? "Proceed to checkout" : "Browse the menu"}
                    onPress={handlePrimaryAction}
                />
            </View>
        </SafeAreaView>
    );
};

export default Cart;