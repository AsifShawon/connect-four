// $(document).ready(function () {

var player1 = prompt("Enter player 1 name: ")
var player2 = prompt("Enter player 2 name: ")

// var player1 = "player1";
// var player2 = "player2";

var temp_circ = $("button.circle");
var default_color = "rgb(182, 243, 102)";
var player1_color = "rgb(7, 105, 185)";
var player2_color = "rgb(243, 36, 36)";
var table = $("table tr");
var player_turn = 1;
var gameOn = true;
var winner;
$("#win").hide();
$("#staticBackdropLabel").hide();
$("#close").hide();

// for (let i = 0; i < temp_circ.length; i++) {
//   $(temp_circ[i]).text(i);
// }

$("#players").text("Player1: " + player1 + " | Player2: " + player2);

function player1_turn() {
  $(".turn").text(
    player1 + " : It's your turn | Please pick a column to drop your blue chip"
  );
}
player1_turn();
function player2_turn() {
  $(".turn").text(
    player2 + " : It's your turn | Please pick a column to drop your red chip"
  );
}

function changeColor(row, col, color) {
  table
    .eq(row)
    .find("td")
    .eq(col)
    .find(".circle")
    .css("background-color", color);
}

function whichColor(row, col) {
  return table
    .eq(row)
    .find("td")
    .eq(col)
    .find(".circle")
    .css("background-color");
}

function bottomAvail(col) {
  var col_rep = whichColor(6, col);
  for (var row = 6; row >= 0; row--) {
    col_rep = whichColor(row, col);
    // console.log(col_rep+" "+row);
    if (col_rep === default_color) {
      return row;
    }
  }
}

$(".circle").click(function () {
  // let row = $(this).closest("tr").index(); // Get the row index
  let column = $(this).closest("td").index(); // Get the column index
  if (player_turn === 1) {
    let row = bottomAvail(column);

    // console.log(column+" "+row);
    changeColor(row, column, player1_color);

    player2_turn();
    player_turn = 2;
  } else if (player_turn === 2) {
    changeColor(bottomAvail(column), column, player2_color);

    player1_turn();
    player_turn = 1;
  }
  checkHorizontalWin();
  checkVerticalwin();
  checkDiagonalWin_x();
  checkDiagonalWin_y();
  if (gameOn === false) {
    $(".circle").attr("disabled", true);
    $("#win-msg").html("<p>Winner " + winner + " </p>");
    $("#win").click();
    $("#staticBackdropLabel").show();
    $("#close").show();
  }
});

function checkEquality(one, two, three, four) {
  return (
    one === two &&
    two === three &&
    three === four &&
    four !== default_color &&
    four !== undefined
  );
}

function drawLine(a, b, c, d) {
    let circ = 0;
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
        if((i===a[0] && j===a[1]) || (i===b[0] && j===b[1]) || (i===c[0] && j===c[1]) || (i===d[0] && j===d[1])){
            $(temp_circ[circ]).addClass("yes")
        }
        circ++;
    }
  }
//   $(temp_circ[a[0] + a[1]]).text("-");
//   $(temp_circ[b[0] + b[1]]).text("-");
//   $(temp_circ[c[0] + c[1]]).text("-");
//   $(temp_circ[d[0] + d[1]]).text("-");
}

function checkHorizontalWin() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      let one = whichColor(i, j);
      let two = whichColor(i, j + 1);
      let three = whichColor(i, j + 2);
      let four = whichColor(i, j + 3);
    //   let a = [i, j];
    //   let b = [i, j + 1];
    //   let c = [i, j + 2];
    //   let d = [i, j + 3];
      if (checkEquality(one, two, three, four)) {
        gameOn = false;
        // drawLine(a, b, c, d);
        if (one === player1_color) {
          winner = player1;
        } else winner = player2;

        return;
      }
    }
  }
}

function checkVerticalwin() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      let one = whichColor(i, j);
      let two = whichColor(i + 1, j);
      let three = whichColor(i + 2, j);
      let four = whichColor(i + 3, j);
      let a = [i, j];
      let b = [i + 1, j];
      let c = [i + 2, j];
      let d = [i + 3, j];
      if (checkEquality(one, two, three, four)) {
        gameOn = false;
        drawLine(a, b, c, d);
        if (one === player1_color) {
          winner = player1;
        } else winner = player2;

        return;
      }
    }
  }
}

function checkDiagonalWin_x() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      let one = whichColor(i, j);
      let two = whichColor(i + 1, j + 1);
      let three = whichColor(i + 2, j + 2);
      let four = whichColor(i + 3, j + 3);
      let a = [i, j];
      let b = [i + 1, j + 1];
      let c = [i + 2, j + 2];
      let d = [i + 3, j + 3];
      if (checkEquality(one, two, three, four)) {
        gameOn = false;
        drawLine(a, b, c, d);
        if (one === player1_color) {
          winner = player1;
        } else winner = player2;

        return;
      }
    }
  }
}

function checkDiagonalWin_y() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      let one = whichColor(i, j);
      let two = whichColor(i - 1, j + 1);
      let three = whichColor(i - 2, j + 2);
      let four = whichColor(i - 3, j + 3);
      let a = [i, j];
      let b = [i - 1, j + 1];
      let c = [i - 2, j + 2];
      let d = [i - 3, j + 3];
      if (checkEquality(one, two, three, four)) {
        gameOn = false;
        drawLine(a, b, c, d);
        if (one === player1_color) {
          winner = player1;
        } else winner = player2;

        return;
      }
    }
  }
}

$("#close").click(function () {
  location.reload();
});
// })
