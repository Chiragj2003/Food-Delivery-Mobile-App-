import CustomButton from "@/Components/CustomButton";
import { Text, View } from "react-native";

interface CheckoutSummaryProps {
    subtotal: number;
    delivery: number;
    tax: number;
    total: number;
    onPrimaryAction: () => void;
    primaryLabel: string;
}

/**
 * Displays checkout totals alongside the primary action.
 */
const CheckoutSummary = ({
    subtotal,
    delivery,
    tax,
    total,
    onPrimaryAction,
    primaryLabel,
}: CheckoutSummaryProps) => {
    return (
        <View className="bg-white rounded-3xl p-5 shadow-xl shadow-black/10">
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
                <Text className="paragraph-bold text-dark-100 text-lg">Total</Text>
                <Text className="h3-bold text-primary">${total.toFixed(2)}</Text>
            </View>

            <CustomButton title={primaryLabel} onPress={onPrimaryAction} />
        </View>
    );
};

export default CheckoutSummary;
