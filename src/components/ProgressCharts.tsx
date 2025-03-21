import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data - this would typically come from your API
const performanceData = [
  { name: "Week 1", score: 65 },
  { name: "Week 2", score: 70 },
  { name: "Week 3", score: 72 },
  { name: "Week 4", score: 78 },
  { name: "Week 5", score: 82 },
  { name: "Week 6", score: 85 },
];

const skillsData = [
  { name: "Communication", value: 80 },
  { name: "Technical", value: 75 },
  { name: "Problem Solving", value: 85 },
  { name: "Behavioral", value: 70 },
];

const interviewsData = [
  { name: "Jan", completed: 2 },
  { name: "Feb", completed: 4 },
  { name: "Mar", completed: 3 },
  { name: "Apr", completed: 5 },
  { name: "May", completed: 6 },
  { name: "Jun", completed: 4 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ProgressCharts: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Performance Over Time
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0d9488"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Skills Assessment
          </h3>
          <div className="bg-white p-4 rounded-lg shadow-sm h-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {skillsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Interviews Completed
          </h3>
          <div className="bg-white p-4 rounded-lg shadow-sm h-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={interviewsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;
