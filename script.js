let currentsong=new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
      return "00:00";
    }
  
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    // Ensure single-digit seconds are formatted with a leading zero
    return `${formattedMinutes}:${formattedSeconds}`;
  }
async function getsongs(){
    let a=await fetch("http://127.0.0.1:3000/songs/")
    let response =await a.text();
    console.log(response);
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
     songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML=" "
   for (const song of songs) {  
      songUL.innerHTML=songUL.innerHTML+`<li><img src="music.svg" alt=""> <div class="info">
      <div>${song.replaceAll("%20"," ")}</div>
      <div>Yash</div>
  </div>
  <div class="playnow">
      <span>play now</span>
      <img src="play.svg" alt="">
  </div></li>`;
   }
   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
        playmusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
  })
  return songs
}
function playmusic(track,pause=false){
  console.log(track)
  currentsong.src=track;
  if(!pause){
  currentsong.play()
  play.src="pause.svg";
}
  document.querySelector(".songinfo").innerHTML=decodeURI(track);
  document.querySelector(".songtime").innerHTML="00:00/00:00"
}

async function main(){
    await getsongs("/songs/")
    playmusic(songs[0],true)
  play.addEventListener("click",()=>{
    if(currentsong.paused){
      console.log(currentsong)
        currentsong.play()
        play.src="pause.svg";
    }
    else {
        currentsong.pause();
        play.src="play.svg";
    }
  })
  
  currentsong.addEventListener("timeupdate", () => {
    console.log("Current Time:", currentsong.currentTime);
    console.log("Duration:", currentsong.duration);

    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
    document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
});

  document.querySelector(".seekbar").addEventListener("click",e=>{
       let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
       document.querySelector(".circle").style.left=percent+"%";
       currentsong.currentTime=((currentsong.duration)*percent)/100;
  })
  document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".library").style.left="0";
  })
  document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".library").style.left= "-100%"
  })
  prev.addEventListener("click",()=>{
    currentsong.pause()
    let index=songs.indexOf(currentsong.src)
    if((index-1)>=0){
        playmusic(songs[index-1])
    }
  })
  next.addEventListener("click",()=>{
    currentsong.pause()
    let index=songs.indexOf(currentsong.src)
    if(index+1<songs.length){
        playmusic(songs[index+1])
    }
  })
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
      console.log(e,e.target,e.target.value)
      currentsong.volume=parseInt(e.target.value)/100;
  })
}
main()
