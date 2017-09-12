import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableHighlight,
} from 'react-native';

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
  Icon,
  Left,
  Right,
  StyleProvider,
  Title
} from 'native-base'

import firebase from 'Services/Firebase/Firebase';
import getTheme from 'TradeBoard/native-base-theme/components';
import material from 'TradeBoard/native-base-theme/variables/material';
import commonColor from 'TradeBoard/native-base-theme/variables/commonColor';
import platform from 'TradeBoard/native-base-theme/variables/platform';
import UserLogin from 'Services/Auth/UserLogin';
import Styles from 'Styles/Styles'
import { NavigationActions } from 'react-navigation'

export default class TradeBoard extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  };
  constructor(props){
    super(props);
    this.state = {
      currentUserGoogle: null,
      currentUserFirebase: null,
      companyNotSetup:true,
    };
  }

  userLoginHandler(userGoogle, userFirebase){
    this.setState({currentUserGoogle:userGoogle,currentUserFirebase:userFirebase});
    this.checkCompany();
  }

  renderPickButton(navigate) {
    return (
          <TouchableHighlight style={Styles.MainViewButton}
            onPress = {() => {
              this.state.companyNotSetup == false?
              // do nothing
              <Text> This is good </Text>
              :
              this.renderSetCompanyAlert(navigate);
            }}
            >
            <Text style={Styles.MainViewButtonText}>
              Pick
            </Text>
          </TouchableHighlight>
    );
  }

  renderTitleText(){
    return(
      <Text style = {Styles.MainTitleText}> TradeBoard </Text>
    )
  }

  renderSetCompany(){
    return (
      this.state.renderSetCompanyButton == true?
      <TouchableHighlight style = {Styles.MainViewButton}
        onPress = {()=>{
        navigate('Company')
        }}
        >
        <Text style = {Styles.MainViewButtonText}>
          Set Company
          </Text>
          </TouchableHighlight>
          :
          null
    )
  }

  renderSetCompanyAlert(navigate){
    Alert.alert(
      'Set up your company profile!',
      'Your profile is incomplete. Please setup your company profile in order to access the services.',
      [
        {text:'Ok', onPress:()=>{
          navigate('Company');
        }},
        {text:'Cancel'}
      ],
      {cancelable : false}
    )
  }
  
  checkCompany(){
    const { navigate } = this.props.navigation;     
    firebase.database().ref('/Users/'+firebase.auth().currentUser.uid).once('value',(snap)=>{
        var Name = snap.val().userName;
        var Email = snap.val().email;
        var Picked = snap.val().numberOfPickedShifts;
        var Dropped = snap.val().numberOfDropedShifts;
        try{
        var Company = snap.val().Company.CompanyDetails;
        if(Company != null){
          this.setState({companySetup:false})
        }
        console.log(Company)}
        catch(ex){
          this.setState({companyNotSetup:true})          
          this.renderSetCompanyAlert(navigate);
        }

      
    });
  
    }
  

  renderDropButton(navigate) {
    return(
      <TouchableHighlight style={Styles.MainViewButton}
        onPress = {
          () => {
            this.state.companyNotSetup == false?
            navigate('DropShift')
            :
            this.renderSetCompanyAlert(navigate);
          }
        }
      >
        <Text style={Styles.MainViewButtonText}>
          Drop
        </Text>
      </TouchableHighlight>
    );
  }

  renderMainPageContent(navigate){
    return (
      
      <Col size={5} style={{
        justifyContent: 'center',
        alignItems: 'center'}}
      >
        <Row size={7.5}>
        </Row>
        <Row size={2}>
          {this.renderTitleText()}
        </Row>
        <Row size={1}></Row>
        <Row size={2}>
          {this.renderDropButton(navigate)}
        </Row>
        <Row size={1}>
          <Text></Text>
        </Row>
        <Row size={2}>
          {this.renderPickButton(navigate)}
        </Row>
        <Row size = {1}></Row>
        <Row size={6}></Row>
      </Col>
    );
  }

	render () {
    const { navigate } = this.props.navigation;    
		return (
  			<Container>
          <Image
            source={require('app/Image/plainred.jpg')}
            style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }}
          >
            <Grid>
              <Col size={1}></Col>
              <UserLogin onLogin={this.userLoginHandler.bind(this)}/>
                {this.renderMainPageContent(navigate)}
              <Col size={1}></Col>
            </Grid>
          </Image>
  			</Container>
		);
	}
}
