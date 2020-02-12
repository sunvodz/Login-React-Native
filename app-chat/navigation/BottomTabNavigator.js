import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import StoryScreen from "../screens/StoryScreen";
import SettingScreen from "../screens/SettingScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Story";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
          // tabBarIcon: ({ focused }) => (
          //   <TabBarIcon
          //     focused={focused}
          //     name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          //   />
          // )
        }}
      />
      <BottomTab.Screen
        name="Story"
        component={StoryScreen}
        options={{
          title: "Story",
          // tabBarIcon: ({ focused }) => (
          //   <TabBarIcon focused={focused} name="ios-document" />
          // )
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "Chat",
          // tabBarIcon: ({ focused }) => (
          //   <TabBarIcon focused={focused} name="md-chatboxes" />
          // )
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: "Setting",
          // tabBarIcon: ({ focused }) => (
          //   <TabBarIcon focused={focused} name="ios-settings" />
          // )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Login":
      return "Chat App";
    case "Story":
      return "Story";
    case "Chat":
      return "Chat Room";
    case "Setting":
      return "Setting";
  }
}
