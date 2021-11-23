const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const mainAudio = wrapper.querySelector("#main-audio");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");
const musicList = wrapper.querySelector(".music-list");
const moreMusicBtn = wrapper.querySelector("#more-music");
const closemoreMusic = wrapper.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isMusicPaused = true; // by default music will be paused

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(indexNumb){
    musicName.innerHTML = allMusic[indexNumb - 1].name;
    musicArtist.innerHTML = allMusic[indexNumb - 1].artist;
    musicImg.src= `./Images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `./Songs/${allMusic[indexNumb - 1].src}.mp3`;
}
//play music function
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}
//prev music function
function prevMusic(){
    musicIndex--;
    if(musicIndex < 1)
    {
        musicIndex = allMusic.length;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
//Next music function
function nextMusic(){
    musicIndex++;
    if(musicIndex > 6)
    {
        musicIndex = 1;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

playPauseBtn.addEventListener("click",() => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});
prevBtn.addEventListener("click",() => {
    prevMusic();
});
nextBtn.addEventListener("click",() => {
    nextMusic();
});

mainAudio.addEventListener("timeupdate",(e) => {
const currentTime = e.target.currentTime;
const duration = e.target.duration;

let progressWidth = (currentTime/duration)*100;
progressBar.style.width = `${progressWidth}%`;

let musicCurrentTime = wrapper.querySelector(".current-timer");
let musicDuration = wrapper.querySelector(".duration-timer");

mainAudio.addEventListener("loadeddata",() => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10)
    {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
});

let currentMin = Math.floor(currentTime / 60);
let currentSec = Math.floor(currentTime % 60);
if(currentSec < 10)
    {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

