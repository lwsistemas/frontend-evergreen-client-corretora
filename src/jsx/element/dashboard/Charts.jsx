
import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import globalConfig from '../../jsonConfig/globalConfig.json';
import animated from '../../../images/animated-gif.gif'

function Charts(props) {

  const { currency, dataUprice } = props
  const [coin, setCoin] = useState(globalConfig.tokenCoins[currency])
  const [isLoad,setIsLoad]= useState('block')
  const [isShow,setIsShow]= useState('none')
  
  // const data1 = [["01/01/2021", 8.22], ["03/03/2021", 8.01], ["05/05/2021", 8.22], ["2012-01-03", 8.01],]
  // const data2 = [["01/01/2021", 9.22], ["03/03/2021", 9.01], ["05/05/2021", 9.22], ["2012-01-03", 9.55],]
  const [isData, setIsData] = useState([])

  const [
    { primaryCursorValue, secondaryCursorValue },
    setState
  ] = React.useState({
    primaryCursorValue: null,
    secondaryCursorValue: null
  })
  // function randomDate(start, end) {
  //   let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  //   var data = new Date(),
  //     dia = data.getDate().toString(),
  //     diaF = (dia.length == 1) ? '0' + dia : dia,
  //     mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
  //     mesF = (mes.length == 1) ? '0' + mes : mes,
  //     anoF = data.getFullYear();
  //   console.log(date)
  //   return date
  // }
  const formanteData = async (data) => {
    let array = []
    const syncRes = await (data.map((i) => {
      let a = [i.data, i.price]
      array.push(a)
    }));
    if(array[0]){
      setIsData(array)
      setIsLoad('none')
     setIsShow('block')
    }
    return array

  }
  const data = React.useMemo(
    () => [
      {
        label: coin,
        data: isData
        //    data: [{x:"2012-01-02", y: 8.22}, {x:"2012-01-03", y: 8.01}, {x:"2012-01-04", y: 8.22}, {x:"2012-01-5", y: 8.10}, ],
        //data: [{x:randomDate(new Date(2012, 0, 1), new Date(2012, 0, 2)), y: 8.22}, {x:randomDate(new Date(2012, 0, 3), new Date(2012, 0, 4)), y: 8.22}, {x:randomDate(new Date(2012, 0, 5), new Date(2012, 0, 6)), y: 8.10}, ],
      }
    ],
    [coin,isData]
  )
  const series = React.useMemo(
    () => ({
      showPoints: true
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'right', format: d => `R$${d}` }
    ],
    []
  )
  const primaryCursor = React.useMemo(
    () => ({
      value: primaryCursorValue
    }),
    [primaryCursorValue]
  )
  const secondaryCursor = React.useMemo(
    () => ({
      value: secondaryCursorValue
    }),
    [secondaryCursorValue]
  )
  const stilo = {
    position: 'absolute',
    zIndex: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop:200,
    width: "20%",
    left: 0,
    right: 0,
    color: 'white'
  }
  // console.log(primaryCursor.value)
  const onFocus = React.useCallback(datum => {
    setState({
      primaryCursorValue: datum ? datum.primary : null,
      secondaryCursorValue: datum ? datum.secondary : null
    })
  }, [])
  useEffect(async () => {

    await setCoin(globalConfig.tokenCoins[currency])
    await formanteData(dataUprice)
    await formanteData(dataUprice)
  }, [currency])
  useEffect(async () => {

    await setCoin(globalConfig.tokenCoins[currency])
    await formanteData(dataUprice)
  }, [dataUprice])


  return (

    <div style={{
      position: 'relative',
      width: '90%',
      height: '85%'
    }}>
      <div style={{ display:isLoad }}>
        <img src={animated}
          style={stilo}></img>
      </div>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: isShow }}>
        <div
          style={{
            flex: '0 0 auto',
            padding: '10px',
          }}
        >
          {coin}
        </div>
        <Chart data={data} series={series} axes={axes} primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor} onFocus={onFocus} tooltip dark />

      </div>
    </div >
  )
}
export default Charts