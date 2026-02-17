import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { CalendarDays, UserCheck, Users, MessageCircle } from "lucide-react";

const stats = [
  { id: 1, label: "Upcoming", value: 4, icon: CalendarDays, color: "bg-rose-100 text-rose-600" },
  { id: 2, label: "Patients", value: 128, icon: Users, color: "bg-amber-100 text-amber-600" },
  { id: 3, label: "Checked-in", value: 9, icon: UserCheck, color: "bg-teal-100 text-teal-600" },
  { id: 4, label: "Messages", value: 2, icon: MessageCircle, color: "bg-sky-100 text-sky-600" },
];

const recentAppointments = [
  { id: 1, patient: "John Doe", time: "2026-02-18 09:30", status: "Confirmed" },
  { id: 2, patient: "Mary Smith", time: "2026-02-18 10:15", status: "Pending" },
  { id: 3, patient: "Ali Khan", time: "2026-02-19 11:00", status: "Completed" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header>
          <Navbar />
        </header>

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-sm text-gray-600">Here’s what’s happening with your account today.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                  <div className={`p-3 rounded-md ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                    <div className="text-2xl font-semibold">{s.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Appointments</h2>
              <div className="space-y-3">
                {recentAppointments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{a.patient}</div>
                      <div className="text-sm text-gray-500">{a.time}</div>
                    </div>
                    <div className="text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${a.status === 'Pending' ? 'bg-yellow-100 text-amber-700' : a.status==='Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <p className="text-sm text-gray-600">You have <strong>2</strong> unread messages and <strong>1</strong> pending approval.</p>
              <div className="mt-4">
                <button className="w-full py-2 bg-rose-600 text-white rounded-md">View messages</button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}