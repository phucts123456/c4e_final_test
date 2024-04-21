let player_X = 1;

let player_O = 2;
let default_Player = player_X;
let default_map = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let match_status_playing = 0;
let match_status_player_X_win = 1;
let match_status_player_O_win = 2;
let match_status_draw = 3;

let default_map_string = JSON.stringify(default_map);

document.addEventListener("DOMContentLoaded", function (event) {
  //init component
  sessionStorage.clear();
  let btn_play = document.getElementsByClassName("btn_play")[0];
  let btn_play_again = document.getElementsByClassName("btn_play_again")[0];
  if (sessionStorage.getItem("player_turn") != null) {
    btn_play.disabled = true;
    btn_play_again.disabled = true;
  } else {
    btn_play.disabled = false;
    btn_play_again.disabled = true;
  }
  //end init component
  btn_play.addEventListener("click", function () {
    btn_play.disabled = true;
    btn_play_again.disabled = true;
    startGame();
  });
  btn_play_again.addEventListener("click", function () {
    btn_play.disabled = true;
    btn_play_again.disabled = true;
    startGame();
  });
});

let play_ground = document.getElementsByClassName("play_ground_item");
console.log(play_ground);
for (let item of play_ground) {
  item.addEventListener("click", function (e) {
    let selected_direction_x = item.getAttribute("data-x");
    let selected_direction_y = item.getAttribute("data-y");
    if (canPick(item, selected_direction_x, selected_direction_y) == false)
      return;
    setData(item, selected_direction_x, selected_direction_y);
    let turn_num = Number.parseInt(sessionStorage.getItem("turn_num"));
    sessionStorage.setItem("turn_num", turn_num + 1);
    console.log(turn_num + 1);
    let match_status = GetMatchStatus();
    if (match_status == match_status_player_X_win) {
      endGame(match_status_player_X_win);
    } else if (match_status == match_status_player_O_win) {
      endGame(match_status_player_O_win);
    } else if (match_status == match_status_draw) {
      endGame(match_status_draw);
    }
  });
}

function addImage(item) {
  item.append(getImageX());
}

function getResult() {}

function getCellData(x, y) {
  if (localStorage.getItem("current_game_map") != null) {
    let current_map = JSON.parse(localStorage.getItem("current_game_map"));
    return current_map[x][y] ?? current_map[x][y];
  }
}

function changeCellData(data, x, y) {
  let current_map = JSON.parse(localStorage.getItem("current_game_map"));
  current_map[x][y] = data;
  localStorage.setItem("current_game_map", JSON.stringify(current_map));
}

function canPick(item, x, y) {
  if (getCellData(x, y) == 0 && sessionStorage.getItem("player_turn") != null) {
    return true;
  } else if (
    (getCellData(x, y) == 1 || getCellData(x, y) == 2) &&
    sessionStorage.getItem("player_turn") != null
  ) {
    alert("Ô này đã có người chọn, xin hãy chọn ô khác.");
    return false;
  } else {
    alert("Hãy bắt đầu game rồi chọn.");
    return false;
  }
}

function setData(item, x, y) {
  let current_turn = sessionStorage.getItem("player_turn");
  console.log("current_turn" + current_turn);
  // set image
  // set map data
  // set player turn
  if (current_turn == default_Player) {
    item.append(getImageX());
    // set next turn
    sessionStorage.setItem("player_turn", player_O);
    console.log("next_turn" + sessionStorage.getItem("player_turn"));
    let current_player = document.getElementsByClassName("current_player")[0];
    current_player.innerText = "O";
    changeCellData(player_X, x, y);
    console.log("Map sau khi đi");
    console.log(localStorage.getItem("current_game_map"));
  } else {
    item.append(getImageO());
    // set next turn
    sessionStorage.setItem("player_turn", player_X);
    let current_player = document.getElementsByClassName("current_player")[0];
    current_player.innerText = "X";
    console.log("next_turn" + sessionStorage.getItem("player_turn"));
    changeCellData(player_O, x, y);
    console.log("Map sau khi đi");
    console.log(localStorage.getItem("current_game_map"));
  }
}

function getPlayerTurn() {}

function startGame() {
  // set session game
  sessionStorage.setItem("player_turn", default_Player);
  // set session game
  sessionStorage.setItem("turn_num", 0);
  // setText
  let current_player = document.getElementsByClassName("current_player")[0];
  current_player.innerText = default_Player == 1 ? "X" : "O";
  let game_msg = document.getElementsByClassName("game_msg")[0];
  game_msg.innerText = "Hãy chiến đấu hết mình";
  localStorage.setItem("current_game_map", default_map_string);
  console.log(localStorage.getItem("current_game_map"));
  let game_msg_status = document.getElementsByClassName("game_msg_status")[0];
  game_msg_status.innerText = "";
  // reset play_ground
  let play_ground = document.getElementsByClassName("play_ground_item");
  for (let item of play_ground) {
    item.style.backgroundColor = "White";
    item.addEventListener("mouseover", function () {
      item.style.backgroundColor = "Aquamarine";
    });
    item.addEventListener("mouseout", function () {
      item.style.backgroundColor = "White";
    });
    let img_tag = item.getElementsByTagName("img")[0];
    if (item.hasChildNodes("img")) item.removeChild(img_tag);
  }
}

function ChangeBackGroundColor(x, y) {
  for (let item of play_ground) {
    let selected_direction_x = item.getAttribute("data-x");
    let selected_direction_y = item.getAttribute("data-y");
    if (selected_direction_x == x && selected_direction_y == y) {
      item.style.backgroundColor = "cornflowerblue";
      item.addEventListener("mouseover", function () {
        item.style.backgroundColor = "cornflowerblue";
      });
      item.addEventListener("mouseout", function () {
        item.style.backgroundColor = "cornflowerblue";
      });
    }
  }
}

function GetMatchStatus() {
  let current_map = JSON.parse(localStorage.getItem("current_game_map"));
  if (
    current_map[0][0] == current_map[1][1] &&
    current_map[1][1] == current_map[2][2] &&
    current_map[2][2] != 0
  ) {
    ChangeBackGroundColor(0, 0);
    ChangeBackGroundColor(1, 1);
    ChangeBackGroundColor(2, 2);
    if (current_map[2][2] == 1) {
      return match_status_player_X_win;
    } else {
      return match_status_player_O_win;
    }
  } else if (
    current_map[0][2] == current_map[1][1] &&
    current_map[1][1] == current_map[2][0] &&
    current_map[2][0] != 0
  ) {
    ChangeBackGroundColor(0, 2);
    ChangeBackGroundColor(1, 1);
    ChangeBackGroundColor(2, 0);
    if (current_map[2][0] == 1) {
      return match_status_player_X_win;
    } else {
      return match_status_player_O_win;
    }
  }
  for (let row = 0; row < 3; row++) {
    if (
      current_map[row][0] == current_map[row][1] &&
      current_map[row][1] == current_map[row][2] &&
      current_map[row][2] != 0
    ) {
      ChangeBackGroundColor(row, 0);
      ChangeBackGroundColor(row, 1);
      ChangeBackGroundColor(row, 2);
      if (current_map[row][2] == 1) {
        return match_status_player_X_win;
      } else {
        return match_status_player_O_win;
      }
    } else if (
      current_map[0][row] == current_map[1][row] &&
      current_map[1][row] == current_map[2][row] &&
      current_map[2][row] != 0
    ) {
      ChangeBackGroundColor(0, row);
      ChangeBackGroundColor(1, row);
      ChangeBackGroundColor(2, row);
      if (current_map[2][row] == 1) {
        return match_status_player_X_win;
      } else {
        return match_status_player_O_win;
      }
    }
  }
  if (sessionStorage.getItem("turn_num") == 9) {
    return match_status_draw;
  }
  return match_status_playing;
}

function endGame(status) {
  let status_msg = "";
  let btn_play = document.getElementsByClassName("btn_play")[0];
  let btn_play_again = document.getElementsByClassName("btn_play_again")[0];
  sessionStorage.clear();
  localStorage.clear();
  btn_play.disabled = false;
  btn_play_again.disabled = false;
  let game_msg = document.getElementsByClassName("game_msg")[0];
  let current_player = document.getElementsByClassName("current_player")[0];
  current_player.innerText = "";
  game_msg.innerText = "Nhấn chơi lại để bắt đầu lại";
  switch (status) {
    case match_status_player_X_win:
      status_msg = `Người chơi X đã chiến thắng`;
      break;
    case match_status_player_O_win:
      status_msg = `Người chơi O đã chiến thắng`;
      break;
    case match_status_draw:
      status_msg = `Chưa có người chiến thắng`;
      break;

    default:
      break;
  }
  let game_msg_status = document.getElementsByClassName("game_msg_status")[0];
  game_msg_status.innerText = status_msg;
}

function getImageX() {
  return create_element("img", { src: "./resources/x.png" });
}

function getImageO() {
  return create_element("img", { src: "./resources/o.png" });
}

function create_element(tag_name, attributes) {
  let element = document.createElement(tag_name);

  if (attributes) {
    for (let key in attributes) {
      element[key] = attributes[key];
    }
  }

  return element;
}
