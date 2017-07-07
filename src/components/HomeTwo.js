import React, { Component } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SafariView from "react-native-safari-view";

export default class Home extends Component {
  static navigationOptions = {
    title: "Profile",
  };

  constructor(props) {
    super(props)
    this.state = {
      user: undefined, // user has not logged in yet
    };

  }

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener("url", this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener("url", this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    let [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === "ios") {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL("http://localhost:3000/auth/facebook");

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL("http://localhost:3000/auth/google");

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === "ios") {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {

    const { navigate } = this.props.navigation;

    let { user } = this.state;
    return (
      <View style={styles.container}>


        <View style={styles.content}>
          <Text style={styles.header}>
            Welcome Grace Li!
          </Text>
          <Text style={styles.text}>
            Please click to continue {"\n"}
            to the awesomness
          </Text>
          <View style={styles.navBtns} >
            <Button
            onPress={() => {
              navigate("Translation")
            }}
            title="Text Translation"
            />
            <Button
            onPress={() => {
              navigate("Dictionary")
            }}
            title="Text Definition"
            />
          </View>
        </View>
      </View>
    );
  }
}

let iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    margin: 10,
  },
  text: {
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  oAuthBtns: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 30,
    marginBottom: 30,
  },
  navBtns: {
    justifyContent: "space-between",
    flexDirection: "column"
  }
});
