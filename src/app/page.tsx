'use client';

import React, { useState } from 'react';
import TravelPlanTable from '../components/TravelPlanTable';
import TravelCalendar from '../components/TravelCalendar';
import CostChart from '../components/CostChart';
import TravelSummary from '../components/TravelSummary';
import { travelPlans } from '../data/travelData';

export default function Home() {
  return (
    <main className="min-h-screen p-8"> {/* 调整外层 padding */}
      <div className="max-w-7xl mx-auto"> {/* 稍微加宽内容区域 */}
        <h1 className="text-3xl font-bold text-center my-8">旅行规划对比</h1>

        <div className="mb-8">
          {/* 行程方案对比表格现在接收所有 plans */}
          <TravelPlanTable plans={travelPlans} />
        </div>

        {/* 移除日历组件 */}
        {/* <TravelCalendar startDate={selectedPlan.flights.outbound.date} endDate={selectedPlan.flights.return.date} /> */}

        {/* 成本图表现在接收所有 plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">成本对比</h2>
          <CostChart plans={travelPlans} />
        </div>

        {/* 摘要信息现在接收所有 plans */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">方案总结</h2>
          <TravelSummary plans={travelPlans} />
        </div>
      </div>
    </main>
  );
}
