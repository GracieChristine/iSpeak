import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

export default class Translation extends Component{

  static navigationOptions = {
    title: 'Text Translation',
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Text-to-Text Translation
          </Text>
        </View>
      </View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 6
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "lightgray",
    borderBottomColor: "#C59A6D"
  },
  title: {
    color: "#C59A6D",
    fontSize: 24,
    fontWeight: "700"
  }
});

module.exports = Translation;
