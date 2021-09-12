import React, { useEffect, useState } from "react";
import Adapter from "../Adapter";
import Episode from "./Episode";

function SelectedShowContainer({ selectedShow }) {
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    Adapter.getShowEpisodes(selectedShow.id).then((episodes) => {
      setEpisodes(episodes);
      setSelectedSeason(episodes[0].season)
    });
  }, [selectedShow])


  function getUniqueSeasons() {
    return unique(episodes.map((e) => e.season))
  }
  function mapSeasons() {
    if (!!episodes) {
      let seasons = getUniqueSeasons();
      return seasons.map((s) => {
        return (
          <option value={s} key={s}>
            Season {s}
          </option>
        );
      });
    }
  }

  function mapEpisodes() {
    return episodes
      .filter(e => e.season === selectedSeason)
      .map((e) => <Episode episode={e} key={e.id} />);
  }

  function handleSelectionChange(e) {
    setSelectedSeason(parseInt(e.target.value, 10));
  }

  return (
    <div style={{ position: "static" }}>
      <h2>{selectedShow.name}</h2>
      <img src={selectedShow.image.medium} alt="" />
      <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }}></p>
      <p>Premiered: {selectedShow.premiered}</p>
      <p>Status: {selectedShow.status}</p>
      <p>Average Rating: {selectedShow.rating.average}</p>
      <select style={{ display: "block" }} onChange={handleSelectionChange} value={selectedSeason}>
        {mapSeasons()}
      </select>
      {mapEpisodes()}
    </div>
  );
}

function unique(array = []) {
  const arr = [];
  for (let i = 0; i < array.length; i++) {
    if (!arr.includes(array[i])) {
      arr.push(array[i]);
    }
  }
  return arr;
};

export default SelectedShowContainer;