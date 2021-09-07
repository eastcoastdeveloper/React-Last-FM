import "./styles/app.scss";
import Search from "./Search";
import Footer from "./Footer";
import { useCallback, useState } from "react";
import Artistlist from "./Artistlist";
import Artistdetail from "./Artistdetail";

function App() {

  let [inputResult, myFunc] = useState(null),
      [artistDetail, artistListFn] = useState(null),
      [artist, artistDetailFn] = useState(null);

  // Callback Used in Search 
  const callback = useCallback((inputResult) => {
    myFunc(inputResult);
    artistDetail = null;
    artistListFn(artistDetail)
  }, []);

  // Callback Used in Artist List 
  const artistListCallback = useCallback((artistDetail) => {
    artistListFn(artistDetail);
    console.log(artistDetail)
  }, []);

    // Callback Used in Artist Detail 
    const artistCallback = useCallback((artistDetail) => {
      artistDetail = null;
      artistListFn(artistDetail);
      console.log(artist)
    }, []);

  return (
    <>
      <main className={ inputResult != null ? "has-data" : "" } >
        <h3>Musical Artist Search</h3>
        <Search parentCallback={callback} />
      </main>
      <Artistlist inputResult={inputResult} parentCallback={artistListCallback} />
      <Artistdetail artistDetail={artistDetail} artistCallback={artistCallback} />
      <Footer />
    </>
  );
}

export default App;