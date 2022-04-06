/**
 * file name: AppContainer.js
 * description: This is the main app screen from where all other screens of the app are called and rendered
 */
 import { createAppContainer, createSwitchNavigator } from 'react-navigation';
 import SplashScreen from './screens/SplashScreen';
 import RecordingScreen from './screens/RecordingScreen';
 import RecordingListeningScreen from './screens/RecordingListeningScreen';
 import TranscriptionScreen from './screens/TranscriptionScreen';
 import React, { Component } from 'react';
 
 // this is where you put all the screens of the mobile app - it is the main navigator object which helps in switching screens
 const switchNavigator = createSwitchNavigator({
     Splash: SplashScreen,
     RecordingScreen: RecordingScreen,
     RecordingListeningScreen: RecordingListeningScreen,
     TranscriptionScreen: TranscriptionScreen,
     },
     {
         initialRouteName: 'Splash',
         transitionSpec: {
             duration: 400,
         },
     }
 );
 
 // initializing the app container which stores the navigator
 // You can find more at: https://reactnavigation.org/docs/hello-react-navigation
 const App = createAppContainer(switchNavigator);
 
 export default class AppContainer extends Component {
     render() {
         return <App />
     }
 }