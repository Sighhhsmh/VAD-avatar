var PadRotX;
var PadRotZ;
var PadTop;
var PadLeft;
var PadFlip;
var PadPersp;
var PadScale;
var PadRotSensi;
var isMouseVisible;

var FaceImgURL;
var FaceTop;
var FaceLeft;
var FaceScale;
var MouthTop;
var MouthLeft;
var MouthScale;

var fftSize;
var AudioThreshold;
var ThresholdMult;
var FaceShake;
var ShakeSpeed;
var ShakeMultiplier;

var SphereRadX;
var FacePersp;
var LookXRange;
var LookYRange;
var MaxPitchLimit;
var MaxYawLimit;

var MouseIdleTimeout;
var MouseRotationAmount;
document.addEventListener('DispatchTransform', function (event) {
    // PadRotX = event.detail.rotationX;
    // PadRotZ = event.detail.rotationZ;
    // PadTop = event.detail.top;
    // PadLeft = event.detail.left;

    // console.log(PadRotX, PadRotZ);


    // document.documentElement.style.setProperty('--RotX', PadRotX);
    // document.documentElement.style.setProperty('--RotZ', PadRotZ);
    // document.documentElement.style.setProperty('--PTop', PadTop);
    // document.documentElement.style.setProperty('--PLeft', PadLeft);
    
});

// document.addEventListener('DOMContentLoaded', function () {
//
// });









// Function to save variables' states to Local Storage
export function RESETVARIABLES() {
    PadRotX = localStorage.setItem('PadRotX', 0);
    PadRotZ = localStorage.setItem('PadRotZ', 0);
    PadTop = localStorage.setItem('PadTop', 0);
    PadLeft = localStorage.setItem('PadLeft', 0);
    PadScale = localStorage.setItem('PadScale', 0.6);
    PadPersp = localStorage.setItem('PadPersp', 800);
    PadRotSensi = localStorage.setItem('PadRotSensi', 0.2);

    FaceImgURL = localStorage.setItem('FaceImgURL', "../assets/invisible.png");
    FaceTop = localStorage.setItem('FaceTop', null);
    FaceLeft = localStorage.setItem('FaceLeft', null);
    MouthTop = localStorage.setItem('MouthTop', 0);
    MouthLeft = localStorage.setItem('MouthLeft', 0);
    FaceScale = localStorage.setItem('FaceScale', 100);
    MouthScale = localStorage.setItem('MouthScale', 1);

    fftSize = localStorage.setItem('fftSize', 256);
    AudioThreshold = localStorage.setItem('AudioThreshold', 30);
    // ThresholdMult = localStorage.setItem('ThresholdMult', 0.8);
    FaceShake = localStorage.setItem('FaceShake', 0.04);
    ShakeSpeed = localStorage.setItem('ShakeSpeed', 150);
    ShakeMultiplier = localStorage.setItem('ShakeMultiplier', 1);

    SphereRadX = localStorage.setItem('SphereRadX', -20);
    FacePersp = localStorage.setItem('FacePersp', 1000);
    LookXRange = localStorage.setItem('LookXRange', 250);
    LookYRange = localStorage.setItem('LookYRange', 250);
    MaxPitchLimit = localStorage.setItem('MaxPitchLimit', 4);
    MaxYawLimit = localStorage.setItem('MaxYawLimit', 3);

    MouseIdleTimeout = localStorage.setItem('MouseIdleTimeout', 1000);
    MouseRotationAmount = localStorage.setItem('MouseRotationAmount', 15);
    // Add more variables as needed
}

// Function to initialize variables with default values or retrieved values from Local Storage
function initVariables() {
    PadRotX = localStorage.getItem('PadRotX') || '0';
    PadRotZ = localStorage.getItem('PadRotZ') || '0';
    PadTop = localStorage.getItem('PadTop') || '0';
    PadLeft = localStorage.getItem('PadLeft') || '0';
    PadScale = localStorage.getItem('PadScale') || '1';
    PadPersp = localStorage.getItem('PadPersp') || '800';
    PadRotSensi = localStorage.getItem('PadRotSensi') || '0.2';
    isMouseVisible = localStorage.getItem('isMouseVisible');

    FaceImgURL = localStorage.getItem('FaceImgURL') || "../assets/invisible.png";
    FaceTop = localStorage.getItem('FaceTop') || '0';
    FaceLeft = localStorage.getItem('FaceLeft') || '0';
    MouthTop = localStorage.getItem('MouthTop') || '0';
    MouthLeft = localStorage.getItem('MouthLeft') || '0';
    FaceScale = localStorage.getItem('FaceScale') || '100';
    MouthScale = localStorage.getItem('MouthScale') || '1';

    fftSize = localStorage.getItem('fftSize') || '256';
    AudioThreshold = localStorage.getItem('AudioThreshold') || '38';
    ThresholdMult = localStorage.getItem('ThresholdMult') || '0.8';
    FaceShake = localStorage.getItem('FaceShake') || '1.3';
    ShakeSpeed = localStorage.getItem('ShakeSpeed') || '10';
    ShakeMultiplier = localStorage.getItem('ShakeMultiplier')||'1';

    SphereRadX = localStorage.getItem('SphereRadX') || '-20';
    FacePersp = localStorage.getItem('FacePersp') || '1000';
    LookXRange = localStorage.getItem('LookXRange') || '250';
    LookYRange = localStorage.getItem('LookYRange') || '250';
    MaxPitchLimit = localStorage.getItem('MaxPitchLimit') || '4';
    MaxYawLimit = localStorage.getItem('MaxYawLimit') || '3';

    MouseIdleTimeout = localStorage.getItem('MouseIdleTimeout') || '1000';
    MouseRotationAmount = localStorage.getItem('MouseRotationAmount') || '15';


    // Initialize more variables as needed
}



// Function to be executed when the window unloads
// window.onunload = function() {
//     saveStateToLocalStorage();
// }

// Function to be executed when the window loads
// window.onload = function() {
    // initVariables();
    
    // Use the initialized variables in your code
// }






export function PadValInit()
{
    PadRotSensi = localStorage.getItem('PadRotSensi') || '0.2';
    MouseIdleTimeout = localStorage.getItem('MouseIdleTimeout') || '1000';
    MouseRotationAmount = localStorage.getItem('MouseRotationAmount') || '15';
    document.getElementById('RES').value = PadRotSensi;
    document.getElementById('15').innerText = PadRotSensi;
    document.getElementById('MMR').value = MouseRotationAmount;
    document.getElementById('16').innerText = MouseRotationAmount;
    document.getElementById('MRT').value = MouseIdleTimeout;
    document.getElementById('17').innerText = MouseIdleTimeout;
    PadRotX = localStorage.getItem('PadRotX') || '0';
    PadRotZ = localStorage.getItem('PadRotZ') || '0';
    PadTop = localStorage.getItem('PadTop') || '140';
    PadLeft = localStorage.getItem('PadLeft') || '-172';
    PadScale = localStorage.getItem('PadScale') || '0.6';
    PadPersp = localStorage.getItem('PadPersp') || '800';
    PadFlip = localStorage.getItem('PadFlip') || '0';
    document.getElementById('rotating').style.transform = `perspective(${PadPersp}px) scale(${PadScale}) rotateX(${PadRotX}deg) rotateY(${PadFlip}deg) rotateZ(${PadRotZ}deg)`;
    document.getElementById('moving').style.top = `${PadTop}px`
    document.getElementById('moving').style.left = `${PadLeft}px`
    document.getElementById('moving').style.transform = `scale(${PadScale})`
    document.getElementById('vmScale').value = PadScale*100
    document.getElementById('8').innerText = PadScale*100;
    document.getElementById('PPS').value = PadPersp;
    document.getElementById('19').innerText = PadPersp;
    var isMouseVisible = localStorage.getItem('isMouseVisible');
    if (isMouseVisible === null || isMouseVisible === undefined) {
        isMouseVisible = false;
    } else {
        isMouseVisible = JSON.parse(isMouseVisible);
    }
    document.getElementById('hidemouse').checked = !isMouseVisible; 
    document.getElementById('hidemouse').dispatchEvent(new Event('change'));
};
export function FacePosInit()
{
    SphereRadX = localStorage.getItem('SphereRadX') || '-20';
    FacePersp = localStorage.getItem('FacePersp') || '1000';
    LookXRange = localStorage.getItem('LookXRange') || '250';
    LookYRange = localStorage.getItem('LookYRange') || '250';
    MaxPitchLimit = localStorage.getItem('MaxPitchLimit') || '4';
    MaxYawLimit = localStorage.getItem('MaxYawLimit') || '3';
    document.getElementById('FMP').value = MaxPitchLimit;
    document.getElementById('9').innerText = MaxPitchLimit;
    document.getElementById('FMY').value = MaxYawLimit;
    document.getElementById('10').innerText = MaxYawLimit;
    document.getElementById('FXM').value = LookXRange;
    document.getElementById('11').innerText = LookXRange;
    document.getElementById('FYM').value = LookYRange;
    document.getElementById('12').innerText = LookYRange;
    document.getElementById('FSS').value = SphereRadX;
    document.getElementById('13').innerText = SphereRadX;
    document.getElementById('PS').value = FacePersp;
    document.getElementById('14').innerText = FacePersp;
    FaceImgURL = localStorage.getItem('FaceImgURL') || "../assets/invisible.png";
    MouthTop = localStorage.getItem('MouthTop') || '0';
    MouthLeft = localStorage.getItem('MouthLeft') || '0';
    FaceScale = localStorage.getItem('FaceScale') || '100';
    MouthScale = localStorage.getItem('MouthScale') || '100';
    document.getElementById('face').src = FaceImgURL;
    document.getElementById('facegroup').style.transform = 'scale(' + (FaceScale / 100) + ')';
    FaceTop = localStorage.getItem('FaceTop') || screen.height/1.8-(document.getElementById('facegroup').clientHeight);
    FaceLeft = localStorage.getItem('FaceLeft') || screen.width/2-(document.getElementById('facegroup').clientWidth/2);
    document.getElementById('facegroup').style.top = `${FaceTop}px`;
    document.getElementById('facegroup').style.left = `${FaceLeft}px`;
    document.getElementById('consolidated').style.top = `${FaceTop}px`;
    document.getElementById('consolidated').style.left = `${FaceLeft}px`;
    document.getElementById('draggableDiv').style.top = `${MouthTop}px`;
    document.getElementById('draggableDiv').style.left = `${MouthLeft}px`;
    document.getElementById('facesize').value = FaceScale;
    document.getElementById('6').innerText = FaceScale;
    document.querySelectorAll('.mouth').forEach(function (image) {image.style.transform = 'scale(' + (MouthScale / 100) + ')';});
    document.getElementById('resizer').value = MouthScale;
    document.getElementById('4').innerText = MouthScale;
    var LookBool = localStorage.getItem("look-bool") || "1";
    var stat;
    if (LookBool === "1") { stat = true; } else { stat = false; }
    document.getElementById("enableRotation").checked = stat;
    document.getElementById("enableRotation").dispatchEvent(new Event('change'));
};
export function VADinit()
{
    fftSize = localStorage.getItem('fftSize') || 256; //default 256
    AudioThreshold = localStorage.getItem('AudioThreshold') || -30; //default 38
    // ThresholdMult = localStorage.getItem('ThresholdMult') || 0.8; //default 0.8
    FaceShake = localStorage.getItem('FaceShake') || 0.30;
    ShakeSpeed = localStorage.getItem('ShakeSpeed') || 150;
    document.getElementById('FSA').value = FaceShake;
    document.getElementById('20').innerText = FaceShake;
    document.getElementById('SS').value = ShakeSpeed;
    document.getElementById('21').innerText = ShakeSpeed;
    document.getElementById('fftSize').value = fftSize;
    document.getElementById('1').innerText = fftSize;
    document.getElementById('threshold').value = AudioThreshold;
    document.getElementById('3').innerText = AudioThreshold + ' ' + 'dBs';
    // document.getElementById('TS').value = ThresholdMult;
    // document.getElementById('18').innerText = ThresholdMult;
};
export function PropInit()
{
    var ps1 = parseFloat(localStorage.getItem("ps1")) || "1";
    var ps2 = parseFloat(localStorage.getItem("ps2")) || "1";
    var ps3 = parseFloat(localStorage.getItem("ps3")) || "1";
    var ps4 = parseFloat(localStorage.getItem("ps4")) || "1";
    var ps5 = parseFloat(localStorage.getItem("ps5")) || "1";
    
    var p1t = localStorage.getItem("prp1-top") || '0';
    var p1l = localStorage.getItem("prp1-left") || '0';
    Array.from(document.getElementsByClassName('prp1')).forEach(function (div) { div.style.top = `${p1t}px`; div.style.left = `${p1l}px`; div.style.transform = `scale(${ps1})`; });
    var p2t = localStorage.getItem("prp2-top") || '0';
    var p2l = localStorage.getItem("prp2-left") || '0';
    Array.from(document.getElementsByClassName('prp2')).forEach(function (div) { div.style.top = `${p2t}px`; div.style.left = `${p2l}px`; div.style.transform = `scale(${ps2})`; });
    var p3t = localStorage.getItem("prp3-top") || '0';
    var p3l = localStorage.getItem("prp3-left") || '0';
    Array.from(document.getElementsByClassName('prp3')).forEach(function (div) { div.style.top = `${p3t}px`; div.style.left = `${p3l}px`; div.style.transform = `scale(${ps3})`; });
    var p4t = localStorage.getItem("prp4-top") || '0';
    var p4l = localStorage.getItem("prp4-left") || '0';
    Array.from(document.getElementsByClassName('prp4')).forEach(function (div) { div.style.top = `${p4t}px`; div.style.left = `${p4l}px`; div.style.transform = `scale(${ps4})`; });
    var p5t = localStorage.getItem("prp5-top") || '0';
    var p5l = localStorage.getItem("prp5-left") || '0';
    Array.from(document.getElementsByClassName('prp5')).forEach(function (div) { div.style.top = `${p5t}px`; div.style.left = `${p5l}px`; div.style.transform = `scale(${ps5})`; });
}