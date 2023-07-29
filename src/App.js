import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodeList from './EpisodeList';
import EpisodeDetail from './EpisodeDetail';
import CharacterDetail from './CharacterDetail';
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EpisodeList">
        <Stack.Screen name="EpisodeList" component={EpisodeList} options={{ headerShown: false } } />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetail} options={{ headerShown: false }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
