import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
// import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }
  onPressLogin() {
    const { email, password } = this.state;
    console.log("Email : ", email, "Password : ", password);

    this.setState({ error: '', loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }
  onLoginFail() {
    this.setState({ error: "Authentication Failed", loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
  }
  render() {
    return (
      <ScrollView style={styles.background}>
        <View style={styles.body}>
          <Input
            placeholder="Email"
            // leftIcon={<Icon name="user" size={24} color="black" />}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            placeholder=" Password"
            secureTextEntry={true}
            // leftIcon={<Icon name="lock" size={24} color="black" />}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <Button
            onPress={this.onPressLogin.bind(this)}
            style={styles.buttonStyle}
            title="Login"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff"
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: "50%",
    marginLeft: 60,
    marginRight: 60
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20
  },
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 5,
    marginLeft: 50,
    marginRight: 50,
    margin: 20
  }
});
