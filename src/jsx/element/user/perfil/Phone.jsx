import '../../../../css/react-phone-number-input.css'
import PhoneInput from 'react-phone-number-input'
import { useTranslation } from "react-i18next";


const PhoneNumber = (props) => {
  const { t } = useTranslation()
  let maxNumber = 20
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  
  if(props.telephone != undefined){

    if(props.telephone.substring(0,3) == '+55'){
      if(props.telephone.length>13){
        maxNumber =13
      }else{
        maxNumber =17
      }
    }
  }
  return (
    <PhoneInput
      initialValueFormat="national"
      value={props.telephone}
      maxlength={maxNumber}
      onChange={props.setTelephone}
      
      />
      
  )
}
export default PhoneNumber