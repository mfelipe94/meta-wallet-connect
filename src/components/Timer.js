import React, { useState, useEffect } from "react";

export default function Timer({ finish, lasttime }) {
  const useCountdown = () => {
    const countDownDate = new Date(lasttime).getTime();

    const [countDown, setCountDown] = useState(
      new Date().getTime() - countDownDate
    );
    useEffect(() => {
      console.log(lasttime);
      const interval = setInterval(() => {
        setCountDown(new Date().getTime() - countDownDate);
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
  };
  const getReturnValues = (countDown) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };
  const [days, hours, minutes, seconds] = useCountdown();
  if (days >= 1) {
    finish(1);
  }

  return (
    <div className="flex p-[10px] justify-center items-center">
      <div className="flex p-[10px] justify-center items-center">
        <div className="flex">
          <p className="text-[30px] bg-[#ebbb20] p-[10px] rounded-[4px] m-[10px]">{`${
            hours > 9 ? hours : "0" + hours
          }`}</p>
          <p className="text-[30px] bg-[#ebbb20] p-[10px] rounded-[4px] m-[10px]">{`${
            minutes > 9 ? minutes : "0" + minutes
          }`}</p>
          <p className="text-[30px] bg-[#ebbb20] p-[10px] rounded-[4px] m-[10px]">{`${
            seconds > 9 ? seconds : "0" + seconds
          }`}</p>
        </div>
      </div>
    </div>
  );
}
