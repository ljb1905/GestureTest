let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video);
  handpose.on("predict", gotResult);
}

function gotResult(results){
  predictions = results;
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
}

function findmax(a,b){
  if(a>=b) return a;
  return b;
}

function findmin(a,b){
  if(a<b) return a;
  return b;
}

function val_check(thres, val1, val2){
  let tmp1 = findmax(val1[0],val2[0])-findmin(val1[0],val2[0]);
  let tmp2 = findmax(val1[1],val2[1])-findmin(val1[1],val2[1]);
  if(tmp1<=thres && tmp2<=thres){
    return true;
  }
  else return false;
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      if(j>8) continue;
      const keypoint = prediction.landmarks[j];
      const thres = 50;
      if(val_check(thres,prediction.landmarks[4],prediction.landmarks[8])){
        console.log("do something");
      }
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}