import React from "react";
import "./styles/search.scss";

function Search({parentCallback}: {parentCallback: any} ){

  const searchURL = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=",
        key = "...";

  let inputValue = ""; 

  const artistList = () => {
    fetch(searchURL + inputValue + "&api_key=" + key + "&format=json")
      .then(async (response) => {
        const data = {
          result: await response.json(),
          key: key,
          message: "Some message here"
        }

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        parentCallback(data, key);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // Capture the input value, then clear the field
  const handleInput = (event: React.ChangeEvent<any>) => {
    inputValue = event.target.value;
    event.target.value = "";
  };

  const clearValue = (event: React.ChangeEvent<any>) => {
    parentCallback(null)
  }

  return (
    <div className="search">
      <input placeholder="Search for an Artist" onBlur={handleInput} onFocus={clearValue} />
      <button type="button" onClick={artistList}>
        GO!
      </button>
    </div>
  );
}

export default Search;
