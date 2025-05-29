// src/app/page.js
"use client";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-white text-black max-w-2xl w-full rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">
          🎵 Welcome to TuneBridge
        </h1>

        <p className="text-lg text-center">
          TuneBridge lets you transfer your playlists effortlessly between
          Spotify and Apple Music.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>🔗 Connect your music accounts (Spotify & Apple Music)</li>
            <li>📂 Choose the playlist you want to transfer</li>
            <li>🚀 Click "Transfer" and you're done!</li>
          </ul>
        </section>

        <section className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🎬 Live Demo</h3>
          <div className="border border-gray-300 rounded-md p-4 text-center">
            <p className="text-gray-600">[Demo preview here]</p>
            <p className="text-sm text-gray-500 mt-2">
              * This would show a sample playlist transfer UI
            </p>
          </div>
        </section>

        <div className="text-center text-sm text-gray-500">
          &copy; 2025 TuneBridge. All rights reserved.
        </div>
      </div>
    </main>
  );
}
