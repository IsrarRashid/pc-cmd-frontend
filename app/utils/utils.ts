// "build": "next build --turbopack",
// "start": "node server.js",

export const devmap = true;

// Utility for random route color
export function getRandomColor() {
  const colors = [
    "#16800a",
    "#FF0000",
    "#007BFF",
    "#FFC107",
    "#9C27B0",
    "#00BCD4",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const createdMessage = "Created Successfully";
export const updatedMessage = "Updated Successfully";
export const deleteMessage = "Deleted Successfully";
