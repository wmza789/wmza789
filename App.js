import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { client } from './components/Client';
import  Jobs  from  "./components/Jobs";
import  Job  from  "./components/Job";
import Profile from "./components/Profile";
import { ApolloClient, InMemoryCache, useQuery, gql, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const GET_JOBS = gql`
{
    jobs{
      id
      title
      commitment{title}
      company{name logoUrl}
      cities{name}
      countries{name}
      description
    }
  }
`;

function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_JOBS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Job Listings</Text>
    </View>
    <ScrollView contentContainerStyle={styles.contentContainer}>
    {data.jobs.map((job) => (
    <Job  key={job.id} job={job} navigation={navigation} />
    ))}
    </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7'
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerText: {
    marginBottom: 5,
    fontSize: 30,
    fontWeight: 'bold'
  },
  contentContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
