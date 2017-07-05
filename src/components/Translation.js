import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  TouchableOpacity
} from "react-native";

import Config from "../../config.js";

export default class Translation extends Component{

  static navigationOptions = {
    title: 'Text Translation',
  };

  constructor(props) {
    super(props);
    this.state = {
      textInput: "Hello world",
      textOutput: "",
      langSource: "en",
      langTarget: "en"
    };
  }

  tranaslateText(textInput, langSource, langTarget) {
    // console.log("langSource", langSource);
    fetch(`https://translation.googleapis.com/language/translate/v2?q=${textInput}&target=${langTarget}&format=text&source=${langSource}&key=${Config.googleAPIKey}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON.data.translations[0].translatedText);
        const text = responseJSON.data.translations[0].translatedText;
        this.setState({textOutput: text})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.langContainer}>
          <View  style={styles.eachContainer}>
            <Text style={styles.pickerTitle}>Original Language</Text>
            <Picker
              style={styles.pickerMenu}
              selectedValue={this.state.langSource}
              onValueChange={(itemValue, itemIndex) => this.setState({langSource: itemValue})}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Español" value="es" />
              <Picker.Item label="國語" value="zh" />
              <Picker.Item label="Français" value="fr" />
            </Picker>
          </View>
          <View style={styles.eachContainer}>
            <Text style={styles.pickerTitle}>Target Language</Text>
            <Picker
              style={styles.pickerMenu}
              selectedValue={this.state.langTarget}
              onValueChange={(itemValue, itemIndex) => this.setState({langTarget: itemValue})}>
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Español" value="es" />
              <Picker.Item label="國語" value="zh" />
              <Picker.Item label="Français" value="fr" />
            </Picker>
          </View>
        </View>
        <View style={styles.translationContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={(textInput) => this.setState({textInput})}
            keyboardType={"default"}
            multiline = {true}
          />
          <TouchableOpacity style={styles.translationBtn}
            onPress={() => this.tranaslateText(this.state.textInput, this.state.langSource, this.state.langTarget)}
          >
            <Text style={styles.translationBtnText}>Translate!</Text>
          </TouchableOpacity>
          <Text style={styles.outputText}
            multiline = {true}
            >
            {this.state.textOutput}
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
  langContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  eachContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  pickerTitle: {
    fontSize: 18,
    marginTop: 50,
  },
  pickerMenu: {
    width: 100,
    marginTop: -15,
    marginLeft: 15
  },
  translationContainer: {
    flex: 3,
  },
  inputText: {
    width: 200,
    height: 50,
    fontSize: 18,
    marginLeft: 85,
    marginTop: 15,
    marginBottom: 30,
    padding: 5,
    backgroundColor: "whitesmoke",
  },
  translationBtn: {
    width: 110,
    marginLeft: 130,
    backgroundColor: "#C59A6D",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  },
  translationBtnText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10
  },
  outputText: {
    width: 200,
    height: 50,
    marginLeft: 85,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 50,
    padding: 10,
    paddingTop: 15,
    fontSize: 18,
    backgroundColor: "rgba(73, 143, 226, 0.69)",
    color: "white",
  }
});

module.exports = Translation;
