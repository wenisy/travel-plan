'use client';

import React, { useState, useEffect } from 'react';

// 省份数据类型
interface Province {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// 访问等级
export enum VisitLevel {
  NONE = 0,
  PASSED = 1,    // 路过
  BUSINESS = 2,  // 出差
  TRAVEL = 3,    // 游玩
  SHORT_STAY = 4, // 短居
  RESIDENCE = 5   // 居住
}

// 等级配置
const levelConfig = {
  [VisitLevel.NONE]: { name: '没去过', color: '#f3f4f6', textColor: '#6b7280' },
  [VisitLevel.PASSED]: { name: '路过', color: '#fef3c7', textColor: '#92400e' },
  [VisitLevel.BUSINESS]: { name: '出差', color: '#ddd6fe', textColor: '#5b21b6' },
  [VisitLevel.TRAVEL]: { name: '游玩', color: '#bbf7d0', textColor: '#065f46' },
  [VisitLevel.SHORT_STAY]: { name: '短居', color: '#bfdbfe', textColor: '#1e40af' },
  [VisitLevel.RESIDENCE]: { name: '居住', color: '#fecaca', textColor: '#991b1b' }
};

// 基于原版china-ex项目SVG的精确省份坐标数据（按比例缩放到合适尺寸）
const provinces: Province[] = [
  // 根据原版SVG路径转换的坐标，缩放比例约为0.35
  { id: 'xinjiang', name: '新疆', x: 12, y: 30, width: 110, height: 133 },
  { id: 'inner_mongolia', name: '内蒙古', x: 175, y: 12, width: 138, height: 76 },
  { id: 'heilongjiang', name: '黑龙江', x: 313, y: 12, width: 72, height: 55 },
  { id: 'jilin', name: '吉林', x: 313, y: 67, width: 72, height: 30 },
  { id: 'liaoning', name: '辽宁', x: 301, y: 97, width: 54, height: 41 },
  { id: 'beijing', name: '北京', x: 267, y: 118, width: 28, height: 18 },
  { id: 'tianjin', name: '天津', x: 267, y: 136, width: 28, height: 15 },
  { id: 'hebei', name: '河北', x: 254, y: 109, width: 41, height: 63 },
  { id: 'shandong', name: '山东', x: 273, y: 156, width: 49, height: 32 },
  { id: 'shanxi', name: '山西', x: 229, y: 146, width: 25, height: 38 },
  { id: 'henan', name: '河南', x: 229, y: 172, width: 44, height: 41 },
  { id: 'anhui', name: '安徽', x: 298, y: 188, width: 26, height: 48 },
  { id: 'jiangsu', name: '江苏', x: 315, y: 188, width: 22, height: 30 },
  { id: 'shanghai', name: '上海', x: 309, y: 211, width: 25, height: 16 },
  { id: 'zhejiang', name: '浙江', x: 298, y: 219, width: 26, height: 37 },
  { id: 'fujian', name: '福建', x: 288, y: 257, width: 26, height: 37 },
  { id: 'taiwan', name: '台湾', x: 321, y: 276, width: 16, height: 30 },
  { id: 'gansu', name: '甘肃', x: 123, y: 67, width: 82, height: 130 },
  { id: 'qinghai', name: '青海', x: 80, y: 138, width: 75, height: 81 },
  { id: 'tibet', name: '西藏', x: 12, y: 163, width: 124, height: 106 },
  { id: 'ningxia', name: '宁夏', x: 175, y: 146, width: 30, height: 34 },
  { id: 'shaanxi', name: '陕西', x: 205, y: 146, width: 24, height: 82 },
  { id: 'sichuan', name: '四川', x: 136, y: 228, width: 62, height: 29 },
  { id: 'chongqing', name: '重庆', x: 198, y: 228, width: 31, height: 20 },
  { id: 'hubei', name: '湖北', x: 229, y: 213, width: 44, height: 28 },
  { id: 'hunan', name: '湖南', x: 229, y: 241, width: 33, height: 35 },
  { id: 'jiangxi', name: '江西', x: 262, y: 237, width: 36, height: 46 },
  { id: 'yunnan', name: '云南', x: 136, y: 258, width: 52, height: 40 },
  { id: 'guizhou', name: '贵州', x: 188, y: 248, width: 41, height: 28 },
  { id: 'guangxi', name: '广西', x: 188, y: 276, width: 50, height: 28 },
  { id: 'guangdong', name: '广东', x: 238, y: 276, width: 50, height: 28 },
  { id: 'hainan', name: '海南', x: 215, y: 314, width: 27, height: 16 },
  { id: 'hongkong', name: '港', x: 265, y: 300, width: 15, height: 12 },
  { id: 'macau', name: '澳', x: 245, y: 300, width: 16, height: 12 }
];

export default function ChinaMap() {
  const [visitLevels, setVisitLevels] = useState<Record<string, VisitLevel>>({});
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // 从本地存储加载数据
  useEffect(() => {
    const saved = localStorage.getItem('china-map-visits');
    if (saved) {
      try {
        setVisitLevels(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem('china-map-visits', JSON.stringify(visitLevels));
  }, [visitLevels]);

  // 设置省份访问等级
  const setProvinceLevel = (provinceId: string, level: VisitLevel) => {
    setVisitLevels(prev => ({
      ...prev,
      [provinceId]: level
    }));
  };

  // 获取省份的颜色
  const getProvinceColor = (provinceId: string) => {
    const level = visitLevels[provinceId] || VisitLevel.NONE;
    return levelConfig[level].color;
  };

  // 获取省份的文字颜色
  const getProvinceTextColor = (provinceId: string) => {
    const level = visitLevels[provinceId] || VisitLevel.NONE;
    return levelConfig[level].textColor;
  };

  // 计算统计信息
  const getStats = () => {
    const stats = {
      [VisitLevel.RESIDENCE]: 0,
      [VisitLevel.SHORT_STAY]: 0,
      [VisitLevel.TRAVEL]: 0,
      [VisitLevel.BUSINESS]: 0,
      [VisitLevel.PASSED]: 0,
      [VisitLevel.NONE]: 0
    };

    provinces.forEach(province => {
      const level = visitLevels[province.id] || VisitLevel.NONE;
      stats[level]++;
    });

    return stats;
  };

  const stats = getStats();

  // 导出为图片
  const exportAsImage = () => {
    const svg = document.querySelector('#china-map-svg') as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 400;
    canvas.height = 350;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // 添加标题
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('我的中国制霸地图', canvas.width / 2, 30);

        // 下载图片
        const link = document.createElement('a');
        link.download = 'china-map.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* 等级选择器 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">选择访问等级：</h3>
          <div className="flex gap-2">
            <button
              onClick={exportAsImage}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
            >
              导出图片
            </button>
            <button
              onClick={() => {
                setVisitLevels({});
                setSelectedProvince(null);
              }}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              清除所有
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(levelConfig).map(([level, config]) => (
            <button
              key={level}
              className="px-3 py-2 rounded-md text-sm font-medium border transition-colors hover:opacity-80"
              style={{
                backgroundColor: config.color,
                color: config.textColor,
                borderColor: config.textColor + '40'
              }}
              onClick={() => {
                if (selectedProvince) {
                  setProvinceLevel(selectedProvince, parseInt(level) as VisitLevel);
                  setSelectedProvince(null);
                }
              }}
            >
              {config.name}
            </button>
          ))}
        </div>
        {selectedProvince && (
          <p className="text-sm text-gray-600 mt-2">
            已选择：{provinces.find(p => p.id === selectedProvince)?.name}，请选择访问等级
          </p>
        )}
      </div>

      {/* 地图 */}
      <div className="mb-6 flex justify-center">
        <svg id="china-map-svg" width="400" height="350" className="border border-gray-200 rounded bg-pink-100">
          {/* 标题 */}
          <text x="200" y="25" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1f2937">
            中国制霸
          </text>

          {/* 省份地图 */}
          {provinces.map(province => (
            <g key={province.id}>
              <rect
                x={province.x}
                y={province.y}
                width={province.width}
                height={province.height}
                fill={getProvinceColor(province.id)}
                stroke={selectedProvince === province.id ? '#3b82f6' : '#374151'}
                strokeWidth={selectedProvince === province.id ? 2 : 1}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedProvince(province.id)}
              />
              <text
                x={province.x + province.width / 2}
                y={province.y + province.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={province.width < 25 ? "9" : province.width < 40 ? "10" : "12"}
                fill={getProvinceTextColor(province.id)}
                className="pointer-events-none font-medium"
                style={{ userSelect: 'none' }}
              >
                {province.name}
              </text>
            </g>
          ))}

          {/* 分数显示 */}
          <text x="20" y="340" fontSize="12" fontWeight="bold" fill="#1f2937">
            分数: {Object.values(visitLevels).reduce((sum, level) => sum + level, 0)}
          </text>
        </svg>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(levelConfig).reverse().map(([level, config]) => (
          <div key={level} className="text-center p-3 rounded-lg border" style={{ backgroundColor: config.color + '20' }}>
            <div className="text-2xl font-bold" style={{ color: config.textColor }}>
              {stats[parseInt(level) as VisitLevel]}
            </div>
            <div className="text-sm" style={{ color: config.textColor }}>
              {config.name}
            </div>
          </div>
        ))}
      </div>

      {/* 使用说明 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">使用说明：</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 点击地图上的省份进行选择</li>
          <li>• 选择省份后，点击上方的等级按钮进行标记</li>
          <li>• 数据会自动保存到本地浏览器</li>
          <li>• 居住：住过年以上 | 短居：住过月以上 | 游玩：旅行过 | 出差：去过但完全没玩 | 路过：汽车火车路过或飞机经停</li>
        </ul>
      </div>
    </div>
  );
}
