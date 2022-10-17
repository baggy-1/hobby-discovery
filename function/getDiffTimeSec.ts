const getDiffTimeSec = (targetTimeSec: number) => {
  const now = new Date().getTime();
  const exp = targetTimeSec * 1000;

  return (exp - now) / 1000;
};

export default getDiffTimeSec;
