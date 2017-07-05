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

export default class Dictionary extends Component{

  static navigationOptions = {
    title: 'Text Definition',
  };

  constructor(props) {
    super(props);
    this.state = {
      textContent: "",
      textDefinition: ""
    };
  }

  wordDefining(textContent) {
    console.log("textContent", textContent);
    fetch(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${textContent}/definitions`, {
      headers: {
        "Accept": "application/json",
        "app_id": `${Config.oxfordId}`,
        "app_key": `${Config.oxfordKey}`
      }
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        console.log(responseJSON.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
        const definition = responseJSON.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        this.setState({textDefinition: definition})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Text-to-Speech Conversion
          </Text>
        </View>
        <View style={styles.translationContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={(textContent) => this.setState({textContent})}
            keyboardType={"default"}
          />
          <TouchableOpacity style={styles.translationBtn}
            onPress={() => this.wordDefining(this.state.textContent)}
          >
            <Text style={styles.translationBtnText}>Convert!</Text>
          </TouchableOpacity>
          <Text style={styles.outputText}>
            {this.state.textDefinition}
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
    marginTop: 50
  },
  pickerMenu: {
    width: 100,
    marginTop: -15
  },
  translationContainer: {
    flex: 3,
    // backgroundColor: "lightgray"
  },
  inputText: {
    width: 200,
    height: 50,
    marginLeft: 85,
    marginTop: 15,
    marginBottom: 15,
    // borderRadius: 20,
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
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 50,
    padding: 10,
    paddingTop: 15,
    fontSize: 18,
    backgroundColor: "#4A90E2",
    color: "white",
  }
});

module.exports = Dictionary;
