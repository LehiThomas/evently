import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';


export default class CreateEvent extends Component {
    constructor() {
        super();
        this.state={
            titleValue: ""
        };
    }

    onChangeText(value){
        this.setState({
            textValue:value
        });
    }

    onSubmit(){
        console.log("Submitted");
    }

    static navigationOptions = {
        title: 'Create Event',
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Enter Title"
                        onChangeText={(value) => this.onChangeText(value)}
                        //onSubmitEditing={this.onSubmit}
                    />
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Enter Owner"
                        onChangeText={(value) => this.onChangeText(value)}
                        //onSubmitEditing={this.onSubmit}
                    />
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Enter Number of Slots"
                        keyboardType = 'numeric'
                        onChangeText={(value) => this.onChangeText(value)}
                        //onSubmitEditing={this.onSubmit}
                    />
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Enter Tags (Comma Separated)"
                        onChangeText={(value) => this.onChangeText(value)}
                        //onSubmitEditing={this.onSubmit}
                    />
                    <Button 
                        style={styles.eventsButton} 
                        title="Create Event" 
                        onPress={() => this.onSubmit()} 
                    />
                </View>
                <TouchableOpacity 
                    style={styles.eventsButton}
                    onPress={() => navigate('Events')} >
                    <View>
                        <Text style={styles.buttonText}>Events</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
  }

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    
    form: {
        flex: 1,
        marginTop:30
    },

    formInput:{
        backgroundColor: "#fcf792"
    },

    eventsButton: {
        backgroundColor:'green',
        padding:5,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "500"
    }
})

AppRegistry.registerComponent('CreateEvent', () => CreateEvent);