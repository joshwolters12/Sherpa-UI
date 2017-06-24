import React, { Component } from 'react';

class Scene extends Component {
    render() {
        let scenes = <div style={styles.scene}>S1</div>
        return (
            <div style = {styles.sceneContainer}>
                {scenes}
            </div>
        )
    }
}

let styles = {
  sceneContainer: {
    height: '100%',
    width:'5%',
    minWidth: '50px',
    backgroundColor: '#1e2538',
    padding: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  scene: {
      margin: '5px auto',
      height: '50px',
      width: '85%',
      maxWidth: '50px',
      backgroundColor: '#181b2a',
      borderRadius:'3px',
      color: '#707f9c',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  }
}

export default Scene;