"use strict"

// Canvas(560*270)
// 取Canves
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
context.beginPath();
context.font = "bold 12px Montserrat";

// 渲染數據
// 之後作為非同步請求Ajax OK
// 之後要做 取七天期間日期 解決 NULL + 顯示控長條圖******
function renderExerciseData() {
  
  for (let i = 0; i < 8; i++) {
    // 日期顏色
    context.fillStyle = "#343633"
    // 間隔
    let intervalH = i * 75;
    // 抓近七天 ***
    // let weekDays = ["8/2", "8/3", "8/4", "8/5", "8/6", "8/7", "8/8"];
    context.fillText(weekDays[i], intervalH + 30, 218);
    
    // 長條圖顏色
    context.fillStyle = "#6460ff"
    // 長條圖 ***
    // let kaclData = [428, 526, 377, 668, 762, 536, 294];
    // context.fillRect(X,Y,寬,消耗Kcal/5)
    let graphicLen = kaclData[i] / 5
    // 長條圖顯示範圍高 205 
    context.fillRect(intervalH + 30, 205 - graphicLen, 30, graphicLen);
    context.fillStyle = "#ff353b"
    // 每日消耗卡洛里
    context.fillText(kaclData[i], intervalH + 35, 205 - graphicLen - 5);
  }
}

// 非同步請求
// To Server requset for UserDailyRecord
let weekDays = [] ;
let kaclData = [] ;
function getUserDailyRecord() {
  fetch(`/testGraphic`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      // console.log(data[0][1]);
      for(let i = 0; i < 7; i++){
        weekDays.push(data[i][0]) ;
        kaclData.push(data[i][1]) ;
      }
      // console.log(weekDays);
      // console.log(kaclData);

    }).then(() => 
    renderExerciseData()
    );
}

// window load 開始畫基本Canvas
function doFirst() {
  // 繪製卡路里開始
  for (let i = 0; i < 11; i++) {
    // 間隔 (每100 kcal)
    let intervalV = i * 20;

    let kcalLevel = 1000;

    //消耗kcal
    //+n = 起始點
    context.fillStyle = "#343633"
    context.moveTo(26, intervalV + 5);
    context.lineTo(canvas.width, intervalV + 5);
    context.fillText(kcalLevel - (i * 100), 0, intervalV + 11);
  }

  // 渲染數據
  getUserDailyRecord();

  //橫線條
  context.strokeStyle = "rgba(0,0,0,0.15)";
  context.stroke();

  // 標記 kcal
  context.beginPath();
  context.font = "bold 12px Montserrat";
  context.fillStyle = "#343633"
  context.fillText("kcal", 0, 228);
  context.stroke();
}

window.addEventListener("load", doFirst);

