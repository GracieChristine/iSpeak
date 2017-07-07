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
    title: "Text Definition",
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
        <View style={styles.dictionaryContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Type here to define!" placeholderTextColor="gray"
            onChangeText={(textContent) => this.setState({textContent})}
            keyboardType={"default"}
          />
          <TouchableOpacity style={styles.DictionaryBtn}
            onPress={() => this.wordDefining(this.state.textContent)}
          >
            <Text style={styles.DictionaryBtnText}>Define the Word</Text>
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
    flex: 1
  },
  dictionaryContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  inputText: {
    width: 200,
    height: 50,
    marginLeft: 85,
    marginTop: 0,
    marginBottom: -150,
    padding: 5,
    backgroundColor: "whitesmoke",
    borderColor: "#C59A6D",
    borderWidth: 1
  },
  DictionaryBtn: {
    width: 165,
    marginTop: 100,
    marginLeft: 100,
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
  DictionaryBtnText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10
  },
  outputText: {
    width: 200,
    height: 150,
    marginLeft: 85,
    marginTop: -45,
    marginBottom: 100,
    borderRadius: 50,
    padding: 10,
    paddingTop: 15,
    fontSize: 18,
    backgroundColor: "rgba(198, 155, 110, 0.5)",
    color: "black",
  }
});

module.exports = Dictionary;
