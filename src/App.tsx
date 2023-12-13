import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface User {
  id: number;
  userName: string;
}

function App() {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>();

  const inputRef = useRef<HTMLInputElement>(null);

  console.log(inputRef.current);
  console.log(inputRef.current?.value);

  useEffect(() => {
    console.log("mounting");

    return () => console.log("unmounting");
  }, [users]);

  const AddTwo = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) =>
      setCount((prev) => prev + 1),
    []
  );

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={AddTwo}>Add</button>
      <input type="text" ref={inputRef} />
    </div>
  );
}

export default App;
