import { use, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { endpoint } from "./App";
import { useAuth } from "./AuthProvider";

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginTop: 8,
        marginBottom: 2,
    },
    cardText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
});


export function Pres({ route }) {

    const { token, setToken, patientId, setPatientId, patientName } = useAuth()
    const [pres, setPres] = useState({})

    async function fetchPres() {

        try {
            console.log(`fetching pres ${route.params.apptId}`)
            const response = await fetch(
                `https://${endpoint}/pres/${route.params.apptId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = await response.json()
            console.log(data)
            setPres(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPres()
    }, [])

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Symptoms</Text>
            <Text style={styles.cardText}>{pres.symptoms}</Text>

            <Text style={styles.cardTitle}>Diagnosis</Text>
            <Text style={styles.cardText}>{pres.diagnosis}</Text>

            <Text style={styles.cardTitle}>Medicine Name</Text>
            <Text style={styles.cardText}>{pres.medName}</Text>

            <Text style={styles.cardTitle}>Medicine Dose</Text>
            <Text style={styles.cardText}>{pres.medDose}</Text>

            <Text style={styles.cardTitle}>Medicine Duration</Text>
            <Text style={styles.cardText}>{pres.medDur}</Text>
        </View>

    )
}