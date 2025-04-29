'use client';

import React from 'react';
import Link from 'next/link'; // 导入 Link 组件用于导航
import { allTravelPlanSets } from '../data/travelData'; // 导入新的数据结构
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center my-10 text-gray-800">旅行计划目录</h1>
        
        <Timeline>
          {allTravelPlanSets.length > 0 ? (
            allTravelPlanSets.map(planSet => (
              <TimelineItem key={planSet.id}>
                <TimelineOppositeContent>
                  {planSet.plans.length > 0 ? planSet.plans[0].flights.outbound.date : 'No date'}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <h2 className="text-2xl font-semibold text-blue-600">{planSet.name}</h2>
                  {planSet.description && (
                    <p className="text-gray-600">{planSet.description}</p>
                  )}
                  <Link href={`/plans/${planSet.id}`} legacyBehavior>
                    <a className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      查看详情
                    </a>
                  </Link>
                </TimelineContent>
              </TimelineItem>
            ))
          ) : (
            <p className="text-center text-gray-500">暂无旅行计划集合。</p>
          )}
        </Timeline>
      </div>
    </main>
  );
}
