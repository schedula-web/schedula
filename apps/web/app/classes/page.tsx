"use client";

import Link from "next/link";
import { useClasses, ClassCard } from "@repo/classes";

export default function ClassesPage() {
  const { classes } = useClasses();

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Classes</h1>

        <Link href="/classes/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + Add Classes
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {classes.map((cls, i) => (
          <ClassCard key={i} cls={cls} />
        ))}
      </div>

    </div>
  );
}