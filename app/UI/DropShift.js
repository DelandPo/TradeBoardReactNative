import React from 'react';
import { View,TouchableHighlight, Text, ToastAndroid} from 'react-native';
import {
  ActionSheetCell,
  ButtonCell,
  createValidator,
  DatePickerCell,
  emailValidator,
  Form,
  PushButtonCell,
  Section,
  SwitchCell,
  TextInputCell,
} from 'react-native-forms';

import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    Grid,
    Col,
    Row,
    Header,
    Footer,
    Left,
    Right,
    StyleProvider,
    Title
  } from 'native-base'

import firebase from 'Firebase/Firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from 'Styles/Styles'

export default class DropShift extends React.Component{

    onValidationError(ref,message){}
    handleChange(ref,change){}
    handlePress(ref){}
    
    renderSubmitButton(navigate){
        return(
            <TouchableHighlight style = {Styles.MainViewButton}
                onPress = {()=>{
                    this.postListings(),
                    navigate('Home')
                }}
                >
                <Text style = {Styles.MainViewButtonText}>
                    Submit
                    </Text>
                </TouchableHighlight>
        )
    }

    postListings(){
        firebase.database().ref('Listings/'+ 'Vizlab/').update({
            0:this.form.getData()["ShiftDetails"],
        })
    }


    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style = {{flex:1,backgroundColor:'#EFEFF4'}}>
                <Form
                    ref = {(ref)=> {this.form = ref;}}
                    onPress = {this.handlePress.bind(this)}
                    onChange = {this.handleChange.bind(this)}
                    ren = {this.renderSubmitButton.bind(this)}
                >
                <Section
                    ref = {'ShiftDetails'}
                    title = {'Enter Your Shift Details'}
                >
                <TextInputCell
                    ref = {'Title'}
                    inputProps = {{placeholder: "Tell us what you were supposed to work on"}}
                />
                <TextInputCell
                    ref = {'Start Time'}
                    inputProps = {{placeholder: 'Start Time'}}
                />
                <TextInputCell
                    ref = {'End Time'}
                    inputProps = {{placeholder: 'End Time'}}
                />
                <TextInputCell
                    ref = {'Date'}
                    inputProps = {{placeholder: 'Date(mm/dd/yyyy)'}}
                />
                <TextInputCell
                    ref = {'Hours'}
                    inputProps = {{placeholder: 'How long were you supposed to work?'}}
                />
                </Section>

                <Grid>
                    <Col size = {1}></Col>
                    {this.renderSubmitButton(navigate)}
                    <Col size = {1}></Col>
                </Grid>

            </Form>
            
        </View>

        )
    }



}