import React from "react"
import { TextInput } from 'react-native';

const SearchBar = (props:any) => {

    // const [currentSearch, updateSearch] = useState('');
    
  return (
    <TextInput placeholder="Search for user" onChangeText={(text) => console.log('Input:', text)}></TextInput>

  )
}

export default SearchBar;