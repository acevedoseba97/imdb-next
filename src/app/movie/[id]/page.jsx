import Image from "next/image";
import React from "react";

export default async function MoviePage({ params }) {
  const movieId = params.id;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    const movie = await res.json();
    console.log(movie);

    return (
      <div className="w-full">
        <div className="p-4 md:pt-8 flex flex-col lg:flex-row content-center max-w-6xl mx-auto md:space-x-6">
          <Image
            src={`https://image.tmdb.org/t/p/original/${
              movie.backdrop_path || movie.poster_path
            }`}
            width={500}
            height={300}
            alt="Not available"
            className="rounded-lg"
            priority
            style={{
              width: "auto",
              maxWidth: "100%",
              height: "100%",
            }}
          ></Image>
          <div className="p-2">
            <h2 className="text-lg mb-3 font-bold text-amber-500">
              {movie.title || movie.name}
            </h2>
            <div className="flex flex-wrap gap-4 text-lg mb-3">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="font-bold p-2 rounded-lg bg-amber-600 "
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-lg mb-3">{movie.overview}</p>
            <p className="mb-3">
              <span className="font-semibold mr-1  text-amber-500">
                Date release:
              </span>
              {movie.release_date || movie.first_air_date}
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1 text-amber-500">Votes:</span>
              {movie.vote_count}
            </p>
            <p className="mb-3">
              <span className="font-semibold mr-1 text-amber-500">Score:</span>
              {Number(movie.vote_average).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <p className="text-center">{error.message}</p>;
  }
}
