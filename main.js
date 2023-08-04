let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);

const res1 = document.querySelector(".res1");
const res2 = document.querySelector(".res2");
const res3 = document.querySelector(".res3");
const res4 = document.querySelector(".res4");
const inputContainer = document.querySelector(".search input");
const button = document.querySelector("button");

let ip = "";
let location = "";
let isp = "";
let timeZone = "";

button.addEventListener("click", (ev) => {
  let input = inputContainer.value;
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_hpHH7rE1fSPuAd8C2TVk8gFaaMepe&ipAddress=${input}`;

  fetch(url)
    .then((promise) => promise.json())
    .then((result) => {
      ip = result.ip;
      console.log(result, result.ip);
      location = `${result.location.region}, ${result.location.city} ${result.location.postalCode}`;
      timeZone = result.location.timezone;
      isp = result.isp;

      let lat = result.location.lat;
      let lng = result.location.lng;

      map.setView([lat, lng], 13);
      marker.setLatLng([lat, lng]);
      res1.textContent = ip;
      res2.textContent = location;
      res3.textContent = timeZone;
      res4.textContent = isp;

      console.log(res1, res2, res3, res4);
    })
    .catch((err) => {
      console.log("This is a error message");
      console.log(err.message);
      input = "Try again";
    });
});
