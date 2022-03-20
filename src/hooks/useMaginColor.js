import { useEffect, useRef, useState } from "react";

function randomColor(currentColor) {
  const LIST_COLOR = ["red", "yellow", "green"];

  const currentIndex = LIST_COLOR.indexOf(currentColor);
  let newIndex = currentIndex;

  while (newIndex === currentIndex) {
    newIndex = Math.trunc(Math.random() * LIST_COLOR.length);
  }

  return LIST_COLOR[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState("transparent");
  const colorRef = useRef("transparent");

  useEffect(() => {
    setInterval(() => {
      const newColor = randomColor(colorRef.current);

      setColor(newColor);
      colorRef.current = newColor;
    }, 1000);
    return () => {};
  }, []);

  return color;
}

export default useMagicColor;
