import React from "react";
import { Input } from "semantic-ui-react";

function Search(props) {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        onChange={props.handleSearch}
        value={props.searchTerm}
      />
    </div>
  );
}

export default Search;
