const PhoneFormat = (value) => {
  const json = {
    num1: value
      .split("")
      .filter((i, j) => j < 3 && i)
      .join(""),
    num2: value
      .split("")
      .filter((i, j) => j >= 3 && j < 7 && i)
      .join(""),
    num3: value
      .split("")
      .filter((i, j) => j >= 7 && j < 11 && i)
      .join(""),
    numN: value
      .split("")
      .filter((i, j) => j >= 11 && i)
      .join(""),
  };
  return json.num2
    ? `+62 ${json.num1}-${json.num2}-${json.num3}${json.numN && `-${json.numN}`}`
    : "+62";
};

export default PhoneFormat;
