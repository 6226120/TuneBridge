'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-6 justify-center p-2">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
}
