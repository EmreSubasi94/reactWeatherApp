import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";

export const newContext = createContext();

export const AppProvider = ({ children }) => {
  const localsehir = localStorage.getItem("sehir") || "Antalya";
  const [sehir, setSehir] = useState(localsehir);
  const [firstLi, setFirstLi] = useState(null);
  const apikey = "9b07b04aa31a965cdc7d569d321bcb05";
  const [data, setData] = useState();
  const [selected, setSelected] = useState(null);
  const [descript, setDescript] = useState(null);
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  const ul = document.getElementsByClassName("days");
  const [gunlukData, setGunlukData] = useState([]);
  const sehirler = [
    "Adana",
    "Adıyaman",
    "Afyon",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum ",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya ",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon  ",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt ",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük ",
    "Kilis",
    "Osmaniye ",
    "Düzce",
  ];

  const haftaninGunleri = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
    if (video === "Snow") {
      Array.from(ul).map((el) => {
        el.style.color = "black";
      });
    } else {
      Array.from(ul).map((el) => {
        el.style.color = "white";
      });
    }
  }, [video, sehir]);

  useEffect(() => {
    axios(
      `https://api.openweathermap.org/data/2.5/forecast?q=${sehir}&cnt=40&appid=${apikey}`
    ).then((res) => {
      setData(res.data);
    });
  }, [sehir, apikey]);
  const videoSource = (video) => {
    switch (video) {
      case "Rain":
        return "../video/Rainy.mp4";
      case "Clear":
        return "../video/sunny.mp4";
      case "Snow":
        return "../video/snowy.mp4";
      case "Clouds":
        switch (descript) {
          case "broken clouds":
            return "../video/darkclouds.mp4";
          case "overcast clouds":
            return "../video/darkclouds.mp4";
          case "scattered clouds":
            return "../video/scatteredclouds.mp4";
          case "few clouds":
            return "../video/scatteredclouds.mp4";
        }
      default:
        return "../video/sunny.mp4";
    }
  };
  useEffect(() => {
    if (gunlukData.length > 0) {
      setSelected(document.getElementById("li0"));
      setDescript(gunlukData[0].description);
      setVideo(gunlukData[0].main);
    }
  }, [gunlukData]);
  useEffect(() => {
    if (selected) {
      if (video === "Snow" || video === "Clear") {
        selected.style.border = "3px solid black";
        selected.style.borderRadius = "15px";
      } else {
        selected.style.border = "3px solid white";
        selected.style.borderRadius = "15px";
      }
    }
  }, [selected, sehir]);
  const handleDayClick = (e) => {
    if (e.target.classList.contains("icons")) {
      const targetElement = e.target.parentElement;
      setDescript(targetElement.children[1].title);
      setVideo(targetElement.children[1].alt);
      if (selected) {
        selected.style.border = "";
        selected.style.borderRadius = "";
      }
      if (selected === targetElement) {
        if (video === "Snow" || video === "Clear") {
          selected.style.border = "3px solid black";
          selected.style.borderRadius = "15px";
        } else {
          selected.style.border = "3px solid white";
          selected.style.borderRadius = "15px";
        }
      }
      setSelected(targetElement);
    }
  };
  const handleSehirChange = (e) => {
    setSehir(e.target.value);
    localStorage.setItem("sehir", e.target.value);
    window.location.reload();
  };

  useEffect(() => {
    if (data) {
      const gunlukSicaklik = [];
      const havaDurumlari = data.list;
      for (let i = 0; i < havaDurumlari.length; i += 8) {
        const gun = havaDurumlari.slice(i, i + 8);
        const maxTemp = Math.max(...gun.map((forecast) => forecast.main.temp));
        const minTemp = Math.min(...gun.map((forecast) => forecast.main.temp));
        const tarih = gun[0].dt_txt.split(" ")[0];
        const haftaGunleri = new Date(tarih).getDay() || 7;
        const gunİsmi = haftaninGunleri[haftaGunleri - 1];
        const weatherDescription = gun[0].weather[0].description;
        const weatherIcon = gun[0].weather[0].icon;
        const weatherMain = gun[0].weather[0].main;

        gunlukSicaklik.push({
          dayName: gunİsmi,
          maxTemp: maxTemp - 273.15,
          minTemp: minTemp - 273.15,
          description: weatherDescription,
          icon: weatherIcon,
          main: weatherMain,
        });
      }
      setGunlukData(gunlukSicaklik);
    }
  }, [data]);

  return (
    <newContext.Provider
      value={{
        sehir,
        setSehir,
        gunlukData,
        selected,
        setSelected,
        descript,
        setDescript,
        video,
        setVideo,
        sehirler,
        videoRef,
        videoSource,
        handleSehirChange,
        handleDayClick,
      }}
    >
      {children}
    </newContext.Provider>
  );
};

export default AppProvider;
