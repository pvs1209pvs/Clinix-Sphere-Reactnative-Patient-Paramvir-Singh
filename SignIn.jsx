import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "./AuthProvider";
import { IP } from "./App";
import { jwtDecode } from "jwt-decode";

export function SignIn({ navigation }) {

    const { token, setToken, patientId, setPatientId, patientName, setPatientName } = useAuth()

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    async function signInApiCall() {

        try {

            const response = await fetch(
                `http://${IP}:8080/login/patient`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token)
                console.log(`sign in patient id ${data.patientId}`)
                const decoded = jwtDecode(data.token)
                setPatientId(decoded.patientId)
                console.log(`sign in patient name ${decoded.patientName}`)
                setPatientName(decoded.patientName)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }]
                })
            }
            else {
                Alert.alert("Alert", "Invalid credentials, try again")
            }

        } catch (error) {
            console.error(error.message)
        }

    }


    const handleChange = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };


    return (
        <View style={{ padding: 20 }}>>

            <TextInput
                placeholder="Username"
                autoCapitalize="none"
                value={user.username}
                onChangeText={(value) => handleChange('username', value)}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                value={user.password}
                onChangeText={(value) => handleChange('password', value)}
            />


            <View style={{ marginTop: 20 }}>
                <Button title="Sign In" onPress={signInApiCall} />

            </View>

        </View>
    )
}