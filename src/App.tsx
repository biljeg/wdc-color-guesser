import { useEffect, useState } from "react";
import "./App.css";

const shuffle = <T,>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generateRandomColor = (): string => {
  const hexDigits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const color = Array(6)
    .fill("")
    .map(() => hexDigits[Math.floor(Math.random() * hexDigits.length)])
    .join("");

  return color;
};

function App() {
  const [correctColor, setCorrectColor] = useState<string>("");
  const [availableColors, setAvailaibleColors] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | undefined>();

  const pickColors = (): void => {
    const newColor = generateRandomColor();
    setCorrectColor(newColor);
    const shuffledArray = shuffle([
      newColor,
      generateRandomColor(),
      generateRandomColor(),
    ]);
    setAvailaibleColors(shuffledArray);
  };

  useEffect(() => {
    pickColors();
  }, []);

  const handleClick = (pickedColor: string): void => {
    if (pickedColor === correctColor) {
      setResult(true);
      pickColors();
    } else {
      setResult(false);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div
        className={`w-96 h-48 rounded-md border border-white`}
        style={{ backgroundColor: correctColor }}
      />
      <div className="my-8 flex gap-4">
        {availableColors.map(color => (
          <button key={color} onClick={() => handleClick(color)}>
            {color}
          </button>
        ))}
      </div>
      {result === false && <p className="text-red-500">Wrong color!</p>}
      {result === true && <p className="text-green-500">Correct!</p>}
    </main>
  );
}

export default App;
