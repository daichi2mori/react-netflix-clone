import { useEffect, useState } from "react";
import instance from "../axios";
import { requests } from "../request";
import "./Banner.scss";

type movieProps = {
  title?: string;
  name?: string;
  orignal_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.feachNetflixOriginals);

      //apiからランダムで値を取得している
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  // descriptionの切り捨て用関数
  // str && str.length > n でstrがundefinedではないことを確認
  // str ?? '' でstrがundefinedの場合は空文字を返す
  function truncate(str: string | undefined, n: number): string {
    return str && str.length > n ? `${str.substring(0, n - 1)}...` : str ?? '';
  }
  // function truncate(str: string|undefined, n: number) {
  //   if (str !== undefined) {
  //     return str.length > n ? str.substring(0, n - 1) + "..." : str;
  //   }
  // }

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">{movie?.title || movie?.name || movie?.orignal_name}</h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  );
};
