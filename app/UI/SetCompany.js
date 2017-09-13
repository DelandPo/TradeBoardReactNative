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

export default class SetCompany extends React.Component {

  onValidationError(ref, message) {
    console.log(ref, message);
  }

  handleChange(ref, change) {
    console.log(ref, change);
  }

  handlePress(ref) {
    if (ref === 'LogData') {
      console.log(this.form.getData());
      ToastAndroid.show(this.form.getData(),1)
    } else if (ref === 'LogValidationErrors') {
      console.log(this.form.getValidationErrors());
    }
  }

  renderSubmitButton(ref){
    const {navigate} = this.props.navigation;
    return(
        <TouchableHighlight style = {Styles.MainViewButton}
            onPress = {()=>{
                this.updateCompanyAvailableListings(this.form.getData()["CompanyDetails"].CompanyName),
                firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).update({
                 Company:this.form.getData(),
                });
                navigate('Home');
              }
            }
            >
            <Text style = {Styles.MainViewButtonText}>
                Submit
            </Text>
        </TouchableHighlight>
    )
}

updateCompanyAvailableListings(CompanyName){
  firebase.database().ref('/AvailableCompanies/'+CompanyName+'/').update({
    Name : CompanyName
  })
}


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EFEFF4' }}>
        <Form
          ref={(ref) => { this.form = ref; }}
          onPress={this.handlePress.bind(this)}
          onChange={this.handleChange.bind(this)}
          ren = {this.renderSubmitButton.bind(this)}
        >
          <Section
            ref={'CompanyDetails'}
            title={'Set up your Company Details'}
           /* helpText={'The helpText prop allows you to place text at the section bottom.'}*/
          >
         
            <TextInputCell
              ref="CompanyName"
              inputProps={{ placeholder: 'Company Name' }}
            />
            
            <TextInputCell
                ref = "City"
                inputProps = {{placeholder: 'City'}}
                />
            <TextInputCell
                ref = "State"
                inputProps = {{placeholder: 'State'}}
                />
            <TextInputCell
                ref = "Country"
                inputProps = {{placeholder: 'Country'}}
                />
            <TextInputCell
                ref = "Zipcode"
                inputProps = {{placeholder: 'ZipCode'}}
                
           />
          </Section>
        <Grid>
        <Col size = {1}></Col>
        {this.renderSubmitButton()}
        <Col size={1}></Col>
        </Grid>
        </Form>
      
      </View>
    );
  }
}


