import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Fallback = () => {
  return (
    <View style={{ alignItems: "center"}}>
        <Image 
        source={require("../../assets/list.png")}
        style={{height:320, width:320}}
        />
        <Text>Start Adding Your Task</Text>
    </View>
  )
}

export default Fallback

const styles = StyleSheet.create({})