'use client'; // Mark this as a Client Component

import React from 'react';
import Link from 'next/link';
import TravelPlanTable from './TravelPlanTable'; // Adjusted path
import CostChart from './CostChart'; // Adjusted path
import TravelSummary from './TravelSummary'; // Adjusted path
import { TravelPlanSet } from '../data/travelData'; // Adjusted path

interface PlanSetClientPageProps {
  planSet: TravelPlanSet; // Receive planSet data as a prop
}

export default function PlanSetClientPage({ planSet }: PlanSetClientPageProps) {
  // No need for useParams here, data comes from props

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
            <Link href="/" legacyBehavior>
              <a className="text-blue-500 hover:underline">&larr; 返回目录</a>
            </Link>
        </div>

        {/* 导航菜单 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="flex space-x-6">
              <Link href="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                旅行计划
              </Link>
              <Link href="/map" className="text-gray-600 hover:text-blue-600 transition-colors pb-1">
                中国制霸地图
              </Link>
            </nav>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center my-8">{planSet.name}</h1>
        {planSet.description && (
            <p className="text-center text-gray-600 mb-8">{planSet.description}</p>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">行程方案对比</h2>
          <TravelPlanTable plans={planSet.plans} />
        </div>

        {/* Optional: Add calendar back if needed */}
        {/* <TravelCalendar startDate={...} endDate={...} /> */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">成本对比</h2>
          <CostChart plans={planSet.plans} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">方案总结</h2>
          <TravelSummary plans={planSet.plans} />
        </div>
      </div>
    </main>
  );
}