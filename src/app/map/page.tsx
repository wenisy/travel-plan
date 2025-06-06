'use client';

import React from 'react';
import Link from 'next/link';
import ChinaMap from '../../components/ChinaMap';

export default function MapPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* 导航菜单 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors pb-1">
                旅行计划
              </Link>
              <Link href="/map" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                中国制霸地图
              </Link>
            </nav>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center my-10 text-gray-800">中国制霸生成器</h1>
        <p className="text-center text-gray-600 mb-8">标记你去过的省份，生成专属的旅行足迹地图</p>
        
        <ChinaMap />
      </div>
    </main>
  );
}
