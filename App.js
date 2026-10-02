import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import Navigation from "./navigation";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Navigation />
    </Provider>
  );
}