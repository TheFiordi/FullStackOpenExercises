const Form = ({
  handlerOnSubmit,
  handlerOnChangeName,
  handlerOnChangeNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handlerOnSubmit}>
      <div>
        Name: <input value={newName} onChange={handlerOnChangeName} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handlerOnChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
