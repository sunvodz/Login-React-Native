import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import firebase from "firebase";
import { Header, Button, Spinner } from "../components/common";
import LoginForm from "./LoginScreen";

export default class StoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyD58EjL8cKZ5TKET6yCKIzUxGOcRyCZMMQ",
      authDomain: "chat-app-c6f99.firebaseapp.com",
      databaseURL: "https://chat-app-c6f99.firebaseio.com",
      projectId: "chat-app-c6f99",
      storageBucket: "chat-app-c6f99.appspot.com",
      messagingSenderId: "242381985743",
      appId: "1:242381985743:web:d089360b115d78648c64ba",
      measurementId: "G-QENZ6B9WZE"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Story</Text>
        <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});
