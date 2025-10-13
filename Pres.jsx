import { use, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { endpoint } from "./App";
import { useAuth } from "./AuthProvider";


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
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Symptoms: {pres.symptoms}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Diagnosis: {pres.diagnosis}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Medicine Name: {pres.medName}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Medicine Dose: {pres.medDose}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Medicine Duration: {pres.medDur}</Text>
        </View>
    )
}