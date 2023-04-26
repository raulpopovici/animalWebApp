import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { FoodState, FoodStateType } from "../../Pages/Food/FoodReducer";

const SearchBar = ({
  text,
  dispatchFoodReducerData,
}: {
  text: string;
  dispatchFoodReducerData: React.Dispatch<FoodStateType>;
}) => {
  const [textSearched, setTextSearched] = useState(text);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchFoodReducerData({
      type: FoodState.searchBar,
      payload: textSearched,
    });
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={(e) => submit(e)}>
        <SearchIcon />
        <input
          type="Text"
          placeholder="Search..."
          className={styles.searchBar}
          value={textSearched}
          onChange={(event) => setTextSearched(event.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
