import {View, Text, Button, Alert} from 'react-native'
import {Link, router} from "expo-router";


const SignUp = () => {
    
    return (
        <View >
            <Text>Sign-Up</Text>
            <Button title="Sign In" onPress={() => router.push('/sign-in')} />
        </View>
    )
}

export default SignUp