import { useEffect, useRef, useState } from "react";
export function useMovies(query, callBack) {
  const KEY = "74bebcda";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callBack?.();
      // the use of the AbortController function to cancelled the unnecceasry requests while typing the query
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true); //setting the loader message before fetching the data
          setError(""); //before fetching the data always reset the error
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("SOMETHING WRONG WITH FETCHING MOVIES ");
          const data = await res.json();
          if (data.Response === "False") throw new Error("MOVIE NOT FOUND");
          setMovies(data.Search);
          setError("");
          // console.log(data.Search);
          // setIsLoading(false); //set the loader to false after the movie data is fetched set the loading text to false
          // console.log(movies); this represent stale data as it will give output as an empty array, it will not immediately render the movies state instead the upper function of SetMovies needs tobe executed first
          // console.log(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
        if (query.length < 3) {
          setMovies([]);
          setError("");
        }
      }
      //   handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
