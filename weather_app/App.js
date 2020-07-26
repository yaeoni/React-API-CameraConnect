import React from 'react';
import {Alert} from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY = '91b69402b34b7db284dfea028da8e5a5';

export default class extends React.Component{
  state = {
    isLoading: true
  }
  getWeather = async(latitude, longitude) => {
    try{
      const { data } = await axios.get(
        'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+"&lon="+longitude+"&appid="+API_KEY
      );
      console.log(data);
      this.setState({isLoading: false});
    }catch(error){
      Alert.alert("Sorry, error");
    }
  }
  getLocation = async() => {
    try{
      await Location.requestPermissionsAsync();
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      console.log(latitude + " " + longitude);
      //Send to API and get weather
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false});
    }catch(error){
      Alert.alert("Can't find you yae~");
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading } = this.state;
    return isLoading? <Loading /> : null;
  }
}