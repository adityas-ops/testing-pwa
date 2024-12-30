import React from "react";

function Avatar({ name }) {
  // Function to generate a color based on the name
  const getColorFromText = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 90%, 30%)`; // Generate an HSL color
    return color;
  };

  const backgroundColor = getColorFromText(name);

  return (
    <div
      className="w-[40px] h-[40px] z-50 rounded-full flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <p className="text-2xl text-white">{name[0]}</p>
    </div>
  );
}

export default Avatar;
