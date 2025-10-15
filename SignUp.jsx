import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert} from 'react-native';
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

            console.log("signing up patient")
            console.log(patient)
            const response = await fetch(
                `https://${endpoint}/signup/patient`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(patient)
                });

            const data = await response.json();

            if(response.ok){

            
            setToken(data.token)
            console.log(`patient id ${data.patientId}`)
            const decoded = jwtDecode(data.token)
            setPatientName(decoded.patientName)
            setPatientId(decoded.patientId)

            navigation.replace('Dashboard')
            }
            else if(response.status==400){
                Alert.alert("Alert","Username already exists")
            }
            else if(response.status==401){
                Alert.alert("Alert","Invalid credentials")

            }
        }
        catch (error) {
            console.error(data)
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

 
}