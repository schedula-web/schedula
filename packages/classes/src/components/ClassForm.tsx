"use client";

import { useState } from "react";
import { createClass } from "../api/class.api";

export default function ClassForm() {
  const [form, setForm] = useState({
    grade: "",
    section: "",
    className: "",
    classTeacher: "",
    numberOfStudents: 0,
    subjects: "",
    workingDays: "",
    periodsPerDay: 0,
    maxPeriodsPerDay: 0,
    classroomId: "",
    classCapacity: 0,
    schoolId: "",
    status: "ACTIVE",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createClass({
        ...form,
        subjects: form.subjects.split(","),
        workingDays: form.workingDays.split(","),
        numberOfStudents: Number(form.numberOfStudents),
        periodsPerDay: Number(form.periodsPerDay),
        maxPeriodsPerDay: Number(form.maxPeriodsPerDay),
        classCapacity: Number(form.classCapacity),
      });

      alert("Class created successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error creating class ❌");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">

      <input name="grade" placeholder="Grade" onChange={handleChange} className="input" />
      <input name="section" placeholder="Section" onChange={handleChange} className="input" />

      <input name="className" placeholder="Class Name" onChange={handleChange} className="input" />
      <input name="classTeacher" placeholder="Teacher" onChange={handleChange} className="input" />

      <input name="numberOfStudents" placeholder="Students" onChange={handleChange} className="input" />
      <input name="subjects" placeholder="Subjects (comma separated)" onChange={handleChange} className="input" />

      <input name="workingDays" placeholder="Working Days" onChange={handleChange} className="input" />
      <input name="periodsPerDay" placeholder="Periods/Day" onChange={handleChange} className="input" />

      <input name="maxPeriodsPerDay" placeholder="Max Periods" onChange={handleChange} className="input" />
      <input name="classroomId" placeholder="Room ID" onChange={handleChange} className="input" />

      <input name="classCapacity" placeholder="Capacity" onChange={handleChange} className="input" />
      <input name="schoolId" placeholder="School ID" onChange={handleChange} className="input" />

      <button
        onClick={handleSubmit}
        className="col-span-2 bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Class
      </button>
    </div>
  );
}