import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight} from 'react-native';
import axios from 'axios';

const users = [
    {name: 'Lehi'},
    {name: 'Tyler'},
    {name: 'Joe'}
]

export default class Events extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            eventsDataSource: ds,
        };
    }

    componentDidMount(){
        this.getEvents();
    }

    getEvents(){
        axios.get('http://45.55.247.237:3003/events')
        .then( response => {
            console.log("Response received");
          this.setState({
            eventsDataSource: this.state.eventsDataSource.cloneWithRows(response.data)
          });
        })
        .catch( error => {
          console.log('Error fetching and parsing data', error);
      });
    }

    onPress(event){
        console.log(event);
        const { navigate } = this.props.navigation;
        //this.props.navigator.push({
           // id: 'component6',
           // event: event
        //});
        navigate('EventDetails', { event: event } );
    }

    renderRow(event){
        return(
            <TouchableHighlight onPress={() => {this.onPress(event)}}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{event.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    static navigationOptions = {
        title: 'Events',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ListView 
            style={styles.container}
            dataSource={this.state.eventsDataSource}
            renderRow={this.renderRow.bind(this)}
          />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#0275ea",
    },
    row: {
        flexDirection:'row',
        backgroundColor: "#fcf792",
        justifyContent:'center',
        padding:10,
        marginBottom:3
    },
    rowText: {
        flex:1,
    }
})

AppRegistry.registerComponent('Events', () => Events);