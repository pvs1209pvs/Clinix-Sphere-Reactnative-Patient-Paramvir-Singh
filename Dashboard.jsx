import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useAuth } from './AuthProvider';
import { endpoint } from './App';
import { jwtDecode } from 'jwt-decode';
import { useFocusEffect } from '@react-navigation/native';

export default function Dashboard({ navigation }) {

    const { token, setToken, patientId, setPatientId, patientName } = useAuth()

    console.log("dashboard")
    console.log(token, patientId, patientName)

    const [appts, setAppts] = useState([])


    async function fetchAppts() {

        const params = new URLSearchParams();
        params.append("patId", patientId)

        try {
            console.log(`fetching appts for ${patientId}`)
            const respose = await fetch(
                `https://${endpoint}/appt?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = await respose.json()
            setAppts(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }

    }

    useFocusEffect(
        useCallback(() => {
            fetchAppts()
        }, [])
    );


    const handleFabPress = () => {
        navigation.navigate("MakeAppt")
    };

    function handlePress(apptId) {
        navigation.navigate("Pres", { apptId })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity title="Logout" style={{
                backgroundColor: '#8c00ff', // custom color
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
            }} onPress={() => {
                setToken(null)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignUp' }],
                });
            }} >
                <Text style={{ color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
        });
    }, [navigation]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item._id)}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.doctorName}</Text>
                <Text style={styles.cardText}>Patient: {item.forPatient}</Text>
                <Text style={styles.cardText}>Status: {item.status}</Text>
                <Text style={styles.cardText}>Time: {item.time}</Text>
                <Text style={styles.cardText}>Appointment Id: {item._id}</Text>
                <Text style={styles.cardText}>Doctor Id: {item.byDoctor}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={appts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 80 }} // space for FAB
            />

            <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 30,
        backgroundColor: '#8c00ffff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
    },
});
