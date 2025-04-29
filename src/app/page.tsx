'use client';

import React from 'react';
import Link from 'next/link'; // 导入 Link 组件用于导航
import { allTravelPlanSets } from '../data/travelData'; // 导入新的数据结构

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center my-10 text-gray-800">旅行计划目录</h1>

        <div className="space-y-6">
          {allTravelPlanSets.length > 0 ? (
            allTravelPlanSets.map(planSet => (
              <div key={planSet.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">{planSet.name}</h2>
                {planSet.description && (
                  <p className="text-gray-600 mb-4">{planSet.description}</p>
                )}
                <Link href={`/plans/${planSet.id}`} legacyBehavior>
                  <a className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                    查看详情
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">暂无旅行计划集合。</p>
          )}
        </div>
      </div>
    </main>
  );
}
