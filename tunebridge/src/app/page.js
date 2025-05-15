"use client";

import React, { useEffect, useState } from "react";



export default function Home() {
  const [data, setData] = useState(null);

  const [user_id, setUserId] = useState(null);

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.hash.substring(1));
      setUserId(params.get("user_id1"));
      console.log("User ID:", user_id);
    }
  }, []);
  

  const handleConnectClick = () => {
    window.location.href = "http://localhost:4000/login";
    }

  const handleGetPlaylist = () => {
    fetch("http://localhost:4000/getPlaylists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      // body: JSON.stringify({
      //   user_id: user_id
    })
  };
  return (
    <div className="bg-white shadow-md border border-gray-300 rounded-lg p-4 max-w-md mx-auto my-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleConnectClick}
      >
        Connect to Spotify
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleGetPlaylist}
      >
        Get User Playlists
      </button>
      <p className="text-gray-800 text-sm mt-4">
        {data ? JSON.stringify(data, null, 2) : "No data yet."}
      </p>
    </div>
  );
}
