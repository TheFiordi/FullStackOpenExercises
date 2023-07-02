import { useState } from "react";
import Person from "./components/Person.js";
import Filter from "./components/Filter.js";
import Form from "./components/Form.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists`);
      setNewName("");
      return;
    }

    setPersons([
      ...persons,
      { id: persons.length + 1, name: newName, number: newNumber },
    ]);
    setNewName("");
    setNewNumber("");
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setFilter(filterValue);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handler={handleFilterChange} />
      <h1>Add a new</h1>

      <Form
        handlerOnSubmit={handleSubmit}
        handlerOnChangeName={handleNameChange}
        handlerOnChangeNumber={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <>
        {persons
          .filter(
            (person) =>
              filter.length === 0 ||
              person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person) => (
            <Person key={person.id} name={person.name} number={person.number} />
          ))}
      </>
    </div>
  );
};

export default App;
