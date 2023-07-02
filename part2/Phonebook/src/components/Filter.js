const Filter = ({ handler }) => {
  return (
    <div>
      Filter shown with <input onChange={handler} />
    </div>
  );
};

export default Filter;
