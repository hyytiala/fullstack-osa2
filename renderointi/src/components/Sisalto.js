import React from 'react'
import Osa from './Osa'

const Sisalto = ({ osat }) => {
    return(
      <div>
        {osat.map(osa=><Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
      </div>
    )
}

export default Sisalto