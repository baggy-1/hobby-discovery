const REG_ID = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,24}$/gm;
const REG_PW =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*<>?/])[a-zA-Z0-9!@#$%^&*<>?/]{8,}$/gm;

const REG_NUMBER = /^[0-9]{10,11}$/gm;

export { REG_ID, REG_PW, REG_NUMBER };
