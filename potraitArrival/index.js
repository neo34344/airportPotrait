let flightDetailsContainer = document.querySelector(".flight-details-container")
let airline = document.querySelector(".airline")
let flight = document.querySelector(".flight")
let destination = document.querySelector(".destination")
let flighttime = document.querySelector(".flight-time")
let sta = document.querySelector(".sta")
let Status = document.querySelectorAll(".status")
let i=0
function api() {
  fetch("http://142.93.218.126:3000").then((res) => {
    return res.json();
  }).then((dt) => {
  dt.forEach((flightData)=>{

    if(flightData.type == "A"){
        airline.innerHTML += `<div class="text st-1">${(flightData.airline).substring(0, (flightData.airline).length-1)}</div>`
        flight.innerHTML += `<div class="text st-2">${flightData.flight}</div>`
        destination.innerHTML +=`<div class="text st-3 descolor">${(flightData.from).substring(0, (flightData.from).length-1)}
        </div>`
        flighttime.innerHTML += `
        <div class="text st-4">${flightData.time}</div>
        `
        sta.innerHTML += `
        <div class="st-5 text">${flightData.status}</div>
        `
        fontColor()}
  })
  })
  .catch((err) => {
    console.log("eror");
  })
}
api()

function fontColor(){
  let Status = document.querySelectorAll(".st-5")
  let descolor = document.querySelectorAll(".descolor") 
  if(Status[i].innerHTML.split(" ")[0] == "Delayed"){
      Status[i].style.color = "red"
    }
    if(Status[i].innerHTML.split(" ")[0] == "Scheduled"){
      Status[i].style.color = "#2CB199"
    }
    if(Status[i].innerHTML.split(" ")[0] == "Estimated"){
      Status[i].style.color = "#002806"
    }
    descolor[i].innerHTML = descolor[i].innerHTML.replace(descolor[i].innerHTML.split(" ")[1], `<span style="color: #2CB199;">${descolor[i].innerHTML.split(" ")[1]}</span>`)
  i++;
}


const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

let time = document.querySelector(".time")
let Dt = document.querySelector(".dt")
let Day = document.querySelector(".day")
let Month = document.querySelector(".month")
function getTime(){
    let date = new Date();
    let persentDate = date.getDate();

    let getHrs = date.getHours();
    let getMin = date.getMinutes();

    let hrs = getHrs > 9 ? getHrs : "0" + getHrs;
    let mins = getMin > 9 ? getMin : "0" + getMin;
    time.innerHTML = hrs + ":" + mins;

    Dt.innerHTML = persentDate;
    Day.innerHTML = days[date.getDay()]
    Month.innerHTML = months[date.getMonth()]

}
setInterval(() => {
    getTime()
}, 1000);

//wather API
let temp = document.querySelector(".temp")
let weatherType = document.querySelector(".weathertype")

function weather(){
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position.coords.latitude ,position.coords.longitude);
        const WeatherApi = `https://api.weatherapi.com/v1/current.json?key=a0fe37e9617148a8ad170045222712&q=${position.coords.latitude},${position.coords.longitude}`
        fetch(WeatherApi).then((res)=>{
            return res.json();
        }).then((data)=>{
          temp.innerHTML = data.current.temp_c + "&#176;c"
          weatherType.innerHTML = data.current.condition.text
        }).catch(()=>{
            console.log("some error");
        })
        
    });
}
weather()