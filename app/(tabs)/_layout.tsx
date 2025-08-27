import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function _Layout(){
    const isAuthenticated = true; // Replace with your authentication logic
    if(!isAuthenticated){
        return <Redirect href="/sign-in" />
    }
    return<Slot />
}

