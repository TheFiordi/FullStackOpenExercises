const Header = (props) => {
  return (
    <>
      <p>{props.course.name}</p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exNumber}
      </p>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part
        part={props.parts.parts[0].name}
        exNumber={props.parts.parts[0].exercises}
      />
      <Part
        part={props.parts.parts[1].name}
        exNumber={props.parts.parts[1].exercises}
      />
      <Part
        part={props.parts.parts[2].name}
        exNumber={props.parts.parts[2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises is{" "}
        {props.parts.parts[0].exercises +
          props.parts.parts[1].exercises +
          props.parts.parts[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

export default App;
