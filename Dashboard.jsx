import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useAuth } from './AuthProvider';
import { IP } from './App';
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
                `http://${IP}:8080/appt?${params.toString()}`,
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
            headerRight: () => <Button title="Logout" onPress={() => {
                setToken(null)
                navigation.reset({
                    index: 0, // index of the active route in the new stack
                    routes: [{ name: 'SignUp' }], // the screen you want as the new root
                });
            }} />
        });
    }, [navigation]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item._id)}>
            <View style={styles.item}>
                <Text style={styles.itemText}>Doctor Name: {item.doctorName}</Text>
                <Text style={styles.itemText}>Patient Name: {item.forPatient}</Text>
                <Text style={styles.itemText}>Status: {item.status}</Text>
                <Text style={styles.itemText}>Time: {item.time}</Text>
                <Text style={styles.itemText}>Appointment Id: {item._id}</Text>
                <Text style={styles.itemText}>Doctor Id: {item.byDoctor}</Text>
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
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#ff6600',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // shadow for Android
    },
    fabText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
});
