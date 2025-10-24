import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

/**
 * Reusable button that supports loading states and optional leading icons.
 */
const CustomButton = ({
    onPress,
    title="Click Me",
    style,
    textStyle,
    leftIcon,
    isLoading = false,
    disabled = false
}: CustomButtonProps) => {
    const isDisabled = disabled || isLoading;

    return (
        <TouchableOpacity
            className={cn('custom-btn', isDisabled && 'opacity-60', style)}
            onPress={onPress}
            disabled={isDisabled}
        >
            {leftIcon}

            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ): (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton