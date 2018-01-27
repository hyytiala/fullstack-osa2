import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto osat={kurssi.osat} />
        </div>
 
    )
  }
  
  export default Kurssi