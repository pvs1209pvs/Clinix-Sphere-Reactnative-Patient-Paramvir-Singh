import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";
import { endpoint } from "./App";


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 4,
        padding: 8,
        borderRadius: 12,
        elevation: 1, 
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    appointButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#8c00ffff',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginTop: 10,
    },
    appointButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});


export function MakeAppt({ navigation }) {

    const { token, setToken, patientId, setPatientId, patientName } = useAuth()
    const [doctors, setDoctors] = useState([])

    async function fetchDoctorsApiCall() {

        try {

            const response = await fetch(`https://${endpoint}/doctor`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = await response.json()

            console.log(data)
            setDoctors(data)

        } catch (error) {
            console.error(error);

        }

    }

    useEffect(() => {
        fetchDoctorsApiCall()
    }, [])


    async function makeAppointmentOnClick(index) {

        const appt = {
            doctorName: doctors[index].name,
            byDoctor: doctors[index]._id,
            ofPatient: patientId,
            forPatient: patientName,
            status: "pending",
            time: "13 oct"
        }

        console.log("making appt")
        console.log(appt)

        try {
            const respone = await fetch(`https://${endpoint}/appt`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(appt)
                }
            )
            console.log(respone.status)
            const data = await respone.json()
        } catch (error) {
            console.error(error)
        }

        navigation.goBack()

    }

    return (
        <FlatList
            data={doctors}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ padding: 8, paddingBottom: 8 }}
            renderItem={({ item, index }) => (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Dr. {item.name}</Text>
                    <Text style={styles.cardText}>Location: {item.address}</Text>
                    <Text style={styles.cardText}>ID: {item._id}</Text>

                    <TouchableOpacity
                        style={styles.appointButton}
                        onPress={() => makeAppointmentOnClick(index)}
                    >
                        <Text style={styles.appointButtonText}>Appoint</Text>
                    </TouchableOpacity>
                </View>
            )}
        />

    )


}


