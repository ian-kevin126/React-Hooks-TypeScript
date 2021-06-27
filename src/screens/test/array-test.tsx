import React from "react";
import { useArray } from "../../utils/hooks";

export const ArrayTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "bob", age: 18 },
    { name: "tom", age: 88 },
  ];
  const { value, add, removeIndex, clear } = useArray(persons);

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={clear}>clear all</button>
      {value.map((person, index) => (
        <div>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
