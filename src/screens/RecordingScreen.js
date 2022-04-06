import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button,
    ScrollView,
} from "react-native";
import { HEIGHT, WIDTH } from "../constants/constants";
import { Divider } from 'react-native-paper';
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";


const questionList = ['Question 1', 'Question 2', 'Question 3'];

export default function RecordingScreen() {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY, 
                );

                setRecording(recording);
            } else {
                setMessage("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log(uri);

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);
    }

    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return (
                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
                    <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
                </View>
            );
        });
    }

    return (
        <ScrollView>

            <View style={styles.container}>
                <Text>{message}</Text>

                <TouchableOpacity onPress={startRecording}>
                    <View style={styles.RecordButtonView}>
                        <Text style={styles.RecordButtonText}>
                            Start
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={stopRecording}>
                    <View style={styles.RecordButtonView}>
                        <Text style={styles.RecordButtonText}>
                            Stop
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('RecordingListeningScreen', { recordings: recordings })}>
                    <View style={[styles.RecordButtonView, styles.UploadButtonView]}>
                        <Text style={styles.RecordButtonText}>
                            Save Recording
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={{marginTop: 0.08 * HEIGHT}}>
                    {getRecordingLines()}
                </View>

                <Divider style={{ height: 7, marginTop: 0.04 * HEIGHT }} />

                <View style={[styles.QuestionsHeadingView, { marginTop: 0.01 * HEIGHT }]}>
                    <Text style={styles.QuestionsHeadingText}>Questions</Text>
                </View>

                <View style={[styles.QuestionsHeadingView, { marginTop: 0.03 * HEIGHT }]}>
                    {questionList.map((question) => {
                        return (
                            <View key={question} style={[styles.QuestionsHeadingView, { marginTop: 0.015 * HEIGHT, width: 0.8 * WIDTH }]}>
                                <Text style={[styles.QuestionsHeadingText, { fontSize: 18, }]}>{question}</Text>
                            </View>
                        );
                    })}
                </View>

            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    RecordButtonView: {
        alignSelf: 'center',
        marginTop: 0.035 * HEIGHT,
        height: 0.07 * HEIGHT,
        width: 0.6 * WIDTH,
        backgroundColor: '#CC354C',
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RecordButtonText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: '500'
    },
    UploadButtonView: {
        backgroundColor: "#F5CE62",
        marginTop: 0.08 * HEIGHT,
    },
    RecordingTimerView: {
        alignSelf: 'center',
        marginTop: 0.02 * HEIGHT,
    },
    RecordingTimerText: {
        fontSize: 26,
        color: '#000',
        fontWeight: '600',
    },
    QuestionsHeadingView: {
        alignItems: 'center',
    },
    QuestionsHeadingText: {
        fontSize: 24,
        color: '#000',
        fontWeight: '600',
    },

});