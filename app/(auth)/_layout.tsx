import { Slot } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function _Layout(){
    return(
        <SafeAreaView className="flex-1 bg-white">
            <Text>AuthLayout</Text>
            <Slot/>
        </SafeAreaView>
    )
}