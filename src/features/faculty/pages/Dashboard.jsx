import React from 'react';
import { User, Bell, ClipboardList, Calendar, Clock, CheckCircle, ArrowUpRight, GraduationCap, LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6 text-[#334155] font-sans">

      {/* --- HEADER SECTION --- */}
      <div className="mb-8 flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-[#486482] p-3 rounded-xl shadow-lg shadow-[#486482]/20">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1e293b] tracking-tight">Teacher Dashboard</h1>
            <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#486482]" /> Global Academy • Session 2025-26
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-[#1e293b]">Prof. Anita Sharma</p>
            <p className="text-xs text-[#486482] font-semibold">Senior Mathematics Faculty</p>
          </div>
          <div className="relative p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 cursor-pointer transition">
            <Bell className="w-5 h-5 text-[#486482]" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#486482] to-[#334155] flex items-center justify-center text-white font-bold shadow-lg shadow-[#486482]/30">
            AS
          </div>
        </div>
      </div>

      {/* --- TOP STATS: Page Width Coverage --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* ATTENDANCE CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#BFD8D2] transition-all">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Attendance</h3>
            <p className="text-3xl font-black text-[#486482]">92%</p>
            <p className="text-xs font-semibold text-gray-500 italic">180 / 196 Total Days</p>
          </div>
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="35" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
              <circle cx="40" cy="40" r="35" stroke="#486482" strokeWidth="8" fill="transparent" strokeDasharray="220" strokeDashoffset="18" strokeLinecap="round" className="transition-all duration-1000 group-hover:stroke-[#BFD8D2]" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#486482]" />
            </div>
          </div>
        </div>

        {/* SALARY CARD */}
        <div className="bg-[#BFD8D2] rounded-3xl p-6 shadow-lg shadow-[#BFD8D2]/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-[#486482] uppercase opacity-70">Recent Salary</h3>
              <ArrowUpRight className="w-5 h-5 text-[#486482]" />
            </div>
            <h2 className="text-4xl font-black text-[#486482] mb-1">₹75,400</h2>
            <div className="inline-block bg-white/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#486482]">
              Status: Paid (18 Sept)
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#486482]/5 rounded-full"></div>
        </div>

        {/* EVENTS/NOTIFICATIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Event Updates</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition cursor-default border-l-4 border-blue-400">
              <span className="text-lg">📢</span>
              <p className="text-xs font-bold text-[#1e293b]">Annual Day Meeting <span className="block text-[10px] text-gray-400">Today, 3:00 PM</span></p>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition cursor-default border-l-4 border-[#BFD8D2]">
              <span className="text-lg">📅</span>
              <p className="text-xs font-bold text-[#1e293b]">Grade Submission <span className="block text-[10px] text-gray-400">Deadline: Oct 25</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MIDDLE ROW: Main Body --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* TIMETABLE: Spacious Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-[#1e293b] flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#486482]" /> Class Timetable
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-bold transition">Yesterday</button>
              <button className="px-4 py-2 bg-[#486482] text-white rounded-xl text-xs font-bold transition shadow-md">Today</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 uppercase text-[11px] font-bold tracking-widest">
                  <th className="pb-4 pl-2">Timing</th>
                  <th className="pb-4">Class / Section</th>
                  <th className="pb-4">Subject</th>
                  <th className="pb-4">Room No.</th>
                </tr>
              </thead>
              <tbody className="text-[#334155]">
                {[
                  { t: "09:00 AM - 09:45 AM", c: "Class 8A", s: "Mathematics", r: "Block A - 302", active: true },
                  { t: "10:30 AM - 11:15 AM", c: "Class 8B", s: "Physics", r: "Block A - 305", active: false },
                  { t: "12:00 PM - 12:45 PM", c: "Class 9A", s: "Applied Math", r: "Lab - 02", active: false },
                  { t: "01:30 PM - 02:15 PM", c: "Class 10C", s: "Mathematics", r: "Block B - 104", active: false },
                ].map((row, i) => (
                  <tr key={i} className={`group border-b border-gray-50 last:border-0 hover:bg-[#F8FAFB] transition-all ${row.active ? 'bg-blue-50/30' : ''}`}>
                    <td className="py-5 pl-2 font-bold flex items-center gap-3">
                      <Clock className={`w-4 h-4 ${row.active ? 'text-[#486482]' : 'text-gray-300'}`} /> {row.t}
                    </td>
                    <td className="py-5 font-semibold text-gray-700">{row.c}</td>
                    <td className="py-5">
                      <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${row.active ? 'bg-[#486482] text-white' : 'bg-gray-100 text-[#486482]'}`}>
                        {row.s}
                      </span>
                    </td>
                    <td className="py-5 text-gray-500 font-medium">{row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ACTIONS & ASSIGNMENTS: Right Panel */}
        <div className="flex flex-col gap-6">
          
          {/* QUICK ACTIONS */}
          <div className="bg-[#486482] rounded-3xl p-6 text-white shadow-xl shadow-[#486482]/20">
            <h3 className="text-sm font-bold opacity-70 mb-4 uppercase tracking-tighter">Fast Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-white text-[#486482] hover:bg-[#BFD8D2] transition-all p-4 rounded-2xl font-black text-sm shadow-md group">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" /> Mark Student Attendance
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
              </button>
              <button className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-all p-4 rounded-2xl font-bold text-sm border border-white/20">
                <div className="flex items-center gap-3 text-white">
                  <ClipboardList className="w-5 h-5" /> Upload Assignments
                </div>
              </button>
            </div>
          </div>

          {/* ASSIGNMENTS PROGRESS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-[#486482] uppercase">Submissions</h3>
              <span className="text-[10px] font-bold bg-[#BFD8D2]/30 text-[#486482] px-2 py-1 rounded-md">Live Tracking</span>
            </div>
            <div className="space-y-6">
              {[
                { label: "Math Homework - 8A", val: 92, count: "42/45", color: "bg-[#486482]" },
                { label: "Physics Project - 9B", val: 75, count: "38/40", color: "bg-[#BFD8D2]" },
                { label: "Weekly Quiz - 10C", val: 40, count: "18/45", color: "bg-red-300" },
              ].map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="flex justify-between text-xs font-black mb-2 text-[#1e293b]">
                    <span>{item.label}</span>
                    <span className="text-[#486482]">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                    <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;