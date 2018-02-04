import React from 'react';
import axios from 'axios'

const Field = ({ text, value, change }) => (
  <div>
    {text} <input value={value} onChange={change} />
  </div>
)

const Results = ({ countries}) => (
  <div>
      {countries.length > 1 ?
        countries.map(country => <Country key={country.numericCode} country={country}/>) :
        countries.map(country => <Info key={country.numericCode} country={country} />)}
  </div>
)

const Country = ({ country}) => (
  <div>
        {country.name}
  </div>
)

const Info = ({ country }) => (
  <div>
    <h2>{country.name} {country.nativeName}</h2>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag} alt="lippu" width="200" />
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }
  

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleInputChangeFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const filterlist = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Maailman maat</h2>
        <Field
          text="Rajaa näytettäviä: "
          value={this.state.filter}
          change={this.handleInputChangeFilter}
        />
        {filterlist.length > 10 ?
          'Tarkenna hakua, liikaa hakutuloksia' :
          <Results countries={filterlist} klik={this.klik} />}
      </div>
    )
  }
}

export default App