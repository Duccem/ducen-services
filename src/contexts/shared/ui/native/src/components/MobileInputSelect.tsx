import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Dimensions, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
export interface MobileInputSelectProps {
  placeholder: string;
  options: any[];
  onChange?: (...args: any) => void;
  onSelect?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  error?: string;
  name?: string;
  search?: boolean;
}
export function MobileInputSelect({ placeholder, options, onChange, onBlur, onSelect, error, search }: MobileInputSelectProps) {
  return (
    <View style={{
      backgroundColor: '#000',
      height: 43,
      width: '90%',
      borderRadius: 5,
      marginLeft: '5%',
      elevation: 1,
      position: 'relative'
    }}
    >
    <SelectDropdown
      data={options}
      onSelect={(item) => {
        if (onChange) onChange(item);
        if (onSelect) onSelect(item);
        return null;
      }}
      defaultButtonText="Gender"
      buttonStyle={[{
        backgroundColor: '#fff',
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid',
        zIndex: 1,
        elevation: 0,
        top: -3,
        left: -3,
      }, error ? {borderColor: '#DE2AC3'} : {},]}
      onBlur={onBlur}
      searchInputStyle={{
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: 40,
        width: '100%',
        elevation: 0,
        position: 'relative',
      }}
      search={search}
      searchPlaceHolder="Search..."
      renderCustomizedButtonChild={(selectedItem: any) => (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16, textTransform: 'capitalize' }}>{selectedItem ? selectedItem : placeholder}</Text>
        </View>
      )}
      renderDropdownIcon={() => (
        <FontAwesomeIcon icon={faAngleDown} color={'#000'} size={30}/>
      )}
      dropdownStyle={{
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        position: 'absolute',
        alignSelf: 'center',
        height: Dimensions.get('screen').height / 3,
      }}

      renderCustomizedRowChild={(item: any, _index: any, highlighted: any) => (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', paddingHorizontal: 15, backgroundColor: '#fff' }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16, textTransform: 'capitalize', color: highlighted ? '#9747FF' : '#000' }}>{item}</Text>
        </View>
      )}
      />
    </View>
  )
}
