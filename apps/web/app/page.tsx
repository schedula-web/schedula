import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <Link href="/classes">
        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Go to Classes
        </button>
      </Link>
    </div>
  );
}