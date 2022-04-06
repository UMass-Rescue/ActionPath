import React, { Component } from "react";
import AppContainer from "./src/AppContainer";
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <PaperProvider>
                    <AppContainer />
                </PaperProvider>
            </NavigationContainer>
        )
    }
}
