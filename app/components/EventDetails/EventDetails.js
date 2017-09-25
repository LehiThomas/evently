import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, Navigator} from 'react-native';
import axios from 'axios';

export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        const event = this.props.navigation.state.params.event;
        this.state = {
            title: event.title,
            slots: event.slots,
            startTime: event.startTime,
            participants: event.participants,
            tags: event.tags,
            owner: event.owner,
            id: event._id
        };
    }

    displayTags(){
        this.state.tags.map((tag, index) => {
            return (
                (<View><Text>{tag} </Text></View>)
            )
        });
    }

    static navigationOptions = {
        title: 'Event Page',
    }

    getCountDown() {
        const _second = 1000;
        const _minute = _second * 60;
        const _hour = _minute * 60;
        const _day = _hour * 24;
        
        const now = new Date();
        const distance = this.state.startTime - now;
        
        if(distance < 0) {
            return "EXPIRED";
        }
        
        const days = Math.floor(distance / _day);
        const hours = Math.floor((distance % _day) / _hour);
        const minutes = Math.floor((distance % _hour) / _minute);
        
        let timer = `${days}d ${hours}hr ${minutes}min`;
        
        return timer;
    }

    getDateString(milli){
        const datetime = new Date(milli);
        const days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
        const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
        
        const day = days[datetime.getDay()];
        const month = months[datetime.getMonth()];
        const date = datetime.getDate();
        const year = datetime.getFullYear();
        const hours = datetime.getHours() > 12 ? (datetime.getHours() - 12) : datetime.getHours();
        const minutes = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        const timezone = datetime.toString().match(/\((.*)\)/).pop();
        const am = "AM";
        const pm = "PM";
        
        let dateString = `${day} ${month} ${date}, ${year} ${hours}:${minutes} ${datetime.getHours() < 12 ? am : pm} (${timezone})`;
        return dateString;
    }

    render() {
        return (
          <View>
              <View style={styles.textContainer}>
                <Text style={styles.textField}>Title: {this.state.title}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textField}>Start time: {this.getDateString(this.state.startTime)}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textField}>Starts in: {this.getCountDown()}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textField}>Tags: </Text>
                {this.state.tags.map((value, index) => {
                    return (
                        <Text style={styles.subText} key={index}>
                            {value}
                        </Text>
                    );
                    })
                }
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textField}>Participants: </Text>
                {this.state.participants.map((value, index) => {
                    return (
                        <Text style={styles.subText} key={index}>
                            {value.name}
                        </Text>
                    );
                    })
                }
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer:{
        backgroundColor:'#f4f4f4',
        margin:5
    },

    textField: {
        fontSize: 20,
        fontWeight: "500"
    },

    subText: {
        fontSize: 20,
        marginLeft:35
    }
})

AppRegistry.registerComponent('EventDetails', () => EventDetails);