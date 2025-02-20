import { useEffect, useContext } from "react";
import { newContext } from "../context/Context";
import axios from "axios";

function Geolocation() {
  const { setSehir } = useContext(newContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          axios(
            `https://api.opencagedata.com/geocode/v1/json?q=+${lat},${lon}&key=ecab892b1a7544c28421b0e05edf7c9a&language=tr&pretty=1`
          )
            .then((data) => {
              const cityName = data.results[0].components.province;
              setSehir(cityName);
              localStorage.setItem("sehir", cityName);
            })
            .catch((error) => console.error("Geolocation API error:", error));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Konum izni verilmedi ya da alınamadı.");
        }
      );
    } else {
      alert("Geolocation desteklenmiyor.");
    }
  }, [setSehir]);

  return null;
}

export default Geolocation;
