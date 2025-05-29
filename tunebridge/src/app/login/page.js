import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div class="flex flex-col items-center">
      <div class="flex flex-auto flex-col box-border size-72 border-6 p-4 bg-transparent">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          required
          className="box-border border-2 p-4"
        ></input>

        <label htmlFor="passowrd" class="p-4">
          Password:
        </label>
        <input
          type="text"
          id="password"
          placeholder="Password"
          required
          className="box-border border-2 p-4"
        ></input>
      </div>
      <div class="mt-4 text-sm text-white-600 text-center">
        Need to create an account?
        <Link href="/register" class=" text-[#0073b1] hover:underline ml-1">
          Sign up
        </Link>
      </div>
    </div>
  );
}
