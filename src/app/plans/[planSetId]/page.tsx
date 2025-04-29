// This is now a Server Component (no 'use client')

import React from 'react';
import Link from 'next/link';
// Import the new Client Component
import PlanSetClientPage from '../../../components/PlanSetClientPage';
// Import data fetching and types
import { getPlanSetById, TravelPlanSet, allTravelPlanSets } from '../../../data/travelData';

// generateStaticParams remains here (Server Component)
export async function generateStaticParams() {
  return allTravelPlanSets.map((planSet) => ({
    planSetId: planSet.id,
  }));
}

// Page component receives params directly in Server Components
interface PageProps {
  params: { planSetId: string };
}

export default function PlanSetPage({ params }: PageProps) {
  const planSetId = params.planSetId;
  const planSet: TravelPlanSet | undefined = getPlanSetById(planSetId);

  // Handle not found case in the Server Component
  if (!planSet) {
    return (
      <main className="min-h-screen p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">未找到旅行计划集合</h1>
        <p className="text-gray-600 mb-6">无法找到 ID 为 "{planSetId}" 的计划集合。</p>
        <Link href="/" legacyBehavior>
          <a className="text-blue-500 hover:underline">返回目录</a>
        </Link>
      </main>
    );
  }

  // Render the Client Component and pass the fetched data as props
  return <PlanSetClientPage planSet={planSet} />;
}