// import React, { useEffect, useRef } from "react";

// import bgImg from "../sources/images/Map/map1/greenBg.webp";
// import girl from "../sources/images/Map/girl/girl0.png";
// import girl2 from "../sources/images/Map/girl/girl7.png";
// import girl3 from "../sources/images/Map/girl/girl20.png";

// const App = () => {
//   const canvasRef = useRef(null);
//   const characterImages = [
//     girl,
//     girl2,
//     girl3,
//     // Add more character image URLs as needed
//   ];
//   let characterIndex = 0;
//   let intervalId = null;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const backgroundImg = new Image();
//     backgroundImg.src = bgImg;
//     backgroundImg.onload = () => {
//       ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
//     };

//     intervalId = setInterval(() => {
//       drawCharacter(ctx);
//       setTimeout(() => clearCharacter(ctx), 1000);
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const drawCharacter = (ctx) => {
//     const characterImg = new Image();
//     characterImg.src = characterImages[characterIndex];
//     characterIndex = (characterIndex + 1) % characterImages.length;
//     characterImg.onload = () => {
//       ctx.drawImage(characterImg, 100, 100, 200, 200); // Adjust position and size as needed
//     };
//   };

//   const clearCharacter = (ctx) => {
//     ctx.clearRect(100, 100, 200, 200); // Adjust position and size to match where character is drawn
//     const backgroundImg = new Image();
//     backgroundImg.src = bgImg;
//     backgroundImg.onload = () => {
//       ctx.drawImage(
//         backgroundImg,
//         0,
//         0,
//         canvasRef.current.width,
//         canvasRef.current.height
//       );
//     };
//   };

//   return (
//     <canvas ref={canvasRef} width={800} height={600}>
//       Your browser does not support the HTML5 canvas tag.
//     </canvas>
//   );
// };

// export default App;

import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

function Speech() {
  const [value, setValue] = useState("결과");

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  return (
    <div>
      <h2>음성인식</h2>

      <div>{value}</div>

      <button onClick={listen}>record start</button>
      <button onClick={stop}>stop</button>

      {listening && <div>음성인식 중</div>}
    </div>
  );
}

export default Speech;
