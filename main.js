song="";

function preload()
{
    song = loadSound("music.mp3");
}
right_wristX=0;
right_wristY=0;

scoreLeftWrist=0;
left_wristX=0;
left_wristY=0;
scoreRightWrist=0;


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
        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWristm = " + scoreLeftWrist);

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

fill("#FF0000");
stroke("#FF0000");
if(scoreLeftWrist > 0.2)
{

circle(left_wristX, left_wristY, 20);
InNumberLeftWristY=Number(left_wristY);
remove_decimals=floor(InNumberLeftWristY);
volume=remove_decimals/500;
document.getElementById("volume").innerHTML="Volume = " + volume;
song.setVolume(volume);
}
if(scoreRightWrist > 0.2)
{
    circle(right_wristX, right_wristY, 20);
    if(right_wristY >0 && right_wristY <=100)
    {
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }
    else if(right_wristY >100 && right_wristY <=200)
   {
    document.getElementById("speed").innerHTML="Speed = 1x";
    song.rate(1);
   }
   else if(right_wristY >200 && right_wristY <=300)
   {
    document.getElementById("speed").innerHTML="Speed = 1.5x";
    song.rate(1.5);
   }
   else if(right_wristY >300 && right_wristY <=400)
   {
    document.getElementById ("speed").innerHTML="Speed = 2x";
    song.rate(2);
   }
   else if(right_wristY >400 && right_wristY <=500)
   {
    document.getElementById("speed").innerHTML="Speed = 2.5x";
    song.rate(2.5);
   }
}
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}