import React, { Component } from 'react';
import { View, Text, VrButton, Image, asset } from 'react-vr';


export default class JumpButton extends Component {

  render() {
    let x = this.props.transformation.translate[0] //+ this.props.frame === 'front' ?  -1 : 
                                      //this.props.frame === 'back' ? 1 : 0;
    let y = this.props.transformation.translate[1];
    let z = this.props.transformation.translate[2] //+ this.props.frame === 'right' ? -1 :
                                      //this.props.frame === 'left' ? 1 : 0;
    return (
        <VrButton onClick={()=>this.props.changeScene(this.props.scene)}
                  style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderColor: 'black',
                      borderStyle: 'solid',
                      borderWidth: .005,
                      borderRadius: 0.00,
                      width: .8,
                      height: .2,
                      justifyContent: 'center',
                      transform: [
                        {translate: [x, y, z]},,
                        {rotateY: this.props.transformation.rotateY},
                      ]
                  }}>
            <Text style={{
                    textAlign: 'center',
                    fontSize: .1,
                    fontWeight: 'bold',
                  }}
            >{this.props.scene}
            </Text>
        </VrButton>
    )
  }
};