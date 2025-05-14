"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  const handleConnectClick = () => {
    window.location.href = "http://localhost:4000/login";
    const token_response =response.json();
    console.log(token_response);
    }

  const handleGetPlaylist = () => {
    fetch("http://localhost:4000/getUserID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "token_response.user_id"
    })
  });

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
