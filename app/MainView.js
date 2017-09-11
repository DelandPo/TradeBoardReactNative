import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
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
    };
  }

  userLoginHandler(userGoogle, userFirebase){
    this.setState({currentUserGoogle:userGoogle,currentUserFirebase:userFirebase});
  }

  renderPickButton() {
    return (
          <TouchableHighlight style={Styles.MainViewButton}
            onPress = {() => {
              
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

  renderSetCompany(navigate){
    return (
      <TouchableHighlight style = {Styles.MainViewButton}
        onPress = {()=>{
        navigate('Company')
        }}
        >
        <Text style = {Styles.MainViewButtonText}>
          Set Company
          </Text>
          </TouchableHighlight>
    )
  }  

  renderDropButton(navigate) {
    return(
      <TouchableHighlight style={Styles.MainViewButton}
        onPress = {
          () => {
            navigate('DropShift')
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
          {this.renderPickButton()}
        </Row>
        <Row size = {1}></Row>
        
        <Row size = {2}>
          {this.renderSetCompany(navigate)}
          </Row>
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
