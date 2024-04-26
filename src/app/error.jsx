"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="text-center mt-10">
      <h1>Something went wrong. Please try again later.</h1>
      <button
        className="rounded-md mt-3 px-2 py-2 font-semibold bg-red-600 hover:bg-red-700"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
