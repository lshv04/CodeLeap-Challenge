import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/login"
          className="w-40 rounded-lg bg-[#7695EC] px-6 py-3 text-center text-white font-semibold hover:bg-[#5a7de8] transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="w-40 rounded-lg border border-[#7695EC] px-6 py-3 text-center text-[#7695EC] font-semibold hover:bg-[#7695EC] hover:text-white transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
