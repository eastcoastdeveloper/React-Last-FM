import "./styles/artist-list.scss";

function Artistlist({inputResult, parentCallback}: {inputResult:any, parentCallback:any}) {
    
    let result = [],
        getArtistURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=",
        data;

    if(inputResult != null) {
        for(var i = 0; i < inputResult.result.results.artistmatches.artist.length; i++){
            result.unshift(inputResult.result.results.artistmatches.artist[i]);
        }
    }

    const artistHandler = (e:any) => {
        fetch(getArtistURL + e.target.innerText + "&api_key=" + inputResult.key + "&format=json")
          .then(async (response) => {
            data = await response.json();
            console.log(inputResult)
            if (!response.ok) {
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
            }

            // Send response to App.tsx
            parentCallback(data);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      };

    return (
        <>
            <div id="artist-list" className={null != inputResult ? "show-panel" : ""} >
                <p className="artist-count">
                    {inputResult != null ? result.length + ' Artists' : ""}
                </p>
                <div className="result-wrapper">
                        <div className="content">
                            {result.map((val, index) => {
                                return <div key={index} onClick={artistHandler}>{val.name}</div>
                            })}
                        </div>
                </div>
            </div>
        </>
    );
}

export default Artistlist;
