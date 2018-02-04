import React from 'react'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={deletePerson}>Poista</button></td>
        </tr>
    )
}

const Field = ({ text, value, change }) => (
    <div>
        {text} <input value={value} onChange={change} />
    </div>
)

const Button = () => (
    <div>
        <button type="submit">lisää</button>
    </div>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({ persons })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        if (!this.state.persons.find((person) => person.name === this.state.newName)) {
            personService
                .create(personObject)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: ''
                    })
                })
        } else {
            this.setState({
                newName: '',
                newNumber: ''
            })
        }
    }

    handleInputChangeName = (event, key) => {
        this.setState({ newName: event.target.value })
    }

    handleInputChangeNumber = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleInputChangeFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    removePerson = (id) => {
        return () => {
            personService
                .remove(id)
                .then(removedNote => {
                    this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
                }
                ) 
        }
    }

    render() {
        const toShow = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Field
                    text="Rajaa näytettäviä: "
                    value={this.state.filter}
                    change={this.handleInputChangeFilter}
                />
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <Field
                        text="nimi: "
                        value={this.state.newName}
                        change={this.handleInputChangeName}
                    />
                    <Field
                        text="numero: "
                        value={this.state.newNumber}
                        change={this.handleInputChangeNumber}
                    />
                    <Button />
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {toShow.map(person => <Person key={person.name} person={person} deletePerson={this.removePerson(person.id)} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App