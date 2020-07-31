import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import MainCard from "./components/MainCard";
import InfoCard from "./components/InfoCard";
import * as Location from "expo-location";
import getCurrentWeather from "./api";

export default function App() {
  //funções
  const [currentTemperature, setCurrentTemperature] = useState("27");
  const [location, setLocation] = useState("SP / São Paulo");
  const [darkTheme, setDarkTheme] = useState(true);
  const [locationCoords, setLocationCoords] = useState(null);
  const [locationName, setLocationName] = useState("Brasil, Fortaleza");
  const [temperatureMin, setTemperatureMin] = useState("21");
  const [temperatureMax, setTemperatureMax] = useState("32");
  const [wind, setWind] = useState("7");
  const [humidity, setHumidity] = useState("68");
  const [hourNow, setHourNow] = useState(null);

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Sem permissão para localização");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      await setLocationCoords(location.coords);
      // console.log(location)
    }
  }

  async function setCurrentWeather() {
    let date = new Date();
    setHourNow(`${date.getHours()}: ${date.getMinutes()}`);

    await getLocation();
    const data = await getCurrentWeather(locationCoords);

    setCurrentTemperature(convertKelvinToC(data[0]));
    setTemperatureMin(convertKelvinToC(data[1]));
    setTemperatureMax(convertKelvinToC(data[2]));
    setLocationName(data[3]);
    setWind(data[4]);
    setHumidity(data[5]);
  }

  function convertKelvinToC(kelvin) {
    return parseInt(kelvin - 273);
  }

  useEffect(() => {
    setCurrentWeather();
    alert('Se localização estiver errada, clicka no botão atualizar')
  }, []);

  //estilo
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      backgroundColor: darkTheme ? "#232634" : "#f2f2f2",
    },
    temperatura: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
    },
    temperatureText: {
      fontSize: 30,
      color: darkTheme ? "#e0e0e0" : "black",
    },
    refreshButton: {
      position: "absolute",
      margin: 30,
      alignSelf: "flex-start",
    },
    cardView: {
      display: "flex",
      flexDirection: "row",
      color: darkTheme ? "black" : "white",
      margin: 10,
      alignItems: "center",
    },
    info: {
      alignItems: "center",
      borderRadius: 20,
      width: 310,
      height: 150,
      backgroundColor: darkTheme ? "#393e54" : "#8F8F8F",
    },
    infoText: {
      color: darkTheme ? "#e0e0e0" : "white",
      margin: 15,
      fontSize: 15,
      fontWeight: "bold",
    },
    addtionalInfo: {
      flexDirection: "row",
      // flexWrap:'wrap'
    },
    themeButtonCircle: {
      alignSelf: darkTheme ? "flex-end" : "flex-start",
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: darkTheme ? "#232634" : "#F2F2F2",
    },
    themeButton: {
      margin: 10,
      alignSelf: "flex-end",
      right: 15,
      top: 10,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    localizationText: {
      color: darkTheme ? "#e0e0e0" : "black",
    },
    themeButtonSquare: {
      backgroundColor: darkTheme ? "#F2F2F2" : "#8F8F8F",
      justifyContent: "center",
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
  });

  const Time = () => {
    const date = new Date();
    if (date.getHours() < 18) {
      return (
        <Feather
          name="sun"
          style={{ marginTop: 40 }}
          size={30}
          color="orange"
        />
      );
    } else {
      return (
        <Feather
          name="moon"
          style={{ marginTop: 40 }}
          size={30}
          color="orange"
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.themeButton}>
        <View style={styles.themeButtonSquare}>
          <TouchableOpacity
            style={styles.themeButtonCircle}
            onPress={() =>
              darkTheme ? setDarkTheme(false) : setDarkTheme(true)
            }
          ></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => setCurrentWeather()}
      >
        <EvilIcons
          name="refresh"
          size={24}
          color={darkTheme ? "white" : "black"}
        />
      </TouchableOpacity>
      <Time></Time>
      <View style={styles.temperatura}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, { fontSize: 14 }]}>ºC</Text>
      </View>
      <Text style={styles.localizationText}>{locationName}</Text>
      <Text style={styles.localizationText}>{hourNow}</Text>
      <View style={styles.cardView}>
        <MainCard
          title={"Manhã"}
          icon={"morning"}
          temperature={"27°"}
          backgroundColor={darkTheme ? "#D26F2F" : "#CC6E30"}
        ></MainCard>
        <MainCard
          title={"Tarde"}
          icon={"afternoon"}
          temperature={currentTemperature}
          backgroundColor={darkTheme ? "#D29600" : "#FCC63F"}
        ></MainCard>
        <MainCard
          title={"Noite"}
          icon={"night"}
          temperature={"21°"}
          backgroundColor={darkTheme ? "#008081" : "#38B7B8"}
        ></MainCard>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Informações adicionais</Text>
        <View style={styles.addtionalInfo}>
          <InfoCard title={"Vento"} variable={wind}></InfoCard>
          <InfoCard title={"Umidade"} variable={humidity}></InfoCard>
          <InfoCard title={"Temp. Min"} variable={temperatureMin}></InfoCard>
          <InfoCard title={"Temp. Max"} variable={temperatureMax}></InfoCard>
        </View>
      </View>
    </View>
  );
}
