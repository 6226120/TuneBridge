'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-4 border-t border-gray-800 text-center text-sm text-white space-y-2">
      <div className="flex justify-center gap-6">
        <Link href="/about">About</Link>
        <Link href="/how-it-works">How it Works</Link>
        <Link href="/support">Contact Support</Link>
      </div>
      <div>&copy; 2025 TuneBridge. All rights reserved.</div>
    </footer>
  );
}
