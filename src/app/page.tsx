'use client';

import React, { useState } from 'react';
import TravelPlanTable from '../components/TravelPlanTable';
import TravelCalendar from '../components/TravelCalendar';
import CostChart from '../components/CostChart';
import TravelSummary from '../components/TravelSummary';
import { travelPlans } from '../data/travelData';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(travelPlans[0]);

  const handlePlanSelect = (planId: string) => {
    const plan = travelPlans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto flex">
        {/* 左侧导航 */}
        <div className="w-1/4 bg-gray-100 p-4">
          <h2 className="text-xl font-bold mb-4">旅行规划</h2>
          <ul className="space-y-2">
            {travelPlans.map(plan => (
              <li key={plan.id}>
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full text-left p-2 rounded ${selectedPlan.id === plan.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {plan.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 右侧内容 */}
        <div className="w-3/4 p-4">
          <h1 className="text-3xl font-bold text-center my-8">{selectedPlan.name}</h1>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">行程方案对比</h2>
            <TravelPlanTable plans={[selectedPlan]} />
          </div>

          <TravelCalendar startDate={selectedPlan.flights.outbound.date} endDate={selectedPlan.flights.return.date} />

          <CostChart plans={[selectedPlan]} />

          <TravelSummary plans={[selectedPlan]} />
        </div>
      </div>
    </main>
  );
}
