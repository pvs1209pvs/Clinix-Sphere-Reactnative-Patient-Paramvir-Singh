import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useAuth } from "./AuthProvider";
import { endpoint } from "./App";
import { jwtDecode } from "jwt-decode";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'flex-start',  
    paddingTop: '10%', 
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#222',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#8c00ffff',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        textAlign: 'center',
        color: '#777',
        marginTop: 20,
        fontSize: 14,
    },
    link: {
        color: '#8c00ffff',
        fontWeight: '600',
    },
});

export function SignIn({ navigation }) {

    const { token, setToken, patientId, setPatientId, patientName, setPatientName } = useAuth()

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    async function signInApiCall() {

        try {

            const response = await fetch(
                `https://${endpoint}/login/patient`,
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
            else if(response.status==400){
                Alert.alert("Alert", "Username already exists")
            }
             else if(response.status==401){
                Alert.alert("Alert", "Invalid credentials")
            }

        } catch (error) {
            console.error(error.message)
        }

    }


    const handleChange = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={user.username}
                onChangeText={(value) => handleChange('username', value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                autoCapitalize="none"
                value={user.password}
                onChangeText={(value) => handleChange('password', value)}
            />

            <TouchableOpacity style={styles.button} onPress={signInApiCall}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

          
        </View>
    )

}