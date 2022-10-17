const scrollAddFadeInUp = (target: HTMLElement) => () => {
  const { top } = target.getBoundingClientRect();
  const { innerHeight } = window;
  const fromTop = top - innerHeight + 200;
  if (fromTop > 0) return;
  if (target.classList.contains("animationFadeInUp")) return;
  target.classList.add("animationFadeInUp");
};

export default scrollAddFadeInUp;
