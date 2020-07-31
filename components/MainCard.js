import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const MainCard = (props) => {


    const Icon = () => {
        if(props.icon === 'morning'){
            return (
                <Feather name="sun" style={styles.cardIcon} size={40} color="white"/>
            )
        }
        if(props.icon === 'afternoon'){
            return (
                <Fontisto style={styles.cardIcon} name="day-cloudy" size={40} color="white" />
            )
        }
        if(props.icon === 'night'){
            return (
                <Feather name="cloud-rain" style={styles.cardIcon} size={40} color="white"/>
            )
        }
       
        
    }
  const styles = StyleSheet.create({
    card: {
      backgroundColor: props.backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      width: 99,
      height: 210,
      borderRadius: 20,
    },
    cardTitle: {
      color: "white",
      margin: 15,
      fontSize: 16,
    },
      cardIcon: {
        color: "white",
        margin: 15,
        alignSelf:'center'
      },
        temperatureText: {
          color: "white",
        },
      
    
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Icon></Icon>
  <Text style={styles.temperatureText}>{props.temperature}</Text>
    </View>
  );
};

export default MainCard;
