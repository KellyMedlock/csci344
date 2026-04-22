import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ items }) {
    if (items.length === 0) {
        return <div>Loading Chart...</div>
    }

    const counts = {};

    for (const item of items) {
        const category = item.species.name;

        if (counts[category]) {
            counts[category] += 1;
        } else {
            counts[category] = 1;
        }
    }

    const data = Object.entries(counts).map(([name, value]) => ({
        name,
        value,
    }));
    
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2f6fed" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}