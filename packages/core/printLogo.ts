export default function () {
  const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 14px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

  if (PROD) {
    const logo = String.raw`
___________________________________________
   _____             ___ __     __  ______
  / ___/__  ______  / (_) /_   / / / /  _/
  \__ \/ / / / __ \/ / / __/  / / / // /  
 ___/ / /_/ / / / / / / /_   / /_/ // /   
/____/\__,_/_/ /_/_/_/\__/   \____/___/   
___________________________________________
    `;
    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log('[SunlitUI]:dev mode...');
  }
}
