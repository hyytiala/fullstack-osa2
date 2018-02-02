import React from 'react';

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
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

const Numerot = ({ persons }) => {
    return (
        <table>
            <tbody>
                {persons.map(person => <Person key={person.name} person={person} />)}
            </tbody>
        </table>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    number: '0405213344'
                },
                {
                    name: 'Arto Virtanen',
                    number: '0405213344'
                },
                {
                    name: 'Otto Virtanen',
                    number: '0405213344'
                }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        if (!this.state.persons.find((person) => person.name === this.state.newName)) {
            const persons = this.state.persons.concat(personObject)
            this.setState({
                persons,
                newName: '',
                newNumber: ''
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
                    <Numerot persons={toShow}/>
            </div>
        )
    }
}

export default App