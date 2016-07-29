import React from "react";
var AltContainer = require('alt-container');
var axios = require('axios');
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';


import * as widgets from '../common/components/Widgets';
import wf from "../stores/Workflow";
import actions from "../actions/Workflow";





export function buildForm(someForm) {



    return someForm.map(each =>{
        if (each.typeName=='string')
            return (<TextField key={each.id} name={each.id} hintText={each.label}/>);
        if (each.typeName=='boolean')
            return (<Checkbox key={each.id} name={each.id} label={each.label}/>);
    })

}


class TaskList extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (<ul>
            {this.props.wf.items.map((each)=> {
                    var form = buildForm(each.form);
                    return (
                    <Card key={each.cid}>>
                        <CardHeader title=  {each.title}/>
                        <CardText>
                            {form}
                        </CardText>
                        <ActionList item={each} />
                    </Card>
                );
            })}

        </ul>);

    }
}


class ActionList extends React.Component{

    constructor(props) {
        super(props);
    }

    handleClick(item, vars) {

        console.log('>>>>>>>>>>>>>', item, vars);

        var payload = {"variables": { "body": {"value":"Actually, I need some help with this","type":"String"}}};
        if (vars)
            payload.variables[vars.variableName] = {type:"String", value:vars.variableValue};

        payload.ackId = item.cid;
        actions.delete(item.cid);

        axios.post(item.action, payload)
            .then(function (response) {console.log(response);})
            .catch(function (response) {console.log(response);});
    }


    render() {
        var controls;
        if (this.props.item.style =='simple')
            controls = <FlatButton onClick={ this.handleClick.bind(this, this.props.item)} label="Done" />
        else
            controls = this.props.item.outs.map((each)=>{
                return <FlatButton key={each.variableValue} onClick={ this.handleClick.bind(this, this.props.item, each)} label={each.conditionName} />});


        return(<CardActions>{controls}</CardActions>);


    }


}


export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <AppBar
                    title="Some work flows!"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <AltContainer stores={{wf:wf}}>
                    <TaskList/>
                </AltContainer>
            </div>
        );
    }
}
