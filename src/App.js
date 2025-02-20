import logo from "./logo.svg";
import "./App.css";
import { AppProvider } from "./context/Context";
import Main from "./component/Main";
import Video from "./component/Video";
import Geolocation from "./component/Location";

function App() {
  return (
    <div>
      <AppProvider>
        <Geolocation />
        <Main />
      </AppProvider>
    </div>
  );
}

export default App;
