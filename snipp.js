
import {
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import { colors } from '../assets/colors';
import { SET_APP_STATE } from '../context/types';
import { Text, BackIcon } from '../components';
import { wp, hp, theme } from '../assets/theme';
import Image from 'react-native-image-progress';
import RootContext from '../context/RootContext';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useRef, useContext } from 'react';

const Scanresult = ({ navigation, route }) => {
  const maxCharPerLine = 35;
  let isMounted = useRef(true);
  let { dispatch } = useContext(RootContext);
  let [dpModalVisible, setDpModalVisible] = useState(false);
  let { profile, photo } = route.params.payload;
  let concatName = `${profile.ff} ${profile.mm}`;

  useEffect(() => {
    isMounted.current = true;
    dispatch({
      type: SET_APP_STATE,
      payload: { isAnimating: false },
    });
    return () => (isMounted.current = false);
  }, []);

  
  return (
    <ImageBackground
      source={require('../assets/images/scanresultbg.png')}
      resizeMode={'cover'}
      style={styles.container}
    >
      <View style={styles.wrapper}>
        <StatusBar backgroundColor={'#306145'} barStyle="dark-content" />

        <View style={styles.headerRow}>
          <BackIcon
            color={colors.gray_700}
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
          />
         
        </View>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => setDpModalVisible(true)}>
            <Image style={styles.profileImage} resizeMode={'contain'} source={{ uri: photo }} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.biodataLayout}>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel} text={'Surname/Nom'} />
            <Text style={styles.surnameValue} text={profile.s} />
          </View>
          {concatName.length < maxCharPerLine && (
            <View style={styles.itemRow}>
              <Text style={styles.itemLabel} text={'Given Names/Prenoms'} />
              <Text style={styles.othernamesValue} text={`${profile.ff} ${profile.mm}`} />
            </View>
          )}

          {concatName.length > maxCharPerLine && (
            <View style={styles.itemRow}>
              <Text style={styles.itemLabel} text={'Firstname'} />
              <Text style={styles.othernamesValue} text={profile.ff || '-'} />
            </View>
          )}

          {concatName.length > maxCharPerLine && (
            <View style={styles.itemRow}>
              <Text style={styles.itemLabel} text={'Middlename'} />
              <Text style={styles.othernamesValue} text={profile.mm || '-'} />
            </View>
          )}
          
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.itemRo}>
            <Text style={styles.tx} text={profile.tx} />
            <Text style={styles.timestamp} text={moment().format('LLLL')} />
          </View>
        </View>
      </View>
      <Modal
        isVisible={dpModalVisible}
        style={styles.modal}
        coverScreen={true}
        useNativeDriver={true}
        animationInTiming={600}
        animationOutTiming={1200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <Image resizeMode={'cover'} style={styles.enlargedImage} source={{ uri: photo }} />
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={() => setDpModalVisible(!dpModalVisible)}>
            <Icon name={'close-circle'} size={hp(8)} color={colors.gray_200} />
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const card = {
  paddingVertical: hp(2),
  paddingHorizontal: wp(4),
  marginBottom: hp(2),
  shadowColor: '#000',
  borderRadius: wp(2),
  backgroundColor: '#47805D',
};

const styles = StyleSheet.create({
  container: {
    ...theme.layoutContainer,
    //backgroundColor: '#326547',
  },

  wrapper: {
    ...theme.layoutWrapper,
    marginTop: hp(2),
  },

  imageWrapper: {
    marginTop: hp(6),
    marginBottom: hp(3),
    alignItems: 'center',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    borderWidth: 0,
    overflow: 'hidden',
    backgroundColor: colors.greenIII,
  },

  enlargedImage: {
    height: hp(55),
    width: wp(75),
  },

  itemRow: {
    ...card,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(4),
    height: hp(6),
    alignContent: 'center',
    alignItems: 'center',
  },

  
  bottomItem: {
    ...card,
    width: '48%',

  },

  backIcon: {
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 150,
    justifyContent: 'center',
    backgroundColor: colors.green_200,
  },

  itemLabel: {
    ...theme.smallText,
    fontFamily: 'publicsans-semibold',
    color: '#02DD5C',
    textTransform: 'uppercase',
  },

  surnameValue: {
    ...theme.bodyText,
    color: colors.white_100,
    textAlign: 'left',
    fontFamily: 'Publicsans-Regular',
  },

  othernamesValue: {
    ...theme.bodyText,
    color: colors.white_100,
  },

  otherValues: {
    ...theme.subContentText,
    color: colors.white_100,
  },

  bottomLayout: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  biodataLayout: {
    flex: 1,
    marginTop: hp(4),
  },

  footer: {
    justifyContent: 'center',
    marginBottom: hp(4),
  },

  timestamp: {
    ...theme.smallText,
    textAlign: 'center',
    color: '#7D9588',
  },

  tx: {
    ...theme.smallText,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#7D9588',
  },

  modal: {
    justifyContent: 'center',
  },

  modalContainer: {
    paddingTop: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: hp(10),
    borderTopRightRadius: wp(6),
    borderTopLeftRadius: wp(6),
  },
});

export default Scanresult;
