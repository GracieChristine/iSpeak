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
    title: 'iSpeak',
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
        { user
          ? // Show user info if already logged in
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user.name}!
              </Text>
            </View>
          : // Show Please log in message if not
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome Stranger!
              </Text>
              <View style={styles.avatar}>
                <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
              </View>
              <Text style={styles.text}>
                Please log in to continue {"\n"}
                to the awesomness
              </Text>
            </View>
        }
        {/* Login / Redirect buttons */}
        { user
          ? // Show user info if already logged in
          <View style={styles.content}>
            <View style={styles.buttons} >
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
          : // Show Ouath buttons if not
          <View style={styles.buttons}>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={this.loginWithFacebook}
              {...iconStyles}
            >
              Facebook Login
            </Icon.Button>
            <Icon.Button
              name="google"
              backgroundColor="#DD4B39"
              onPress={this.loginWithGoogle}
              {...iconStyles}
            >
              Google Login
            </Icon.Button>
          </View>
        }
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
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    margin: 10,
  },
  text: {
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 30,
    marginBottom: 30,
  },
});
