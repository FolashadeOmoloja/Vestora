import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

const NTBGrowthChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1m");
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  // Sample data for the line chart - 6 dates from July 15th with 5-day intervals and realistic market fluctuations
  const data = [
    { date: "July 15", value: 5000000, timestamp: "July 15, 4:30PM" },
    { date: "July 20", value: 5040000, timestamp: "July 20, 2:00PM" },
    { date: "July 25", value: 5120000, timestamp: "July 25, 11:15AM" },
    { date: "July 30", value: 5085000, timestamp: "July 30, 3:45PM" },
    { date: "Aug 4", value: 5180000, timestamp: "Aug 4, 1:30PM" },
    { date: "Aug 9", value: 5250000, timestamp: "Aug 9, 4:30PM" },
  ];

  const periods = [
    { label: "1w", value: "1w" },
    { label: "1m", value: "1m", active: true },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#002C6C] text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          <div className="font-medium">{data.timestamp}</div>
          <div className="font-bold">₦{data.value.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (hoveredPoint && payload.date === hoveredPoint.date) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="#FFD100"
          stroke="#003057"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-sm text-gray-500 mb-1">Total Invested Value</h3>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#002C6C]">
              ₦5,250,000
            </span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+5.00%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart type toggles */}
          <div className="flex bg-[#F2F2F2] rounded-lg p-1">
            <button className="p-2 rounded-md bg-white shadow-sm">
              <TrendingUp className="w-4 h-4 text-[#002C6C]" />
            </button>
            <button className="p-2 rounded-md">
              <BarChart3 className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Time period buttons */}
          <div className="flex bg-[#F2F2F2] rounded-lg p-1 ml-4">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedPeriod === period.value
                    ? "bg-white text-[#003057] shadow-sm"
                    : "text-gray-500 hover:text-[#002C6C]"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            onMouseMove={(e: any) => {
              if (e && e.activePayload && e.activePayload[0]) {
                setHoveredPoint(e.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Grid lines */}
            <defs>
              <pattern
                id="grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#F2F2F2"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </pattern>
            </defs>

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#999999" }}
              tickMargin={20}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#999999" }}
              tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
              domain={["dataMin - 100000", "dataMax + 100000"]}
              tickMargin={5}
            />
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#002C6C" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#4A90E2" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#E6F3FF" stopOpacity={0.1} />
            </linearGradient>
            {/* Horizontal reference lines */}
            <ReferenceLine y={5000000} stroke="#d1d5dc" strokeDasharray="2 2" />
            <ReferenceLine y={5100000} stroke="#d1d5dc" strokeDasharray="2 2" />
            <ReferenceLine y={5200000} stroke="#d1d5dc" strokeDasharray="2 2" />
            <ReferenceLine y={5300000} stroke="#d1d5dc" strokeDasharray="2 2" />
            <ReferenceLine y={5400000} stroke="#d1d5dc" strokeDasharray="2 2" />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#002C6C",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#002C6C"
              strokeWidth={2}
              dot={false}
              activeDot={<CustomDot />}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hover point info */}
      {hoveredPoint && (
        <div className="mt-4 p-3 bg-[#F2F2F2] rounded-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#002C6C]">
              {hoveredPoint.timestamp}
            </span>
            <span className="font-bold text-[#003057]">
              ₦{hoveredPoint.value.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NTBGrowthChart;
