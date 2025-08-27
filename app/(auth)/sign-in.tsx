import {View, Text, Button, Alert} from 'react-native'
import {Link, router} from "expo-router";


const SignIn = () => {
    
    return (
        <View >
            <Text>Sign-in</Text>
            <Button title="Sign Up" onPress={() => router.push('/sign-up')} />
        </View>
    )
}

export default SignIn