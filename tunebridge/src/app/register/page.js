import React from "react";

export default function Register() {
  return (
    <div className="flex justify-center p-8">
      <div className="flex flex-col box-border border-4 bg-transparent p-8 w-full max-w-md gap-4 text-white">
        <label htmlFor="FirstName">First Name:</label>
        <input
          type="text"
          id="FirstName"
          placeholder="First Name"
          required
          className="box-border border-2 p-4 w-full"
        />

        <label htmlFor="LastName">Last Name:</label>
        <input
          type="text"
          id="LastName"
          placeholder="Last Name"
          required
          className="box-border border-2 p-4 w-full"
        />

        <label htmlFor="Email">Email:</label>
        <input
          type="email"
          id="Email"
          placeholder="example@domain.com"
          required
          className="box-border border-2 p-4 w-full"
        />

        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          id="Password"
          placeholder="Password123"
          required
          className="box-border border-2 p-4 w-full"
        />

        <label htmlFor="Re-Password">Re-Password:</label>
        <input
          type="password"
          id="Re-Password"
          placeholder="Password123"
          required
          className="box-border border-2 p-4 w-full"
        />

        <label htmlFor="PhoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="PhoneNumber"
          placeholder="123-456-7890"
          required
          className="box-border border-2 p-4 w-full"
        />
      </div>
    </div>
  );
}
