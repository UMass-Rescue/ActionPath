import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { HEIGHT, WIDTH } from "../constants/constants";
import { Divider } from 'react-native-paper';

const questionList = ['Question 1', 'Question 2', 'Question 3'];

export default class RecordingScreen extends Component {
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
        }
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }

    onStartRecord = async () => {

        const path = 'hello.m4a';
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('audioSet', audioSet);
        const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            this.setState({
                recordSecs: e.current_position,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
        });
        console.log(`uri: ${uri}`);
    };

    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
        });
        console.log(result);
    };


    onStartPlay = async (e) => {
        console.log('onStartPlay');
        const path = 'hello.m4a'
        const msg = await this.audioRecorderPlayer.startPlayer(path);
        this.audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.audioRecorderPlayer.stopPlayer();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
        });
    };

    onPausePlay = async (e) => {
        await this.audioRecorderPlayer.pausePlayer();
    };

    onStopPlay = async (e) => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
    };

    render() {
        return (
            <View>
                <View style={styles.RecordingTimerView}>
                    <Text style={styles.RecordingTimerText}>
                        Recording time: {this.state.recordTime}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => this.onStartRecord()}>
                    <View style={styles.RecordButtonView}>
                        <Text style={styles.RecordButtonText}>
                            Start Recording
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.RecordButtonView}>
                        <Text style={styles.RecordButtonText}>
                            {this.state.isPaused ? (
                                `Resume Recording`
                            ) : (
                                `Pause Recording`
                            )}

                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onStopRecord()}>
                    <View style={styles.RecordButtonView}>
                        <Text style={styles.RecordButtonText}>
                            Stop Recording
                        </Text>
                    </View>
                </TouchableOpacity>

                <Divider style={{ height: 7, marginTop: 0.02 * HEIGHT }} />

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

                <TouchableOpacity onPress={() => this.props.navigation.navigate('RecordingListeningScreen')}>
                    <View style={[styles.RecordButtonView, styles.UploadButtonView]}>
                        <Text style={styles.RecordButtonText}>
                            Save Recording
                        </Text>
                    </View>
                </TouchableOpacity>

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