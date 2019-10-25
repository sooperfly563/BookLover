import React, { useRef, useEffect, useState, Component } from 'react';
import { View, Text, Button, Image, Dimensions, ImageBackground, ScrollView, Animated,StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { photoCards } from '../constants';
import Modal from "react-native-modal";
import { Card, OverlayLabel } from '../components';
import styles from '../App.styles';
import * as Font from 'expo-font';
import { cacheAssets, cacheFonts } from "../helpers/AssetsCaching";
import {Avatar} from 'react-native-elements';

const Screen_height = Dimensions.get('window').height;
const Screen_width = Dimensions.get('window').width;
const HEADER_MAX_HEIGHT = Screen_height/1.4;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class Swipes extends Component {

    constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fontLoaded: false,
      currentItem: null,
      scrollY: new Animated.Value(0),
    };
  }
   async componentDidMount(){ //Load the font
      await Font.loadAsync({
        'Pacifico': require('../assets/pacifico/Pacifico.ttf'),
        'Anton' : require('../assets/Anton/Anton-Regular.ttf'),
        'Lato-R' : require('../assets/Lato/Lato-Regular.ttf')
      }).then(() => {
      this.setState({fontLoaded: true})
    })
    }
  toggleModal = (card) => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    currentItem:card
  });
  };
  render() {
    const headerHeight = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  });
 return (
    <View>
    <View style={styless.mainHeader}>
    {this.state.fontLoaded === true ? (<Text style={{ fontSize: 40, fontFamily:'Pacifico'}}>BookLover</Text>) : (<Text>holup</Text>)}
    </View>
      <View style={styles.swiperContainer}>
        <Swiper
          animateCardOpacity
          containerStyle={styles.container}
          cards={photoCards}
          renderCard={card => <Card card={card}/>}
          // onTapCard={()=>this.toggleModal({photo:card.photo, name:card.name})}/>}
          onTapCard={(index=>this.toggleModal({photo:photoCards[index].photo, name:photoCards[index].name, summary:photoCards[index].summary}))}//
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          infinite
          disableTopSwipe={true}
          disableBottomSwipe={true}
          showSecondCard
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: <OverlayLabel label="HAVE NOT READ" color="#E5566D" />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'YES',
              element: <OverlayLabel label="HAVE READ" color="#4CCC93" />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}>
        </Swiper>
      </View>
      <View style={{alignItems:'center', justifyContent:'flex-start'}}>
      {this.state.currentItem && <Modal
          animationType="slide"
          transparent={true}
          style={{}}
          visible={this.state.modalVisible}
          onRequestClose={() => {
         //   this.toggleModal(null)}
          }}>
            <ScrollView
                style={{flex: 1, width:Screen_width, height: Screen_height/0.99, alignSelf:'center', position: 'absolute'}} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}>
          <View style={{alignItems:'center', justifyContent:'flex-start'}}>
            <View style={{width:Screen_width, backgroundColor:'rgba(5,5,5,0.8)'}}>
                   <Animated.View style={{alignSelf:'center', height: headerHeight}}>
            <Image source={this.state.currentItem.photo} style={{width: Screen_width/1.2,
                    height: Screen_height/1.4, borderRadius:45}} resizeMode="stretch"/>
            <View style={{position:'absolute', right:0,bottom:0}}>
                      </View>
                    </Animated.View>
                    <View style={{backgroundColor:'white', padding:20}}>
                    <View style={{flexDirection:'row', alignItems:'space-around'}}>
                        <Text style={{fontSize:40, alignSelf:'center', fontFamily:'Anton'}}>  {this.state.currentItem.name}</Text>
                                            <Avatar
                                                rounded
                                                icon={{name: 'arrow-down', type: 'font-awesome'}}
                                                size='medium'
                                                onPress={() => this.toggleModal()}
                                                containerStyle={{alignSelf:'center', justifyContent:'center',
                                                position: 'absolute',                                          
                                                bottom: 0, right: 0, shadowOpacity: 0.5,
                                                shadowRadius: 3,shadowOffset: { width: 0, height: 0 },
                                                shadowColor: '#940000'}}
                                                overlayContainerStyle={{backgroundColor: '#ff1717',}}/>
                                                </View>
                        <Text style={{fontFamily:'Lato-R'}}>{this.state.currentItem.summary}</Text>
                      </View>
            </View>
          </View>
          </ScrollView>
        </Modal>}
        </View>
    </View>
  )}
}

const styless = StyleSheet.create({
  mainHeader: {
    marginTop: 30,
    alignItems: 'center', 
    backgroundColor:'rgb(255, 194, 194)',
    shadowColor: 'rgb(255, 105, 105)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  header: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#03A9F4',
  overflow: 'hidden',
},
bar: {
  marginTop: 28,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
},
title: {
  backgroundColor: 'transparent',
  color: 'white',
  fontSize: 18,
},
scrollViewContent: {
  marginTop: HEADER_MAX_HEIGHT,
},
})

//export default Swipes