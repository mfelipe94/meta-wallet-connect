import React, { useState, useEffect } from "react";
const imageUri = [
  require("../assets/images/legend.png"),
  require("../assets/images/rare.png"),
  require("../assets/images/common.png"),
  require("../assets/images/shirt.png"),
  require("../assets/images/empty.png"),
];
const itemName = [
  "You get Legend NFT",
  "You get Rare NFT",
  "You get Common NFT",
  "You get T-shirt",
  "Ooops.. Try again",
];

export default function GameEnd({ getearn }) {
  const [earnNumber, setEarnNumber] = useState();
  useEffect(() => {
    const asyncGetEarn = async () => {
      if (getearn == 3) setEarnNumber(0);
      else if (getearn % 100000 == 0) setEarnNumber(1);
      else if (getearn % 10000 == 1) setEarnNumber(2);
      else if (getearn % 1000 == 2) setEarnNumber(3);
      else setEarnNumber(4);
    };
    asyncGetEarn();
  }, [getearn]);
  return (
    <div className="flex absolute w-[40%] h-[60%] left-[30%] top-[20%] p-[1%] justify-center items-center">
      <div className="w-[40%] h-[40%]">
        <img src={imageUri[earnNumber]} className="w-full h-full" />
      </div>
      {itemName[earnNumber] && (
        <p className="test-black text-[20px]">{itemName[earnNumber]}</p>
      )}
      <p className="text-[#24ff35] text-[15px]">Good luck for the next time.</p>
    </div>
  );
}
