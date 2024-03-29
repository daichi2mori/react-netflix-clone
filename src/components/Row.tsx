import instance from "../axios";
import { useEffect, useState } from "react";
import "./Row.scss";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};


export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  //urlが更新されるたびに
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  }

  const handleClick = async (movie: Movie) => {
    if ( trailerUrl ) {
      setTrailerUrl("");
    } else {
      const url = await instance.get(`/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
      setTrailerUrl(url.data.results[0]?.key);
    }
  }

  return(
    <div className="Row">
    <h2>{title}</h2>
    <div className="Row-posters">
      {/* ポスターコンテンツ */}
      {movies.map((movie) => (
        <img
          key={movie.id}
          className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
          src={`${base_url}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          alt={movie.name}
          onClick={() => handleClick(movie)}
        />
      ))}
    </div>
    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
  </div>
  );
};
