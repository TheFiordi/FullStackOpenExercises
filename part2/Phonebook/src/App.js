import { useEffect, useState } from "react";
import Person from "./components/Person.js";
import Filter from "./components/Filter.js";
import Form from "./components/Form.js";
import apiHandler from "./services/apiHandler.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    apiHandler.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleAddOrUpdate = (event) => {
    event.preventDefault();
    const personToUpdate = persons.find((person) => person.name === newName);

    if (personToUpdate) {
      if (
        window.confirm(
          `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        apiHandler
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== response.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
            setSuccess("Numero aggiornato con successo");
          })
          .catch((error) => {
            setError("Errore durante l'aggiornamento del numero");
          });
      }
    } else {
      // Caso in cui la persona non esiste nella rubrica, la aggiungiamo
      apiHandler
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons([...persons, response]);
          setNewName("");
          setNewNumber("");
          setSuccess("Numero aggiunto con successo");
        })
        .catch((error) => {
          setError("Errore durante l'aggiunta del numero");
        });
    }
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

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      apiHandler
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccess("Numero eliminato con successo");
        })
        .catch((error) => {
          setError("Errore durante l'eliminazione del numero");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {error && <div className="error">Error: {error}</div>}
      {success && <div className="success">Success: {success}</div>}
      <Filter handler={handleFilterChange} />
      <h1>Add a new</h1>

      <Form
        handlerOnSubmit={handleAddOrUpdate}
        handlerOnChangeName={handleNameChange}
        handlerOnChangeNumber={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <table>
        <tbody>
          {persons
            .filter(
              (person) =>
                filter.length === 0 ||
                person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
              <tr key={person.id}>
                <td>
                  <Person name={person.name} number={person.number} />
                </td>
                <td>
                  <button onClick={() => handleDelete(person.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
