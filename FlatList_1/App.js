import React, { useState } from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

function DetailsScreen({navigation,route}) {
  console.log(route);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{route.params.item.name}</Text>
      <Text>{route.params.item.age}</Text>
      <Text>{route.params.item.sex}</Text>
    </View>
  );
}

function HomeScreen({navigation}) {
  const users = [
    {id: 1,name: 'Antonio', age:34, sex:'Hombre'},
    {id: 2,name: 'Ale', age:23, sex:'Hombre'},
    {id: 3,name: 'Ana', age:30, sex:'Mujer'}
  ]

  function pintar({item}){
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('Details',{item:item})} >
        <Text style={{ flex: 1, color:'coral', fontSize: 20}} >{item.name}</Text>
      </TouchableOpacity>
    
    )}  
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList data={users} renderItem={pintar}/>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function Listado() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function Informacion() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Informacion" component={info} />
    </SettingsStack.Navigator>
    
  );
}

function info(){
  return(
      <View>
        <Text style={{textAlign:'center', fontSize:30, justifyContent: 'center'}}>Informacion vacía</Text>
      </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Listado'
      screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name == 'Listado') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Informacion') {
                iconName = focused ? 'paw' : 'paw-outline';
              }
              
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'coral',
            tabBarInactiveTintColor: 'grey',
          })}
        >
        <Tab.Screen options={{ headerShown: false }} name="Listado" component={Listado} />
        <Tab.Screen options={{ headerShown: false }} name="Informacion" component={Informacion} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}