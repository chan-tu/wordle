const answer = "RIGHT";

let attemp = 0;
let index = 0;
let time;

function gameStart() {
  const displaygameover = () => {
    const div = document.createElement("div");
    div.innerText = "Finish!";
    div.style =
      "display:flex; justify-content:center; align-item:center; position:absolute; top:38vh; left:41.5vw; background-color:black; color:white; width:325px; height:100px; font-size:100px;";
    document.body.appendChild(div);
  };
  const next = () => {
    if (attemp === 6) return gameover();
    attemp++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", key_action);
    displaygameover();
    clearInterval(time);
  };

  const enterkey_action = () => {
    let answer_nember = 0;
    for (let i = 0; i < 5; i++) {
      const boro = document.querySelector(
        `.board-block[data-index='${attemp}${i}']`
      );
      const letter = boro.innerText;
      const answer_text = answer[i];
      if (letter === answer_text) {
        answer_nember++;
        boro.style.background = "#6AAA64";
      } else if (answer.includes(letter)) boro.style.background = "#C9B458";
      else boro.style.background = "#787C7E";

      boro.style.color = "white";
    }
    if (answer_nember === 5) gameover();
    else next();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attemp}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
    yg;
  };

  const key_action = (key_evant) => {
    const key = key_evant.key.toUpperCase();
    const keyNubemer = key_evant.keyCode;
    const thisblock = document.querySelector(
      `.board-block[data-index='${attemp}${index}']`
    );

    if (key_evant.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (key_evant.key === "Enter") enterkey_action();
      else return;
    } else if (65 <= keyNubemer && keyNubemer <= 90) {
      thisblock.innerText = key;
      index++;
    }
  };
  const starttime = () => {
    const timestart = new Date();

    function setTime() {
      const nowtime = new Date();
      const flowtime = new Date(nowtime - timestart);
      const min = flowtime.getMinutes().toString().padStart(2, "0");
      const sec = flowtime.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${min}:${sec}`;
    }
    time = setInterval(setTime, 1000);
  };
  starttime();
  window.addEventListener("keydown", key_action);
}

gameStart();
