const breakpoints = ["400px", "600px", "800px", "1000px", "1200px"];

const mq = breakpoints.map((breakpoint) => `@media (min-width: ${breakpoint})`);

export { mq };
