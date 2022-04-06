import React, {Component} from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { HEIGHT, WIDTH } from "../constants/constants";
import { Divider } from 'react-native-paper';

const getTranscriptionObj = {
	transcription: [
		{
			question: "Question1",
			answer: "Answer1",
		},
		{
			question2: "Question2",
			answer: "Answer2",
		}
	]
}


export default class RecordingListeningScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused: false,
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            submissionSuccessful: false,
        }
    }

    render() {
        return (
            <View>

                <View style={styles.recordingTimerView}>
                    <Text style={styles.recordingTimerText}>
                        Listen recording
                    </Text>
                </View>

                <View style={styles.recordingTimerView}>
                    <Text style={styles.recordingTimerText}>
                        Listening time: {this.state.playTime} / {this.state.duration}
                    </Text>
                </View>
                
                <TouchableOpacity>
                    <View style={styles.RecordButtonView}>
                        <Text style={styles.RecordButtonText}>
                            Start
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.RecordButtonView}>
                        <Text style={styles.RecordButtonText}>
                            Pause
                        </Text>
                    </View>
                </TouchableOpacity>

                <Divider style={{height: 7, marginTop: 0.04 * HEIGHT}}/>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('TranscriptionScreen')}>
                    <View style={[styles.RecordButtonView, styles.UploadButtonView, {marginTop: 0.08 * HEIGHT}]}>
                        <Text style={styles.RecordButtonText}>
                            Transcribe
                        </Text>
                    </View>
                </TouchableOpacity>

                <View>
                    {this.state.submissionSuccessful ? (
                        <View style={styles.recordingTimerView}>
                            <Text style={styles.confirmationText}>Recording submitted for transcription !</Text>
                        </View>
                    ) : null}
                </View>

                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('RecordingScreen')}>
                    <View style={[styles.RecordButtonView, styles.UploadButtonView, {backgroundColor: '#F5CE62', marginTop: 0.12 * HEIGHT}]}>
                        <Text style={styles.RecordButtonText}>
                            Previous
                        </Text>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('TranscriptionScreen')}>
                    <View style={[styles.RecordButtonView, styles.UploadButtonView, {backgroundColor: '#F5CE62'}]}>
                        <Text style={styles.RecordButtonText}>
                            Next
                        </Text>
                    </View>
                </TouchableOpacity> */}

            </View>
        )
    }
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
    },
    UploadButtonView: {
        backgroundColor: "#2EE86C",
        marginTop: 0.04 * HEIGHT,
    },
    recordingTimerView: {
        alignSelf: 'center',
        marginTop: 0.02 * HEIGHT,
    },
    recordingTimerText: {
        fontSize: 22,
    },
    confirmationText: {
        fontSize: 20,
        color: '#11822F',
        fontWeight: '700',
    }
});