import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import gamebox from "./assets/images/game-box.png";
import logo from "./assets/images/logo.png";
import othericonback from "./assets/images/other-icon-back.png";
import metamaskicon from "./assets/images/metamask-icon.png";
import soundicon from "./assets/images/sound-icon.png";
import playicon from "./assets/images/play-icon.png";
import historyicon from "./assets/images/history-icon.png";
import modal from "./assets/images/modal.png";

import MainGame from "./components/MainGame";
import History from "./components/History";
import Timer from "./components/Timer";
import GameEnd from "./components/GameEnd";
import SpookyShibaToken from "./abis/SpookyShibaToken.json";
axios.defaults.baseURL = "http://localhost:8080";

const itemName = [
  "You get Legend NFT",
  "You get Rare NFT",
  "You get Common NFT",
  "You get T-shirt",
  "No earn",
];

function App() {
  const [gameBoxStatus, setGameBoxStatus] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStatus, setStatus] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);
  const [lastTime, setLastTime] = useState("");
  const [playNumber, setPlayNumber] = useState(4);
  const _onPressHistoryButton = async () => {
    setGameBoxStatus(2);
    const response = await axios
      .get(`history/${walletAddress}`)
      .then((response) => {
        setHistoryList(response.data.history);
      })
      .catch((error) => console.log(error));
  };
  const _onPressPlayButton = async () => {
    if (gameBoxStatus == 1) {
      /*let web3 = window.web3;
      const spookyShibaToken = new web3.eth.Contract(
        SpookyShibaToken,
        "0x9c2B1B3780A8B36B695f0b2781668664aC1Bf25A"
      );
      let testTokenBalance = await spookyShibaToken.methods
        .balanceOf(walletAddress)
        .call();
      console.log(testTokenBalance);*/
    } else {
      const response = await axios
        .get(`time/${walletAddress}`)
        .then((response) => {
          setLastTime(response.data.result);
        })
        .catch((error) => console.log(error));

      setGameBoxStatus(0);
    }
  };
  const gameFinish = async () => {
    setGameBoxStatus(3);
    let earnThing;
    if (playNumber == 3) earnThing = 0;
    else if (playNumber % 100000 == 0) earnThing = 1;
    else if (playNumber % 10000 == 1) earnThing = 2;
    else if (playNumber % 1000 == 2) earnThing = 3;
    else earnThing = 4;
    await axios
      .post("/add", {
        address: walletAddress,
        earn: itemName[earnThing],
        playtime: new Date().toString(),
      })
      .then((response) => {})
      .catch((error) => console.log(error));
  };
  const startGame = async (address, statusnum) => {
    setGameBoxStatus(statusnum);
    setWalletAddress(address);
  };
  return (
    <div className="flex w-full h-[100vh] justify-center items-center bg-[url('./assets/images/background.png')] bg-cover bg-no-repeat">
      <div className="w-full h-full flex">
        <img
          src={logo}
          alt="logo"
          className="absolute left-[3%] top-[2%] w-[12%] h-[13%]"
        />
        <img
          src={gamebox}
          alt="gamebox"
          className="absolute left-[23%] top-[5%] w-[54%] h-[90%]"
        />
        {gameBoxStatus == 0 && (
          <Timer finish={setGameBoxStatus} lasttime={lastTime} />
        )}
        {gameBoxStatus == 1 && (
          <MainGame gamefinish={gameFinish} playnumber={playNumber} />
        )}
        {gameBoxStatus == 2 && <History list={historyList} />}
        {gameBoxStatus == 3 && <GameEnd getearn={playNumber} />}
        {/* <WalletConnectExperience startGame={startGame} /> */}
        <div
          className={`${
            modalVisible ? "" : "hidden"
          } absolute w-[50%] h-[30%] top-[35%] left-[25%]`}
        >
          <img src={modal} alt="modal" className="w-full h-full absolute z-0" />
          <div className="flex flex-col w-full h-full ">
            <input
              type="text"
              onChange={(e) => {
                setWalletAddress(e.target.value);
              }}
              value={walletAddress}
              className="w-[91%] h-[26%] text-2xl top-[36%] left-[5%] pl-4 pr-2 absolute bg-transparent  "
            />
            <button
              className="w-[58%] h-[20%] top-[72%] left-[21%] opacity-0 hover:opacity-20 absolute bg-black"
              onClick={() => setModalVisible(!modalVisible)}
            ></button>
          </div>
        </div>
        <button
          className="flex absolute w-[15%] h-[15%] top-[50%] hover:opacity-80"
          onClick={() => setModalVisible(true)}
        >
          <img
            src={othericonback}
            alt="othericonback"
            className="flex w-full h-full"
          />
          <img
            src={metamaskicon}
            alt="metamaskicon"
            className="flex absolute left-[35%] w-[30%] h-[35%] top-[40%]"
          />
        </button>
        <button className="flex absolute w-[15%] h-[15%] top-[70%] hover:opacity-80">
          <img
            src={othericonback}
            alt="othericonback"
            className="flex w-full h-full"
          />
          <img
            src={soundicon}
            alt="soundicon"
            className="flex absolute left-[35%] w-[30%] h-[35%] top-[40%]"
          />
        </button>
        <button
          className="flex absolute w-[20%] h-[18%] top-[45%] right-[2%] hover:opacity-80"
          onClick={_onPressPlayButton}
        >
          <img src={playicon} alt="playicon" className="flex w-full h-full" />
        </button>
        <button
          className="flex absolute w-[15%] h-[15%] top-[75%] right-0 hover:opacity-80"
          onClick={_onPressHistoryButton}
        >
          <img
            src={othericonback}
            alt="playicon"
            className="flex w-full h-full"
            styles={{ transform: [{ rotateY: "180deg" }] }}
          />
          <img
            src={historyicon}
            alt="historyicon"
            className="flex absolute left-[35%] w-[30%] h-[35%] top-[40%]"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
