/**
 * file name: SplashScreen.js
 * description: Displays the very first screen of the app
 */

 import React, { Component } from "react";
 import { 
     View,
     StatusBar,
     Image,
     StyleSheet, 
     Text,
 } from "react-native";
 import { HEIGHT, WIDTH } from "../constants/constants";
 import { withNavigation } from "react-navigation";
 
 class SplashScreen extends Component {
     constructor(props) {
         super(props);
     }
     
     // this returns what needs to be displayed when you enter a screen
     render() {
 
         // sets a timeout of 2 seconds and then navigates to RecordingScreen
         setTimeout(() => {
             this.props.navigation.navigate('RecordingScreen')
         }, 2000);
 
         return (
             <View>
                 <StatusBar hidden />
                 <View style={styles.ImageWrapperView}>
                     <Image
                         source={require('../assets/images/logo.png')}
                         style={styles.Logo}
                         fadeDuration={750} //only android :(
                     />
                 </View>
             </View>
             
         )
     }
 }
 
 // CSS styles for components
 const styles = StyleSheet.create({
     ImageWrapperView: {
         backgroundColor: 'white',
         justifyContent: 'center',
         alignItems: 'center',
     },
     Logo: {
         height: HEIGHT,
         width: WIDTH,
         resizeMode: 'center',
     }
 });
 
 
 export default withNavigation(SplashScreen);