/**
 * Created by rob on 6/3/16.
 */

import React from "react";
import TextField from 'material-ui/TextField';
    

export class Simple extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (<p>{this.props.item.vars.body.value}</p>)
    }
}


export class Form extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (<TextField
            fullWidth={true}
            hintText="Help them here!"
            multiLine={true}
            rows={4}
            rowsMax={6}
        />)
    }
}


export class Questionnaire extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<TextField
            fullWidth={true}
            hintText="Tell us why???"
            multiLine={true}
            rows={4}
            rowsMax={6}
        />)
    }
}