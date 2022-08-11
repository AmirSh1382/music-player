let $ = document;

////////////////////////////

const body = $.body;
const bgContainer = $.querySelector(".bgContainer");
const coverImg = $.querySelector(".coverImg");
const audioElem = $.querySelector("audio");
const audioNameElem = $.querySelector(".audioName");
const audioArtistElem = $.querySelector(".audioArtist");
const currentTimeElem = $.querySelector(".currentTime");
const durationElem = $.querySelector(".duration");
const progressBarElem = $.querySelector(".progressBar");
const progressElem = $.querySelector(".progress");
const backwardBtn = $.querySelector(".fa-backward");
const playOrPauseBtn = $.querySelector(".fa-play");
const forwardBtn = $.querySelector(".fa-forward");

const audios = [
  {
    audioSrc: "./Source/Media/Audios/Eminem_-_My_Destiny.mp3",
    cover: "./Source/Media/Images/img-1.jpg",
    audioName: "My Destiny",
    audioArtist: "Eminem",
  },
  {
    audioSrc:
      "./Source/Media/Audios/Reza_Pishro__-_Tamum_Shode_(Ft_Kamyar).mp3",
    cover: "./Source/Media/Images/img-2.jpg",
    audioName: "Tamum Shode",
    audioArtist: "Pishro",
  },
  {
    audioSrc: "./Source/Media/Audios/Sohrab MJ-Haghighat-[ChizMusic.Com].mp3",
    cover: "./Source/Media/Images/img-3.jpg",
    audioName: "Haghighat",
    audioArtist: "Sohrab MJ",
  },
  {
    audioSrc: "./Source/Media/Audios/Ho3ein - Kodex-1.mp3",
    cover: "./Source/Media/Images/img-4.jpg",
    audioName: "Kodex",
    audioArtist: "Hossein",
  },
];


// Functions
// to show playing status
let isPlaying = false;

// to audio array current Index
let srcIndex = 0;

// to update the dom onload
function domUpdater() {
  audioElem.src = audios[srcIndex].audioSrc;
  audioNameElem.innerHTML = audios[srcIndex].audioName;
  audioArtistElem.innerHTML = audios[srcIndex].audioArtist;
  bgContainer.style.backgroundImage = "url(\"" + audios[srcIndex].cover + "\")"
  coverImg.style.backgroundImage = "url(\"" + audios[srcIndex].cover + "\")"
}
domUpdater();

// the play order
function playMusic() {
  playOrPauseBtn.className = "fa-solid fa-pause";
  audioElem.play();
}

// the pause order
function pauseMusic() {
  playOrPauseBtn.className = "fa-solid fa-play";
  audioElem.pause();
}

// to go to the previous song
function previousMusic() {
  srcIndex--;
  if (srcIndex < 0) {
    srcIndex = audios.length - 1;
  }

  audioElem.src = audios[srcIndex].audioSrc;
  audioNameElem.innerHTML = audios[srcIndex].audioName;
  audioArtistElem.innerHTML = audios[srcIndex].audioArtist;
  bgContainer.style.backgroundImage = "url(\"" + audios[srcIndex].cover + "\")"
  coverImg.style.backgroundImage = "url(\"" + audios[srcIndex].cover + "\")"


  changeCoverImgAnimation();
  playMusic();
}

// to play or pause the song
function playOrPause() {
  if (isPlaying) {
    pauseMusic();
    isPlaying = false;
  } else {
    playMusic();
    isPlaying = true;
  }
}

// to go to the next song
function nextMusic() {
  srcIndex++;
  if (srcIndex > audios.length - 1) {
    srcIndex = 0;
  }

  audioElem.src = audios[srcIndex].audioSrc;
  audioNameElem.innerHTML = audios[srcIndex].audioName;
  audioArtistElem.innerHTML = audios[srcIndex].audioArtist;

  changeCoverImgAnimation();
  bgContainer.style.backgroundImage = "url(\"" + audios[srcIndex].cover + "\")"
  coverImg.style.backgroundImage = "url(\"" + audios[srcIndex].cover + "\")"

  playMusic();
}

// to update current and duration time of the song
function audioTimeUpdater(event) {
  // duration calculation and display
  let durationMinute = Math.floor(audioElem.duration / 60);
  let durationSecond = Math.floor(audioElem.duration % 60);
  if (durationSecond < 10) {
    durationSecond = "0" + durationSecond;
  }
  if (durationSecond) {
    durationElem.innerHTML = durationMinute + ":" + durationSecond;
  }
  // currentTime calculation and display
  let currentMinute = Math.floor(audioElem.currentTime / 60);
  let currentSecond = Math.floor(audioElem.currentTime % 60);
  if (currentSecond < 10) {
    currentSecond = "0" + currentSecond;
  }
  currentTimeElem.innerHTML = currentMinute + ":" + currentSecond;
  // set progress bar advanced and display
  let progressPercent = (audioElem.currentTime / audioElem.duration) * 100;
  progressElem.style.width = progressPercent + "%";
  if (audioElem.currentTime === audioElem.duration) {
    nextMusic();
  }
}

function setProgressBar(event) {

  const width = this.clientWidth;
  const clickX = event.offsetX;
  progressElem.style.width = width + "px";
  audioElem.currentTime = (clickX / width) * audioElem.duration;
}

function changeCoverImgAnimation() {
  coverImg.classList.add("active");
  setTimeout(function () {
    coverImg.classList.remove("active");
  }, 100);
}


// EventListeners
backwardBtn.addEventListener("click", previousMusic);
playOrPauseBtn.addEventListener("click", playOrPause);
forwardBtn.addEventListener("click", nextMusic);
audioElem.addEventListener("timeupdate", audioTimeUpdater);
progressBarElem.addEventListener("click", setProgressBar);