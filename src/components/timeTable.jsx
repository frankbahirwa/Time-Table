import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit3, FiCheck, FiX, FiSun, FiMoon } from 'react-icons/fi';

// Predefined list of courses with IDs and names
const availableCourses = [
    { id: 'math_theory', name: 'Mathematics (Theory)' },
    { id: 'physics_theory', name: 'Physics (Theory)' },
    { id: 'python_theory', name: 'Python (Theory)' },
    { id: 'network_fund', name: 'Network Fundamentals' },
    { id: 'proj_analysis', name: 'Project Requirement Analysis' },
    { id: 'js_theory', name: 'JavaScript (Theory)' },
    { id: 'vue_theory', name: 'Vue.js (Theory)' },
    { id: 'react_theory', name: 'React (Theory)' },
    { id: 'version_control', name: 'Version Control' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'nosql', name: 'NoSQL' },
    { id: 'qa_devops', name: 'QA & DevOps' },
    { id: 'windows_server', name: 'Windows Server' },
    { id: 'graphics', name: 'Graphics Design' },
];

// Default timetable
const defaultTimetable = [
    { day: 'Monday', slots: ['math_theory', 'math_theory', 'physics_theory', '-', '-', '-'] },
    { day: 'Tuesday', slots: ['python_theory', 'python_theory', 'network_fund', '-', '-', '-'] },
    { day: 'Wednesday', slots: ['physics_theory', 'physics_theory', 'proj_analysis', '-', '-', '-'] },
    { day: 'Thursday', slots: ['js_theory', 'js_theory', 'vue_theory', '-', '-', '-'] },
    { day: 'Friday', slots: ['react_theory', 'react_theory', 'version_control', '-', '-', '-'] },
    { day: 'Saturday', slots: ['ml', 'ml', 'blockchain', 'blockchain', 'nosql', 'qa_devops'] },
    { day: 'Sunday', slots: ['math_theory', 'math_theory', 'ml', 'blockchain', 'windows_server', 'graphics'] },
];

// Logos mapped to course names
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
};

export default function Timetable() {
    // Load timetable from localStorage or use default
    const [timetable, setTimetable] = useState(() => {
        const saved = localStorage.getItem('timetable');
        return saved ? JSON.parse(saved) : defaultTimetable;
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempSlots, setTempSlots] = useState([]);
    const [darkMode, setDarkMode] = useState(() =>
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    // Save timetable to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('timetable', JSON.stringify(timetable));
    }, [timetable]);

    // Apply dark mode class to document
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
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

    const handleInputChange = (slotIndex, value) => {
        const updatedSlots = [...tempSlots];
        updatedSlots[slotIndex] = value;
        setTempSlots(updatedSlots);
    };

    const renderCourseWithLogo = (courseId) => {
        if (courseId === '-') return <span className="italic text-gray-400">-</span>;
        const course = availableCourses.find((c) => c.id === courseId);
        if (!course) return <span className="italic text-gray-400">Unknown</span>;
        const logoSrc = logos[course.name];
        return (
            <div className="flex items-center gap-2">
                {logoSrc && <img src={logoSrc} alt={`${course.name} logo`} className="w-5 h-5 object-contain" />}
                <span>{course.name}</span>
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
                    <table className="min-w-full border-collapse border border-purple-300 dark:border-purple-700">
                        <thead className="bg-purple-600 dark:bg-purple-800 text-white">
                            <tr>
                                <th className="p-3 text-left">Day</th>
                                {Array.from({ length: 6 }, (_, i) => (
                                    <th key={i} className="p-3 text-left">{`${i + 1}${getHourSuffix(i + 1)} Hour`}</th>
                                ))}
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            {timetable.map((row, index) => (
                                <motion.tr
                                    key={row.day}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-purple-50 dark:hover:bg-purple-700"
                                >
                                    <td className="p-3 font-semibold text-purple-600 dark:text-purple-300">{row.day}</td>
                                    {editingIndex === index ? (
                                        tempSlots.map((slot, i) => (
                                            <td key={i} className="p-1">
                                                <select
                                                    value={slot}
                                                    onChange={(e) => handleInputChange(i, e.target.value)}
                                                    className="w-full border border-purple-400 dark:border-purple-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-gray-200"
                                                >
                                                    <option value="-">-</option>
                                                    {availableCourses.map((course) => (
                                                        <option key={course.id} value={course.id}>
                                                            {course.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        ))
                                    ) : (
                                        row.slots.map((slot, i) => (
                                            <td key={i} className="p-3">
                                                {renderCourseWithLogo(slot)}
                                            </td>
                                        ))
                                    )}
                                    <td className="p-3">
                                        {editingIndex === index ? (
                                            <div className="flex gap-2">
                                                <button onClick={saveEditing} className="text-green-600 hover:text-green-900" title="Save">
                                                    <FiCheck size={20} />
                                                </button>
                                                <button onClick={cancelEditing} className="text-red-600 hover:text-red-900" title="Cancel">
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