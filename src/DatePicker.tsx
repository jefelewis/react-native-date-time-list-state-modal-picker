// Imports: Dependencies
import React, { useState } from 'react';
import { DatePickerAndroid, DatePickerIOS, Dimensions, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
// import Icon from 'react-native-vector-icons/Ionicons';
// Icon.loadFont();

// Screen Dimensions
const { height, width } = Dimensions.get('window');

// TypeScript: Types
interface Props {
  title: string;
  mode: 'calendar' | 'spinner' | 'default';
  minDate?: Date | number;
  maxDate?: Date | number;
  onChange: (date: Date) => any;
}

interface AndroidProps {
  action: 'dateSetAction' | 'dismissedAction';
  newDate?: Date;
  year?: number;
  month?: number;
  day?: number;
}

// Component: Date Picker
const DatePicker = (props: Props) => {
  // React Hooks: State
  const [ modalVisible, toggle ] = useState(false);
  const [ date, setDate ] = useState(new Date());

  // Toggle Modal
  const toggleModal = async (props: Props) => {
    try {
      // Check Platform (iOS)
      if (Platform.OS === 'ios') {
        // React Hook: Toggle Modal
        toggle((modalVisible: boolean) => !modalVisible);
      }

      // Check Platform (Android)
      if (Platform.OS === 'android') {
        // const { action, year, month, day } : AndroidProps = await DatePickerAndroid.open({
        //   date: date,
        //   mode: props.mode,
        // });

        // // Action: Date Set
        // if (
        //   action === DatePickerAndroid.dateSetAction
        //   && year !== undefined
        //   && month !== undefined
        //   && day !== undefined
        // ) {
        //   // New Date
        //   let newDate:Date = new Date(year, month, day);

        //   // Select Date
        //   selectDate(newDate);
        // }

        // // Action: Dismissed
        // else if (action === DatePickerAndroid.dismissedAction) {
        //   // Do Nothing
        // }

        return (
          <RNDateTimePicker
            mode="date"
            display={props.mode}
            value={date}
            onChange={(event: any, date: Date) => selectDate(date)}
          />
        )
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  // Select Date
  const selectDate = (date: Date) => {
    try {
      // React Hook: Set Date
      setDate(date);

      // React Props: onValueChange
      props.onChange(date);
    }
    catch (error) {
      console.log(error);
    }
  };

  // Render iOS Picker
  const renderIOSPicker = () => {
    try {
      return (
        <RNDateTimePicker
          mode="date"
          value={date}
          onChange={(event: any, date: Date) => selectDate(date)}
        />
      )
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputTitleContainer}>
      <Text style={styles.inputTitle}>{props.title}</Text>
      </View>

      <TouchableOpacity onPress={() => toggleModal(props)} style={styles.fieldTextContainer}>
        <Text style={styles.fieldText} numberOfLines={1}>{date ? moment(date).format('MMM Do, YYYY') : 'Select'}</Text>

        {/* <Icon name="ios-arrow-forward" size={22} style={styles.arrowForward}/> */}
      </TouchableOpacity>

      <Modal isVisible={modalVisible} style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.pickerHeaderContainer}>
            <TouchableOpacity onPress={() => toggleModal(props)} >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            {renderIOSPicker()}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: width - 32,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pickerHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    width: width,
    backgroundColor: '#FAFAF8',
    borderColor: '#7D7D7D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerContainer: {
    height: 220,
    width: width,
    // backgroundColor: '#CFD3D9',
    backgroundColor: 'white',
  },
  doneText: {
    fontFamily: 'System',
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 17,
    marginRight: 16,
  },
  stateContainer: {
    alignItems: 'center',
    width: 75,
    borderColor: '#7D7D7D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputTitleContainer: {
    width: 75,
    marginBottom: 4,
  },
  inputTitle: {
    color: '#7D7D7D',
    borderColor: '#7D7D7D',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  fieldTextContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    borderColor: '#7D7D7D',
    borderBottomWidth: StyleSheet.hairlineWidth,    
  },
  fieldText: {
    width: width - 32 - 20,
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    alignSelf: 'center',
  },
  arrowForward: {
    color: 'black',
    opacity: .3,
    marginRight: 7,
  },
});

// Exports
export default DatePicker;
