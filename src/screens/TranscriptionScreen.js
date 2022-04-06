import React, {Component} from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { HEIGHT, WIDTH } from "../constants/constants";

const questionList = ['Question 1', 'Question 2', 'Question 3'];

const getTranscriptionObj = {
	transcription: [
		{
			question: "Question1",
			answer: "Answer1",
		},
		{
			question: "Question2",
			answer: "Answer2",
		}
	]
}


export default class TranscriptionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        // MAKE CALL TO getTranscription() using hooks
    }

    async getTranscription() {
        try {
            this.setState({
                isLoading: true,
            })

            // MAKE API CALL HERE
            let obj = {};

            this.setState({
                isLoading: false,
                transcriptionObj: obj,
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View>
                
                <View style={[styles.QuestionsHeadingView, {marginTop: 0.01 * HEIGHT}]}>
                    <Text style={styles.QuestionsHeadingText}>Transcription</Text>
                </View>

                <View style={[styles.QuestionsHeadingView, {marginTop: 0.03 * HEIGHT}]}>
                    {getTranscriptionObj['transcription'].map((obj) => {
                        return (
                            <View key={obj} style={[styles.QuestionsHeadingView, {marginTop: 0.04 * HEIGHT, width: 0.8 * WIDTH}]}>
                                <Text style={[styles.QuestionsHeadingText, {fontSize: 18,}]}>{obj["question"]}</Text>
                                <Text style={[styles.QuestionsHeadingText, {fontSize: 18,}]}>{obj["answer"]}</Text>
                            </View>
                        );
                    })}
                </View>


                <TouchableOpacity onPress={() => this.props.navigation.navigate('RecordingListeningScreen')}>
                    <View style={[styles.RecordButtonView, styles.UploadButtonView, {backgroundColor: '#F5CE62', marginTop: 0.12 * HEIGHT}]}>
                        <Text style={styles.RecordButtonText}>
                            Previous
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
        backgroundColor: "#2EE86C",
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