import React from "react";
import TVShow from "./TVShow"
import { Grid, Visibility } from "semantic-ui-react";

function TVShowList({ shows, selectShow }) {
  function mapAllShows() {
    return shows.map((s) => (
      <TVShow show={s} key={s.id} selectShow={selectShow} />
    ));
  }

  return (
    <div className="TVShowList">
      <Grid>{mapAllShows()}</Grid>
    </div>
  );
}

export default TVShowList;
