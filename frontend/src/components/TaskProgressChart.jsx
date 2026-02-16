import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './TaskProgressChart.css';

const COLORS = ['#2196f3', '#ff9800', '#4caf50'];

const TaskProgressChart = ({ tasks }) => {

  const todoCount = tasks.filter(t => t.column === 'todo').length;
  const inProgressCount = tasks.filter(t => t.column === 'inprogress').length;
  const doneCount = tasks.filter(t => t.column === 'done').length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? ((doneCount / totalTasks) * 100).toFixed(1) : 0;

  const barData = [
    { name: 'To Do', count: todoCount },
    { name: 'In Progress', count: inProgressCount },
    { name: 'Done', count: doneCount }
  ];

  const pieData = [
    { name: 'To Do', value: todoCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Done', value: doneCount }
  ];

  return (
    <div className="progress-chart-container">
      <div className="chart-header">
        <h2>📊 Task Progress</h2>
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Total Tasks:</span>
            <span className="stat-value">{totalTasks}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completion:</span>
            <span className="stat-value">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-wrapper">
          <h3>Tasks by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h3>Task Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskProgressChart;
