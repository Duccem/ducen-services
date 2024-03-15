import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

export interface MobileInputDateProps {
  placeholder: string;
  onChange?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  error?: string;
  name?: string;
  required?: boolean;
}

export function MobileInputDate({ placeholder, onChange, onBlur, error, required }: MobileInputDateProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.buttonBox}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          error ? {borderColor: '#DE2AC3'} : {},
          {
            top: pressed ? -2 : -3,
            left: pressed ? -2 : -3,
          },
        ]}
        onPress={() => {
          setOpen(!open);

        }}
      >
        <Text style={styles.buttonText}>{date ? date?.toDateString() : placeholder} <Text style={{color: '#DE2AC3'}}>{required ? '*' : ''}</Text></Text>
      </Pressable>
      {/* <Text
        style={{
          color: '#DE2AC3',
          fontFamily: 'Nunito_700Bold',
          fontSize: 14,
          position: 'absolute',
          top: 5,
          right: 10,
          textAlign: 'center',
        }}
      >
        {error}
      </Text> */}
      {open && (
        <TouchableWithoutFeedback
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
          zIndex: 1,
          position: 'absolute',
          top: 0,
        }}
        onPress={() => {
          setOpen(false);
          onBlur && onBlur();
        }}>
          <View
            style={{
              position: 'relative',
              top: 45,
              left: -3,
              width: '100%',
              zIndex: 2,
              backgroundColor: '#fff',
              borderColor: '#000',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
            }}
          >
            <DateTimePicker

              date={date}
              mode={'single'}
              onChange={(selectedDate) => {
                setDate(new Date(selectedDate?.toString() || new Date()));
                setTimeout(() => setOpen(false), 800);
                onChange && onChange(selectedDate);
              }}
              selectedItemColor="#9747FF"
              selectedTextStyle={{
                color: '#fff',
                fontFamily: 'Nunito_700Bold',
                fontSize: 16,
              }}
              calendarTextStyle={{
                color: '#000',
                fontFamily: 'Nunito_700Bold',
                fontSize: 16,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    height: 40,
    width: '100%',
    margin: 'auto',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    position: 'absolute',
    top: -3,
    left: -3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  buttonBox: {
    backgroundColor: '#000',
    height: 43,
    width: '90%',
    position: 'relative',
    borderRadius: 5,
    zIndex: 2,
    marginLeft: '5%',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  },
});
