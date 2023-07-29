import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import globalStyles from './styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';


const CharacterDetail = ({ route, navigation }) => {
  const { characterId } = route.params;
  const [characterData, setCharacterData] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchCharacterData();
  }, []);

  const fetchCharacterData = () => {
    axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        setCharacterData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!characterData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={style.container}>
    <View style={globalStyles.backContainer}>
      <TouchableOpacity style={globalStyles.backIcon} onPress={handleGoBack}>
      <Image style={style.imageStyle} source={require('./assets/image/prevpng.png')}></Image>

      </TouchableOpacity>
    </View>
      <Text style={globalStyles.heading}>Character Detail</Text>
      <Text style={globalStyles.characterName}>{characterData.name}</Text>
      <Text style={globalStyles.characterStatus}>Status: {characterData.status}</Text>
      <Text style={globalStyles.characterSpecies}>Species: {characterData.species}</Text>
      <Text style={globalStyles.characterLocation}>Location: {characterData.location.name}</Text>
    </View>
  );
};

const style = StyleSheet.create({

    container: {
        padding: 16,
    },
    imageStyle: {
      flex: 1,
      width: 32,
      height: 32,
      resizeMode: 'contain'
    }
});



export default CharacterDetail;
