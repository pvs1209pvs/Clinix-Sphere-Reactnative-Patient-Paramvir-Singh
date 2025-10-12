import React, { useState } from 'react';
import { View, Text, TextInput, Button, } from 'react-native';
import { useAuth } from './AuthProvider';
import { IP } from './App';
import { jwtDecode } from 'jwt-decode';

export function SignUp({ navigation }) {

    const { token, setToken, patientId, setPatientId, patientName, setPatientName } = useAuth()

    const [patient, setPatient] = useState({
        name: "",
        address: "",
        username: "",
        password: ""
    })


    async function signUpAPICall() {

        try {

            const response = await fetch(
                `http://${IP}:8080/signup/patient`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(patient)
                });

            const data = await response.json();
            setToken(data.token)
            setPatientId(data.patientId)
            console.log(`patient id ${data.patientId}`)
            const decoded = jwtDecode(data.token)
            setPatientName(decoded.patientName)

            navigation.replace('Dashboard')
        }
        catch (error) {
            console.error(error)
        }

    }

    const handleChange = (field, value) => {
        setPatient((prev) => ({ ...prev, [field]: value }));
    };


    return (
        <View style={{ padding: 20 }}>

            <TextInput
                placeholder="Name"
                value={patient.name}
                onChangeText={(value) => handleChange('name', value)}
            />

            <TextInput
                placeholder="Address"
                value={patient.address}
                onChangeText={(value) => handleChange('address', value)}
            />

            <TextInput
                placeholder="Username"
                autoCapitalize="none"
                value={patient.username}
                onChangeText={(value) => handleChange('username', value)}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                value={patient.password}
                onChangeText={(value) => handleChange('password', value)}
            />

            <View style={{ marginTop: 20 }}>
                <Button title="Sign Up" onPress={signUpAPICall} />

            </View>

            <View style={{ marginTop: 20 }}>
                <Button title="Sign In (Alrady have an account)" onPress={() => navigation.navigate('SignIn')} />

            </View>


        </View>
    );
}