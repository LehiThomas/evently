import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

// Components
import CreateEvent from './app/components/CreateEvent/CreateEvent';
import Events from './app/components/Events/Events';
import EventDetails from './app/components/EventDetails/EventDetails';

export default class evently extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <RootNavigator />
    );
  }
}

const RootNavigator = StackNavigator({
  Home: { screen: CreateEvent },
  Events: { screen: Events },
  EventDetails: { screen: EventDetails }
});

AppRegistry.registerComponent('evently', () => evently);