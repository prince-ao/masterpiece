import { StatusBar , Text} from 'react-native'
import { useIsFocused } from '@react-navigation/native';

const FocusStatusBar = (props:any) => {
    const isFocused = useIsFocused();
  return (
    isFocused ? <StatusBar animated={true} {...props} /> : null
  )
}

export default FocusStatusBar