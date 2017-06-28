import React, { Component } from 'react';
import Attribute from '../components/Attribute';

class TextFrame extends Component {
    render() {
        return (
            <div style={styles.properties}>
                <Attribute 
                data={this.props.data}
                updateProperties = {this.props.updateProperties}
                writeToFile = {this.props.writeToFile}
                />
            </div>
        )
    }
}

let styles = {
    properties: {
        width: '100%',
        height: 'auto'
        
    }
}

export default TextFrame;