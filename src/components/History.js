import React from "react";

export default function History(props) {
  const { list } = props;
  return (
    <div className="overflow-y-auto flex-wrap absolute w-[40%] left-[30%] top-[20%] p-[1%]">
      <table className="w-full">
        <thead className="w-full">
          <th className="w-[40%] justify-center items-center p-[15px] border-b-2 border-b-white border-r-2 border-r-white">
            <p className="text-[#ffd209] text-[20px]">Earn</p>
          </th>
          <th className="w-[60%] justify-center items-center p-[15px] border-b-2 border-b-white">
            <p className="text-[#24ff35] text-[20px]">Time</p>
          </th>
        </thead>
        <tbody>
          {list.length &&
            list.map((item, index) => {
              let temp = new Date(item.playtime);
              let time =
                temp.getFullYear() +
                "/" +
                (temp.getMonth() + 1) +
                "/" +
                temp.getDate() +
                " " +
                temp.getHours() +
                ":" +
                temp.getMinutes() +
                ":" +
                temp.getSeconds();
              return (
                <tr className="py-2">
                  <td
                    key={index}
                    className="w-[40%] justify-center items-center p-[15px] border-r-2 border-r-white"
                  >
                    <p className="text-white text-[15px]">{item.earn}</p>
                  </td>
                  <td
                    key={index}
                    className="w-[60%] justify-center items-center p-[15px]"
                  >
                    <p className="text-white text-[15px]">{time}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
