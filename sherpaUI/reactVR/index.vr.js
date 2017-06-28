import React, { Component } from 'react';
import { AppRegistry, asset, Pano, View, Scene, VrHeadModel, Image } from 'react-vr';
import TextFrame from './components/text-frame.vr.js';
import TitleFrame from './components/title-frame.vr.js';
import JumpButton from './components/jump-button.vr.js';

const data = require('./obj.json');




export default class reactVR extends Component {
  constructor() {
    super();
    this.state = data;
    this.state.sceneRotateY = data.currFrame === 'front' ? 0   :
                              data.currFrame === 'right' ? 270 :
                              data.currFrame === 'back'  ? 180 : 90;

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

  navigateY(frameDeg, direction) {
    let rotationY = VrHeadModel.yawPitchRoll()[1];
    while(rotationY >= 360) rotationY-=360;
    while(rotationY < 0) rotationY+=360;
    let goTo = frameDeg + direction*90;
    while(goTo >= 360) goTo-=360;
    while(goTo < 0) goTo+=360;
    let degToRot = goTo - rotationY;
    let updateSceneRotateY = this.state.sceneRotateY+degToRot;
    while(updateSceneRotateY >= 360) updateSceneRotateY-=360;
    while(updateSceneRotateY < 0) updateSceneRotateY+=360;
    this.setState({sceneRotateY: updateSceneRotateY});
  }

  componentDidMount(){
    console.log('component did mount');
    console.log('current rotation: ', VrHeadModel.rotation());
    console.log('current yawPitchRoll: ', VrHeadModel.yawPitchRoll());
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
      <Scene style={{ transform: [{rotateY: this.state.sceneRotateY}] }}>
          <Pano source={asset(this.state.scenes[this.state.currScene].imageURL)}></Pano>

          {jumpButtons}
          {frames}

      </Scene>
    )
  }
}

AppRegistry.registerComponent('reactVR', () => reactVR);