import "./App.css";

import { cubeRoot } from "./lib/mathFunctions";

import Calculator from "./components/Calculator";

export default function App() {
  return (
    <>
      <h1 className="text">
        Calculator
      </h1>
      <Calculator validation={false} functions={[{ onClick: cubeRoot, label: "c*" }]} />
    </>
  );
}