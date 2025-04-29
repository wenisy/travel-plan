'use client';

import React from 'react';
import TravelPlanTable from '../components/TravelPlanTable';
import TravelCalendar from '../components/TravelCalendar';
import CostChart from '../components/CostChart';
import TravelSummary from '../components/TravelSummary';
import { travelPlans } from '../data/travelData';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">西安-北海-桂林旅游规划</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">行程方案对比</h2>
          <TravelPlanTable plans={travelPlans} />
        </div>

        <TravelCalendar startDate="2024-05-28" endDate="2024-06-04" />

        <CostChart plans={travelPlans} />

        <TravelSummary plans={travelPlans} />
      </div>
    </main>
  );
}
