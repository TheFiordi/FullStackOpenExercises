const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  );
};

export default Total;
