import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SignUp } from './SignUp';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from './SignIn';
import { AuthProvider, useAuth } from './AuthProvider';
import { MakeAppt } from './MakeAppt';
import Dashboard from './Dashboard';
import { Pres } from './Pres';

const Stack = createNativeStackNavigator();

export const endpoint = "clinix-sphere-express-backend-param.vercel.app"

export default function App() {

  return (
    <AuthProvider>

      <NavigationContainer>

        <Stack.Navigator initialRouteName="SignUp">

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: 'Sign Up' }}
          />

          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: 'Sign In' }}
          />

          <Stack.Screen
            name="MakeAppt"
            component={MakeAppt}

            options={{ title: 'Make Appointment' }}
          />

          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={({ navigation }) => ({
              title: 'Dashboard',
              headerRight: () => (
                <Button title="Add" color="#000" />
              )
            })}
          />


          <Stack.Screen
            name="Pres"
            component={Pres}
            options={{ title: 'Prescription' }}
          />

        </Stack.Navigator>

      </NavigationContainer>
    </AuthProvider>

  );


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <SignUp />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
