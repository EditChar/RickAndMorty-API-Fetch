import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import globalStyles from './styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';



const EpisodeDetail = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episodeData, setEpisodeData] = useState(null);
  const [characters, setCharacters] = useState([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchEpisodeData();
  }, []);

  const fetchEpisodeData = () => {
    axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((response) => {
        setEpisodeData(response.data);
        fetchCharacters(response.data.characters);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCharacters = (characterUrls) => {
    const requests = characterUrls.map((url) => axios.get(url));
    Promise.all(requests)
      .then((responses) => {
        const charactersData = responses.map((response) => response.data);
        setCharacters(charactersData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!episodeData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={style.container}>
      <View style={globalStyles.backContainer}>
      <TouchableOpacity style={globalStyles.backIcon} onPress={handleGoBack}>
      <Image style={style.imageStyle} source={require('./assets/image/prevpng.png')}></Image>
      </TouchableOpacity>
      </View>
      
      <Text style={globalStyles.heading} >Episode Detail</Text>
      <View>
      <Text style={globalStyles.itemName}>{episodeData.name}</Text>
      <Text style={globalStyles.itemEpisode}>Episode: {episodeData.episode}</Text>
      <Text style={globalStyles.itemAirDate}>Air Date: {episodeData.air_date}</Text>

      <Text style={globalStyles.charactersHeading}>Characters:</Text>
      </View>
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.characterItem}
            onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
          >
          <Text style={globalStyles.characterDetail} >{item.name} - {item.species}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const style = StyleSheet.create({

  container: {
    flex:1,
    padding:16,
  },
  imageStyle: {
    flex: 1,
    width: 32,
    height: 32,
    resizeMode: 'contain'
  }
});


export default EpisodeDetail;
