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

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            error: null
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
        if (!this.state.persons.find((person) => person.name === this.state.newName))
            personService
                .create(personObject)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.filter(p=>p.id!==personObject.id).concat(personObject),
                        newName: '',
                        newNumber: '',
                        error: `Lisättiin ${personObject.name}`
                    })
                    setTimeout(() => {
                        this.setState({ error: null })
                    }, 2000)
                })
        else
            if (window.confirm(`${personObject.name} on jo luettelossa. Päivitetäänkö numero?`)) {
                const person = this.state.persons.find((person) => person.name === this.state.newName)
                const id = person.id
                const changedPerson = { ...person, number: this.state.newNumber }
                console.log(id)
                personService
                    .update(id, changedPerson)
                    .then(changedPerson => {
                        const persons = this.state.persons.filter(p => p.id !== id)
                        this.setState({
                            persons: persons.concat(changedPerson),
                            newName: '',
                            newNumber: '',
                            error: `Päivitettiin ${personObject.name}`
                        })
                        setTimeout(() => {
                            this.setState({ error: null })
                        }, 2000)
                    })
                    .catch(error => {
                        this.setState({
                          error: `Henkilö on poistettu muualla, päivitä sivu!`
                        })
                        setTimeout(() => {
                          this.setState({error: null})
                        }, 5000)
                      })
            }

    }

    handleInputChangeName = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleInputChangeNumber = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleInputChangeFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    removePerson = (id) => {
        const person = this.state.persons.find(p => p.id === id)
        return () => {
            if (window.confirm(`Poistetaanko ${person.name}?`))
                personService
                    .remove(id)
                    .then(removedNote => {
                        this.setState({
                            persons: this.state.persons.filter(p => p.id !== id),
                            error: `Poistettiin ${person.name}`
                        })
                        setTimeout(() => {
                            this.setState({ error: null })
                        }, 2000)
                    }
                    )
        }
    }

    render() {
        const toShow = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.error} />
                <Field
                    text="Rajaa näytettäviä: "
                    value={this.state.filter}
                    change={this.handleInputChangeFilter}
                />
                <h2>Lisää uusi tai päivitä olemassa olevaa
                </h2>
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