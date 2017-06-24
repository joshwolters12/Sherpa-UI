import React, { Component } from 'react';

class Canvas extends Component {
    componentDidMount(){
        
    }
    render() {
        return (
            <div style={styles.canvas}>
                <iframe
                    style={styles.iframe}
                    src={this.props.loadURL}
                    >
                </iframe>
                <div 
                style={styles.openWindow}
                onClick={this.props.openWindow}>
                </div>
                
            </div>
        )
    }
}

let styles = {
    canvas: {
        backgroundColor: 'grey',
        width: '55%',
        height: 'auto',
        minWidth: '300px',
        margin: '0.5% 0',
        position:'relative'
    },
    iframe: {
        width: '100%',
        height: '100%',
        borderWidth: '0px',
        borderRadius: '3px',
        borderColor: 'black'
    },
    openWindow:{
        position: 'absolute',
        height: '60px',
        width: '60px',
        backgroundColor: 'transparent',
        right: '15px',
        bottom: '15px',
        cursor: 'pointer'
    }
}

export default Canvas;