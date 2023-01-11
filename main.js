song="";

function preload()
{
    song = loadSound    ("music.mp3");
}
right_wristX=0;
right_wristY=0;

left_wristX=0;
left_wristY=0;



function setup()
{
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose' ,gotPoses);
}

function modelLoaded()
{
console.log("PoseNet is Initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        right_wristX=results[0].pose.rightWrist.x;
        right_wristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + right_wristX + "rightWristY = " + right_wristY);

         left_wristX=results[0].pose.leftWrist.x;
        left_wristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + left_wristX + "leftWristY = " + left_wristY);
    }
}
function draw()
{
image(video, 0, 0, 600, 500);
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}