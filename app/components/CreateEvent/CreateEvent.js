import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Keyboard} from 'react-native';
import axios from 'axios';

export default class CreateEvent extends Component {
    constructor() {
        super();
        this.state={
            title: "",
	        slots: 0,
	        startTime: 123456789,
	        tags: [],
	        owner: "",
	        id: 0
        };
    }

    onChangeValue(field, value){
        if (field === "slots") {
	    	this.setState({
	            slots: parseInt(value)
            });
        } else {
            this.setState({
                [field]:value
            });
        }
    }

    createTags(tagsString){
		let tagsArray = [];
		tagsArray = tagsString.split(",");
		tagsArray = this.trimTags(tagsArray);
		return tagsArray;
    }
    
    trimTags(tagsArray){
		let trimmedTags = [];
		tagsArray.map( (tag) => { trimmedTags.push(tag.trim().toLowerCase()); });
		return trimmedTags;
	}

    onSubmit(){
        Keyboard.dismiss();
        console.log("Submitted");
        console.log(this.state);
        const { navigate } = this.props.navigation;
        const config = {
            headers: {'Content-Type': 'application/json'}
          };
        axios.post('http://45.55.247.237:3003/events', {
                    "title": this.state.title,
                    "slots": this.state.slots,
                    "startTime": this.state.startTime,
                    "participants": [],
                    "tags": this.state.tags,
                    "owner": {
                        "id": this.state.owner.toUpperCase(), 
                      "name": this.state.owner
                    }
          }, config )
          .then( response => {
              console.log("RESPONSE: ", response);
              this.setState({ id: response.data._id });
          })
          .catch( error => {
              console.log('ERROR:', error.response);
              // error message
        });

        navigate('Events');
    }

    onSubmitTag(tag){
        this.setState({
	        tags: this.state.tags.push(tag)
	    });
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
                        onChangeText={(value) => this.onChangeValue("title", value)}
                        //onSubmitEditing={(value) => this.onChangeValue("title", value)}
                    />
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Enter Owner"
                        onChangeText={(value) => this.onChangeValue("owner", value)}
                        //onSubmitEditing={this.onSubmit}
                    />
                    <TextInput
                        style={styles.formInput}
                        placeholder="Enter Number of Slots"
                        keyboardType = 'numeric'
                        onChangeText={(value) => this.onChangeValue("slots", value)}
                        //onSubmitEditing={this.onSubmit}
                    />
                    <TextInput 
                        style={styles.formInput}
                        placeholder="Enter Tags (Comma Separated)"
                        //onChangeText={(value) => this.onChangeValue("tags", value)}
                        onSubmitEditing={(value) => this.onSubmitTag(value)}
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