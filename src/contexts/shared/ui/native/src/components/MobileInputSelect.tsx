import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
export interface MobileInputSelectProps {
  placeholder: string;
  options: any[];
  onChange?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  error?: string;
  name?: string;
}
export function MobileInputSelect({ placeholder, options, onChange, onBlur, error }: MobileInputSelectProps) {
  return (
    <View style={{
      backgroundColor: '#000',
      height: 43,
      width: '90%',
      position: 'relative',
      borderRadius: 5,
      marginLeft: '5%',
      elevation: 1
    }}>
    <SelectDropdown
      data={options}
      onSelect={(item) => onChange ? onChange(item) : null}
      defaultButtonText="Gender"
      buttonStyle={[{
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid',
        position: 'absolute',
        zIndex: 1,
        elevation: 0,
        top: -3,
        left: -3,
      }, error ? {borderColor: '#DE2AC3'} : {},]}

      onBlur={onBlur}
      renderCustomizedButtonChild={(selectedItem: any) => (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16, textTransform: 'capitalize' }}>{selectedItem ? selectedItem : placeholder}</Text>
        </View>
      )}
      renderDropdownIcon={() => (
        <FontAwesomeIcon icon={faAngleDown} color={'#000'} size={30}/>
      )}
      dropdownStyle={{
        backgroundColor: '#fff',
      }}
      renderCustomizedRowChild={(item: any, _index: any, highlighted: any) => (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', paddingHorizontal: 15 }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16, textTransform: 'capitalize', color: highlighted ? '#9747FF' : '#000' }}>{item}</Text>
        </View>
      )}
      />
    </View>
  )
}
