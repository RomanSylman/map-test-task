import Page from "./components/MapComponent/MapComponent";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

const App = () => {
  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <Page />
      </APIProvider>
    </>
  );
};

export default App;
