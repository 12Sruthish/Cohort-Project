/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    startTime: "",
    endTime: "",
    hall: "",
    priority: "",
  });
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("❌ Error fetching events:", err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/events", form);
      alert("✅ Event added successfully!");
      setEvents([...events, res.data.event]);
      setForm({ name: "", startTime: "", endTime: "", hall: "", priority: "" });
    } catch (err) {
      console.error("Error adding event:", err);
      alert("❌ Failed to add event");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center p-6">
      <motion.h1
        className="text-4xl font-extrabold text-indigo-600 mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🎉 Event Scheduler Dashboard
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Add Event Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add New Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Event Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                placeholder="Start Time"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
              <input
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                placeholder="End Time"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
            <input
              name="hall"
              value={form.hall}
              onChange={handleChange}
              placeholder="Hall Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <input
              name="priority"
              value={form.priority}
              onChange={handleChange}
              placeholder="Priority"
              type="number"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Add Event
            </button>
          </form>
        </motion.div>

        {/* Event List */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-y-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Upcoming Events
          </h2>
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition duration-300 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-indigo-700 text-lg">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    🕒 {event.startTime} - {event.endTime}
                  </p>
                  <p className="text-sm text-gray-600">📍 {event.hall}</p>
                  <p className="text-sm text-gray-500">
                    🔺 Priority: {event.priority}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No events scheduled yet.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
