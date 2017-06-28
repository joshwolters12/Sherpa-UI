import React, { Component } from 'react';
import CoordinatesAndScaling from '../components/CoordinatesAndScaling';
import Project from '../components/Project';

class Properties extends Component {
    render() {
        let styles = {
            properties: {
                height: 'auto',
                width: '25%',
                minWidth: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                margin: '0.5%'
            }

        }
        let template = this.props.data.scenes[this.props.data.currScene].frames[this.props.data.currFrame].template
        console.log(template)
        return (
            <div style={styles.properties}>
                <CoordinatesAndScaling
                    data={this.props.data}
                    updateProperties={this.props.updateProperties}
                    writeToFile = {this.props.writeToFile}
                />
            </div>
        )
    }
}

export default Properties;