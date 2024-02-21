import React, { useState, useEffect } from "react";

const imageUri = [
  require("../assets/images/legend.png"),
  require("../assets/images/rare.png"),
  require("../assets/images/common.png"),
  require("../assets/images/shirt.png"),
  require("../assets/images/gift.png"),
  require("../assets/images/dog.png"),
  require("../assets/images/sidedog.png"),
];

export default function MainGame({ gamefinish, playnumber }) {
  const number = [];
  for (let i = 0; i < 9; i++) number[i] = i;
  const defaultPumpkinState = number.map((i) => false);
  const defaultPumpkinNumber = number.map((i) => -1);
  const [pumpkinNumber, setPumpkinNumber] = useState(defaultPumpkinNumber);
  const [pumpkinState, setPumpkinState] = useState(defaultPumpkinState);

  const generateNums = (index) => {
    let i, j;
    let temp = [];
    let result = [];
    for (i = 0; i < 9; i++) temp[i] = result[i] = -1;
    for (i = 0; i < 6; i++) {
      j = 0;
      let current = Math.floor(Math.random() * 9);
      while (j < i) {
        if (temp[j] == current) break;
        j++;
      }
      if (j < i) i--;
      else {
        temp[i] = current;
      }
    }
    for (i = 0; i < 6; i++) {
      let cnt = 0;
      let current = Math.floor(Math.random() * 7);
      for (j = 0; j < i; j++) if (result[temp[j]] == current) cnt++;
      if (cnt == 2 || current == index) i--;
      else result[temp[i]] = current;
    }
    for (i = 0; i < 9; i++) if (result[i] == -1) result[i] = index;
    return result;
  };
  const generateDefaultNums = () => {
    let i, j;
    let temp = [];
    let result = [9];
    for (i = 0; i < 9; i++) temp[i] = result[i] = -1;
    for (i = 0; i < 9; i++) {
      let cnt = 0;
      let current = Math.floor(Math.random() * 7);
      for (j = 0; j < i; j++) if (result[j] == current) cnt++;
      if (cnt == 2) i--;
      else result[i] = current;
    }
    return result;
  };
  const setGame = () => {
    let res = [];
    if (playnumber == 3) {
      res = generateNums(0);
    } else if (playnumber % 100000 == 0) {
      res = generateNums(1);
    } else if (playnumber % 10000 == 1) {
      res = generateNums(2);
    } else if (playnumber % 1000 == 2) {
      res = generateNums(3);
    } else {
      res = generateDefaultNums();
    }
    let newPumkinNumber = [...pumpkinNumber];
    for (let i = 0; i < 9; i++) newPumkinNumber[i] = res[i];
    setPumpkinNumber(newPumkinNumber);
  };
  const clickPumpkin = async (index) => {
    let newPumpkinState = [...pumpkinState];
    newPumpkinState[index] = true;
    const selectedCount = newPumpkinState.filter((item) => item == true).length;
    if (selectedCount == 9) {
      gamefinish();
    }
    setPumpkinState(newPumpkinState);
  };
  useEffect(() => {
    setGame();
  }, [playnumber]);
  return (
    <div className="flex flex-wrap absolute w-[40%] h-[60%] left-[30%] top-[20%] p-[1%]">
      {number.map((i) => (
        <div
          className="w-[30%] h-[30%] ml-[3%]"
          key={i}
          onClick={() => {
            clickPumpkin(i);
          }}
        >
          {pumpkinState[i] == 0 ? (
            <img
              src={require("../assets/images/pumpkin.png")}
              className="flex w-full h-full"
            />
          ) : (
            <img
              src={imageUri[pumpkinNumber[i]]}
              className="flex w-full h-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}
