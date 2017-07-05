import React, { Component } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from "react-native";

import Home from "./Home";
import HomeTwo from "./HomeTwo"
import Translation from "./Translation";
import Dictionary from "./Dictionary";

import { StackNavigator } from "react-navigation";

const TranslatorApp = StackNavigator({
  Home: { screen: Home },
  HomeTwo: { screen: HomeTwo },
  Translation: { screen: Translation },
  Dictionary: { screen: Dictionary }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TranslatorApp />
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  }
});
