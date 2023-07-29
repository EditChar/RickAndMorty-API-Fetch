import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ImageBackground, Animated, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import globalStyles from './styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';


const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchEpisodes('https://rickandmortyapi.com/api/episode');
  }, []);

  const fetchEpisodes = (url) => {
    axios.get(url)
      .then((response) => {
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...response.data.results]);
        setNextPageUrl(response.data.info.next);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
  
      <View style={styles.item}>
      <TouchableOpacity style={globalStyles.itemContainer} onPress={() => handleEpisodePress(item.id)}>
      <Image style={style.imagestyle} source={require('./assets/image/RMlogo.png')}></Image>
      <View style={style.viewContainer}>
      <Text style={globalStyles.itemName}>{item.name}</Text>
      <Text style={globalStyles.itemEpisode}>Episode: {item.episode}</Text>
      <Text style={globalStyles.itemAirDate}>Air Date: {item.air_date}</Text>
      </View>
      </TouchableOpacity>

      </View>
  
  );

  const keyExtractor = (item) => item.id.toString();

  const handleEpisodePress = (episodeId) => {
    navigation.navigate('EpisodeDetail', { episodeId });
  };

  const handleLoadMore = () => {
    if (nextPageUrl) {
      fetchEpisodes(nextPageUrl);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
            style={StyleSheet.absoluteFillObject}
            //blurRadius={3}
            source={require('./assets/image/RMsky.jpg')}/>
      <View>
      <Text style={globalStyles.heading}>Episode List</Text>
      </View>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList style={style.container}
        data={episodes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      )}
      
    </SafeAreaView>
  );
};

const style = StyleSheet.create({

  container: {
      marginBottom : 24,
  },
  imagestyle: {
    width: 40,
    marginTop: 5,
    flexDirection: 'row'
  }, viewContainer: {
    flexDirection: 'column',
    marginLeft:6,
  }, 
  RMbackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  fontSize : {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
  },
  wrapText: {
    flex : 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  item : {
    flexDirection : 'row',
    marginBottom: 20,
    borderRadius : 10,
    backgroundColor : '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height : 10,
    },
    shadowOpacity: .3,
    shadowRadius: 20,
    padding: 10,
  }
})

export default EpisodeList;
