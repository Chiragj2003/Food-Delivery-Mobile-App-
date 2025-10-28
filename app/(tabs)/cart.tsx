import CartItem from "@/Components/CArtItem";
import CheckoutSummary from "@/Components/CheckoutSummary";
import CustomButton from "@/Components/CustomButton";
import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";
import {
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const Cart = () => {
    const {
        items,
        clearCart,
        getTotalItems,
        getTotalPrice,
    } = useCartStore();

    const insets = useSafeAreaInsets();

    const totalItems = getTotalItems();
    const hasItems = totalItems > 0;
    const subtotal = getTotalPrice();
    const delivery = hasItems ? 3.5 : 0;
    const tax = hasItems ? subtotal * 0.08 : 0;
    const total = subtotal + delivery + tax;

    const handlePrimaryAction = () => {
        if (hasItems) {
            Alert.alert(
                "Order Confirmed! 🎉",
                `Your order of ${totalItems} items (Total: $${total.toFixed(2)}) has been placed successfully! We'll notify you once it's on the way.`,
                [
                    {
                        text: "Continue Shopping",
                        onPress: () => {
                            clearCart();
                            router.push("/(tabs)/search");
                        },
                    },
                    {
                        text: "View Orders",
                        onPress: () => {
                            clearCart();
                            router.push("/(tabs)/profile");
                        },
                    },
                ]
            );
        } else {
            router.push("/(tabs)/search");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FB]" edges={['top']}>
            {!hasItems ? (
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
                    <CustomButton
                        title="Browse the menu"
                        onPress={handlePrimaryAction}
                        style="mt-2"
                    />
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) =>
                        `${item.id}-${item.customizations
                            ?.map((c) => c.id)
                            .join("-") ?? "base"}`
                    }
                    renderItem={({ item }) => <CartItem item={item} />}
                    ItemSeparatorComponent={() => <View className="h-4" />}
                    ListHeaderComponent={() => (
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between">
                                <View>
                                    <Text className="h3-bold text-dark-100">Your Cart</Text>
                                    <Text className="body-regular text-gray-400">
                                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                    </Text>
                                </View>

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
                            </View>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View className="mt-6">
                            <Text className="paragraph-bold text-dark-100 mb-3">Order summary</Text>
                            <CheckoutSummary
                                subtotal={subtotal}
                                delivery={delivery}
                                tax={tax}
                                total={total}
                                onPrimaryAction={handlePrimaryAction}
                                primaryLabel="Proceed to checkout"
                            />
                        </View>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 12,
                        paddingBottom: insets.bottom + 90,
                    }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

export default Cart;