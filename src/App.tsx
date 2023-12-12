import { useState } from "react";
import Counter from "./Counter";
import Heading from "./Heading";
import Section from "./Section";
import List from "./List";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Heading title={"Hello"} />
      <Section title={"Different title"}>This is my Section</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List
        items={["coffee", "Tacos", "Code"]}
        render={(item: string) => <li>{item}</li>}
      />
    </>
  );
}

export default App;
