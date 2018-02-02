import React from 'react'

const Yhteensa = ({ osat }) => {
    const tehtavat = osat.map(osa => osa.tehtavia)
    const summa = (maara, nykyinen) => maara + nykyinen
    return(
      <div>
        Yhteensä {tehtavat.reduce(summa)} tehtävää
      </div>
    )
}

export default Yhteensa