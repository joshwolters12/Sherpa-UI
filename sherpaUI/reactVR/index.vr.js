import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Scene, VrHeadModel, Image, VrButton, Text, Animated } from 'react-vr';
import TextFrame from './components/text-frame.vr.js';
import TitleFrame from './components/title-frame.vr.js';
import JumpButton from './components/jump-button.vr.js';

const data = require('./obj.json');


export default class reactVR extends Component {
  constructor() {
    super();
    this.state = data;
    this.state.sceneRotateY = data.currFrame === 'front' ? new Animated.Value(0) :
                              data.currFrame === 'right' ? new Animated.Value(90) :
                              data.currFrame === 'back'  ? new Animated.Value(180) : new Animated.Value(270);
    // this.state.rotateOrigin = data.currFrame === 'front' ? 0 :
    //                           data.currFrame === 'right' ? 90 :
    //                           data.currFrame === 'back'  ? 180 : 270;

    this.state.frontTransformation = {
      translate: [-2.5, 1.5, -5],
      leftTranslate: [-5.5, 0, -5],
      rightTranslate: [.5, 0, -5],
      rotateY: 0
    }
    this.state.rightTransformation = {
      translate: [2.5, 1.5, 0],
      leftTranslate: [2.5, 0, -3],
      rightTranslate: [2.5, 0, 3],
      rotateY: 270
    }
    this.state.backTransformation = {
      translate: [-2.5, 1.5, 5],
      leftTranslate: [.5, 0, 5],
      rightTranslate: [-5.5, 0, 5],
      rotateY: 180
    }
    this.state.leftTransformation = {
      translate: [-7.5, 1.5, 0],
      leftTranslate: [-7.5, 0, 3],
      rightTranslate: [-7.5, 0, -3],
      rotateY: 90
    }

    this.navigateY = this.navigateY.bind(this);
    this.changeScene = this.changeScene.bind(this);
  }

  changeScene(scene) {
    let newState = Object.assign({}, this.state);
    newState.currScene = scene;
    this.setState(newState);
  }

  printLocation() {
    console.log('rotationOfHeadMatrix: ', VrHeadModel.rotationOfHeadMatrix()[1]*180/Math.PI, 
                'rotation: ', VrHeadModel.rotation()[1], 
                'yawPitchRoll: ',VrHeadModel.yawPitchRoll()[1])
    console.log('fromZeroOrigin: ', 360 - (VrHeadModel.rotationOfHeadMatrix()[1]*180/Math.PI - this.state.rotateOrigin));//I think this maybe wrong. trying to convert left pos rotation from last rotation to right pos rotation from originfront

  }

  navigateY(frameDeg, direction) {
    // let fromZeroOrigin = 360 - (VrHeadModel.rotationOfHeadMatrix()[1]*180/Math.PI - this.state.rotateOrigin);//I think this maybe wrong. trying to convert left pos rotation from last rotation to right pos rotation from originfront
    // while(fromZeroOrigin >= 360) fromZeroOrigin - 360;
    // while(fromZeroOrigin < 0 ) fromZeroOrigin + 360;

    // let newOrigin = Object.assign({}, this.state);
    // newOrigin.rotateOrigin = frameDeg-direction*90;
    // this.setState(newOrigin);

    // let change = fromZeroOrigin-frameDeg-direction*90
    // console.log('frameDeg: ',frameDeg);
    // console.log('rotationOfHeadMatrix: ', VrHeadModel.rotationOfHeadMatrix()[1]*180/Math.PI )
    // console.log('frameDeg - fromZeroOrigin: ', frameDeg - fromZeroOrigin)
    Animated.timing(
      this.state.sceneRotateY,
      { toValue: this.state.sceneRotateY._value-direction*90,
        duration: 2000
      }
    ).start();
  }

  componentDidMount(){
    VrHeadModel.rotationOfHeadMatrix();
    VrHeadModel.rotation();
    VrHeadModel.yawPitchRoll();

  }

  render() {
    {/*build jump buttons*/}
    let jumpButtons = [];
    let i = 0;
    for(let key in this.state.scenes){
      if(key !== this.state.currScene){
        jumpButtons.push(
          <JumpButton key={i}
                      scene={key}
                      changeScene={this.changeScene}
                      imageURL={this.state.scenes[key].imageURL}/>
        )
      }
      i++;
    }
    {/*build jump buttons*/}
    
    {/*build four frames*/}
    let frames = [];
    i = 0;
    for(let key in this.state.scenes[this.state.currScene].frames){
      let frame = this.state.scenes[this.state.currScene].frames[key];
      if(frame.template === 'TitleFrame'){
        frames.push(
          <TitleFrame key={i}
                      navigateY={this.navigateY}
                      transformation={this.state[key+'Transformation']}
                      title={this.state.scenes[this.state.currScene].frames[key].title}
                      subtitle={this.state.scenes[this.state.currScene].frames[key].subtitle} 
          />
        )
      }
      else if(frame.template === 'TextFrame'){
        frames.push(
          <TextFrame key={i}
                     navigateY={this.navigateY}
                     transformation={this.state[key+'Transformation']}
                     title={this.state.scenes[this.state.currScene].frames[key].title}
                     text={this.state.scenes[this.state.currScene].frames[key].text} 
          />
        )
      }
      i++;
    }
    {/*build four frames*/}
  
    return (
      <Animated.View style={{ transform: [{rotateY: this.state.sceneRotateY}] }}>
          <Pano source={asset(this.state.scenes[this.state.currScene].imageURL)}></Pano>

          <VrButton onClick={() => this.printLocation()}
                    style={{transform: [{translate: [0,-1.78,-5]},{rotateY: 0}]}}>
            <Text style={{color:'black'}}>{'location'}</Text>  
          </VrButton>
          <VrButton onClick={() => this.printLocation()}
                    style={{transform: [{translate: [5,-1.5,0]},{rotateY: 270}]}}>
            <Text style={{color:'black'}}>{'location'}</Text>  
          </VrButton>
          <VrButton onClick={() => this.printLocation()}
                    style={{transform: [{translate: [0,-1.5,5]},{rotateY: 180}]}}>
            <Text style={{color:'black'}}>{'location'}</Text>  
          </VrButton>
          <VrButton onClick={() => this.printLocation()}
                    style={{transform: [{translate: [-5,-1.5,0]},{rotateY: 90}]}}>
            <Text style={{color:'black'}}>{'location'}</Text>  
          </VrButton>

          {jumpButtons}
          {frames}

      </Animated.View>
    )
  }
}

AppRegistry.registerComponent('reactVR', () => reactVR);