import React, { Component } from 'react';
import { Image, View, UIManager, findNodeHandle, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const settingsIcon = require("../assets/imgs/dots_white.png");
const ICON_SIZE = 24

export default class PopupMenu extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      icon: null
    }
  }

  onError () {
    console.log('Popup Error')
  }

  onPress = () => {
 
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    
  }

  render () {
    return (
      <View>
        <TouchableOpacity style={styles.icon} onPress={this.onPress}>
          <Image style={styles.image} source={settingsIcon} ref={this.onRef}/>
        </TouchableOpacity>
      </View>
    )
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({icon})
    }
  }
}

const styles = StyleSheet.create({
  icon: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  image:{
    width: 32,
    height: 32,
    alignSelf: "center",
  },
});