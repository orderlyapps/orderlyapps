import { useState } from "react";

export interface SimpleGreetingProps {
  name?: string;
}

export function SimpleGreeting({ name = "World" }: SimpleGreetingProps) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}
