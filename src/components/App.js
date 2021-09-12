import React, { useEffect, useState } from "react";
import { Grid, Visibility } from "semantic-ui-react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [filterByRating, setFilterByRating] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    Adapter.getShows(0).then((shows) => setShows(shows));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function handleFilter(e) {
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {
    setSelectedShow(show);
  }

  function loadNextPage() {
    Adapter.getShows(page + 1).then((newShows) => setShows([...shows, ...newShows]));
    setPage(op => op + 1);
  }

  let displayShows = shows;
  if (filterByRating) {
    displayShows = displayShows.filter((s) => {
      return s.rating.average >= parseInt(filterByRating, 10);
    });
  }
  if (searchTerm) {
    displayShows = displayShows.filter((s) => {
      return s.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
          />

          <Visibility onOnScreen={loadNextPage} />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
