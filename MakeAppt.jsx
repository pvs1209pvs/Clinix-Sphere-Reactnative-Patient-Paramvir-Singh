import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";
import { IP } from "./App";


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


export function MakeAppt({ navigation }) {

    const { token, setToken, patientId, setPatientId, patientName } = useAuth()
    const [doctors, setDoctors] = useState([])

    async function fetchDoctorsApiCall() {

        try {

            const response = await fetch(`http://${IP}:8080/doctor`,
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
            const respone = await fetch(`http://${IP}:8080/appt`,
                {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}` },
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
        <View>
            <Text>
            </Text>

            {
                doctors.map((value, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value._id}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value.name}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value.address}</Text>
                        <Button title="Appoint" onPress={() => makeAppointmentOnClick(index)}></Button>
                    </View>
                ))
            }
        </View>
    )
}


