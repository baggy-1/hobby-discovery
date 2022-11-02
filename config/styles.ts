const breakpoints = ["400px", "600px", "800px", "1000px", "1200px"];

const mq = breakpoints.map((breakpoint) => `@media (max-width: ${breakpoint})`);

// custom media querie
const cmq = (breakpoint: string) => `@media (max-width: ${breakpoint})`;

const MAIN_COLOR = "#F4BB5F";

export { mq, cmq, MAIN_COLOR };
