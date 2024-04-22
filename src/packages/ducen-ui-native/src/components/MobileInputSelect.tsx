import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";
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
      backgroundColor: 'transparent',
      height: 40,
      width: '90%',
      borderRadius: 5,
      marginLeft: '5%',
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
        backgroundColor: '#F0F0F0',
        width: '100%',
        height: 40,
        borderRadius: 5,
      }, error ? {borderColor: '#DE2AC3'} : {},]}
      onBlur={onBlur}
      searchInputStyle={{
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: 40,
        width: '100%',
        elevation: 0,
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
        backgroundColor: '#f0f0f0',
      }}
      renderCustomizedRowChild={(item: any, _index: any, highlighted: any) => (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', paddingHorizontal: 15, backgroundColor: '#f0f0f0' }}>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16, textTransform: 'capitalize', color: highlighted ? '#9747FF' : '#000' }}>{item}</Text>
        </View>
      )}
      />
    </View>
  )
}
