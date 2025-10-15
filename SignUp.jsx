import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { useAuth } from './AuthProvider';
import { endpoint } from './App';
import { jwtDecode } from 'jwt-decode';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'flex-start',
    paddingTop: '10%', // ⬅️ moves content down 10% from top
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
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#8c00ffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

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
                `https://${endpoint}/signup/patient`,
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
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
                value={patient.name}
                onChangeText={(value) => handleChange('name', value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#888"
                value={patient.address}
                onChangeText={(value) => handleChange('address', value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                autoCapitalize="none"
                value={patient.username}
                onChangeText={(value) => handleChange('username', value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                autoCapitalize="none"
                value={patient.password}
                onChangeText={(value) => handleChange('password', value)}
            />

            <TouchableOpacity style={styles.button} onPress={signUpAPICall}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('SignIn')}
            >
                <Text style={styles.linkText}>Sign In (Already have an account)</Text>
            </TouchableOpacity>
        </View>
    )

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