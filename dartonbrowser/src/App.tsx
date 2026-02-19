import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { DartBridge } from "./DartBridge";

export function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Using the DartBridge singleton (recommended for React apps)
    // Alternative: import { getDartBridge } from '../../shared/dartloader' for direct access
    
    // Call the Dart functionw
    DartBridge.get().functionName();
    let input_list = [3, 1, 2, 4, 5, 6, 7, 8, 9, 10];
    const output = DartBridge.get().quickSort(input_list, 0, input_list.length - 1);
    console.log("Sorted list: ", output);
    console.log(output);

    DartBridge.get()
      .fetchData()
      .then((result: string) => {
        console.log("Fetch data: ", result);
        const parsedResult = JSON.parse(result);
        console.log("Parsed data: ", parsedResult);
        DartBridge.get().anotherFunction();
      })
      .catch((error: Error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
