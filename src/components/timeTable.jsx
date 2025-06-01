import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit3, FiCheck, FiX, FiSun, FiMoon } from 'react-icons/fi';

// Import logos (you can replace these URLs with local assets or your preferred icon libs)
const logos = {
    'Mathematics (Theory)': 'https://img.icons8.com/color/24/000000/math.png',
    'Physics (Theory)': 'https://img.icons8.com/color/24/000000/physics.png',
    'Python (Theory)': 'https://img.icons8.com/color/24/000000/python.png',
    'Network Fundamentals': 'https://img.icons8.com/ios-filled/24/000000/network.png',
    'Project Requirement Analysis': 'https://img.icons8.com/ios-filled/24/000000/analysis.png',
    'JavaScript (Theory)': 'https://img.icons8.com/color/24/000000/javascript.png',
    'Vue.js (Theory)': 'https://img.icons8.com/color/24/000000/vue-js.png',
    'React (Theory)': 'https://img.icons8.com/color/24/000000/react-native.png',
    'Version Control': 'https://img.icons8.com/ios-filled/24/000000/git.png',
    'Machine Learning': 'https://img.icons8.com/color/24/000000/artificial-intelligence.png',
    'Blockchain': 'https://img.icons8.com/color/24/000000/blockchain.png',
    'NoSQL': 'https://img.icons8.com/ios-filled/24/000000/database.png',
    'QA & DevOps': 'https://img.icons8.com/ios-filled/24/000000/qa.png',
    'Windows Server': 'https://img.icons8.com/ios-filled/24/000000/windows-10.png',
    'Graphics Design': 'https://img.icons8.com/color/24/000000/design.png',
    '-': null,
};

const initialTimetable = [
    { day: 'Monday', slots: ['Mathematics (Theory)', 'Mathematics (Theory)', 'Physics (Theory)', '-', '-', '-'] },
    { day: 'Tuesday', slots: ['Python (Theory)', 'Python (Theory)', 'Network Fundamentals', '-', '-', '-'] },
    { day: 'Wednesday', slots: ['Physics (Theory)', 'Physics (Theory)', 'Project Requirement Analysis', '-', '-', '-'] },
    { day: 'Thursday', slots: ['JavaScript (Theory)', 'JavaScript (Theory)', 'Vue.js (Theory)', '-', '-', '-'] },
    { day: 'Friday', slots: ['React (Theory)', 'React (Theory)', 'Version Control', '-', '-', '-'] },
    { day: 'Saturday', slots: ['Machine Learning', 'Machine Learning', 'Blockchain', 'Blockchain', 'NoSQL', 'QA & DevOps'] },
    { day: 'Sunday', slots: ['Mathematics', 'Mathematics', 'Machine Learning', 'Blockchain', 'Windows Server', 'Graphics Design'] },
];

export default function Timetable() {
    const [timetable, setTimetable] = useState(initialTimetable);
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempSlots, setTempSlots] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const startEditing = (index) => {
        setEditingIndex(index);
        setTempSlots([...timetable[index].slots]);
    };

    const cancelEditing = () => {
        setEditingIndex(null);
        setTempSlots([]);
    };

    const saveEditing = () => {
        setTimetable((prev) =>
            prev.map((row, i) => (i === editingIndex ? { ...row, slots: tempSlots } : row))
        );
        setEditingIndex(null);
        setTempSlots([]);
    };

    const handleInputChange = (i, value) => {
        const updatedSlots = [...tempSlots];
        updatedSlots[i] = value || '-';
        setTempSlots(updatedSlots);
    };

    // Helper to render course with logo
    const renderCourseWithLogo = (course) => {
        if (!course || course === '-') return <span className="italic text-gray-400">-</span>;
        const logoSrc = logos[course];
        return (
            <div className="flex items-center gap-2">
                {logoSrc && <img src={logoSrc} alt={`${course} logo`} className="w-5 h-5 object-contain" />}
                <span>{course}</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 p-6 transition-colors duration-500 flex flex-col">
            <div className="max-w-7xl mx-auto flex-grow">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-yellow-300 focus:outline-none shadow-md hover:shadow-lg transition"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                    </button>
                </div>

                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center text-purple-700 dark:text-purple-300 mb-8"
                >
                    📚 Weekly Study Timetable
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="overflow-x-auto rounded-lg shadow-lg"
                >
                    <table className="min-w-full border-collapse border border-purple-300 dark:border-purple-700 transition-colors duration-500">
                        <thead className="bg-purple-600 dark:bg-purple-800 text-white">
                            <tr>
                                <th className="p-3 text-left">Day</th>
                                {Array.from({ length: 6 }, (_, i) => (
                                    <th key={i} className="p-3 text-left">{`${i + 1}${getHourSuffix(i + 1)} Hour`}</th>
                                ))}
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500">
                            {timetable.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-purple-50 dark:hover:bg-purple-700"
                                >
                                    <td className="p-3 font-semibold text-purple-600 dark:text-purple-300">{row.day}</td>

                                    {editingIndex === index
                                        ? tempSlots.map((slot, i) => (
                                            <td key={i} className="p-1">
                                                <input
                                                    type="text"
                                                    value={slot === '-' ? '' : slot}
                                                    onChange={(e) => handleInputChange(i, e.target.value)}
                                                    className="w-full border border-purple-400 dark:border-purple-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-gray-200"
                                                    placeholder="Course name or -"
                                                />
                                            </td>
                                        ))
                                        : row.slots.map((slot, i) => (
                                            <td key={i} className={`p-3 ${slot === '-' ? 'text-gray-400 italic' : ''}`}>
                                                {renderCourseWithLogo(slot)}
                                            </td>
                                        ))}

                                    <td className="p-3">
                                        {editingIndex === index ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={saveEditing}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Save"
                                                >
                                                    <FiCheck size={20} />
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Cancel"
                                                >
                                                    <FiX size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => startEditing(index)}
                                                className="text-purple-600 hover:text-purple-900"
                                                title="Edit Courses"
                                            >
                                                <FiEdit3 size={20} />
                                            </button>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-purple-600 dark:bg-purple-800 text-white">
                                <td colSpan={8} className="text-center p-3 font-semibold">
                                    Chopped By Bahirwa Frank.Dev
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </motion.div>
            </div>
        </div>
    );
}

function getHourSuffix(n) {
    if (n === 1) return 'st';
    if (n === 2) return 'nd';
    if (n === 3) return 'rd';
    return 'th';
}
