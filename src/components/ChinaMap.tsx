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

// 基于原版china-ex项目SVG的精确省份坐标数据（缩放比例0.3）
const provinces: Province[] = [
  // 第一行：新疆、内蒙古、黑龙江
  { id: 'xinjiang', name: '新疆', x: 10, y: 26, width: 95, height: 114 }, // M35,466V87h316v379H35z -> x:35->10, y:87->26, w:316->95, h:379->114
  { id: 'inner_mongolia', name: '内蒙古', x: 150, y: 10, width: 119, height: 47 }, // 复杂路径，大致范围
  { id: 'heilongjiang', name: '黑龙江', x: 268, y: 10, width: 62, height: 47 }, // M1100,33v158H894V33H1100z -> x:894->268, y:33->10, w:206->62, h:158->47

  // 第二行：甘肃、青海、宁夏、山西、吉林、辽宁
  { id: 'gansu', name: '甘肃', x: 105, y: 57, width: 70, height: 111 }, // M585,191v371H351V191H585z -> x:351->105, y:191->57, w:234->70, h:371->111
  { id: 'qinghai', name: '青海', x: 68, y: 119, width: 64, height: 69 }, // M442,626V395H228v231H442z -> x:228->68, y:395->119, w:214->64, h:231->69
  { id: 'ningxia', name: '宁夏', x: 150, y: 125, width: 26, height: 29 }, // M585,418h-86v96h86V418z -> x:499->150, y:418->125, w:86->26, h:96->29
  { id: 'shanxi', name: '山西', x: 196, y: 125, width: 22, height: 32 }, // M654,418v108h72V418H654z -> x:654->196, y:418->125, w:72->22, h:108->32
  { id: 'jilin', name: '吉林', x: 268, y: 57, width: 62, height: 26 }, // M894,191v85h206v-85H894z -> x:894->268, y:191->57, w:206->62, h:85->26
  { id: 'liaoning', name: '辽宁', x: 258, y: 83, width: 46, height: 36 }, // M861,276v119h154V276H861z -> x:861->258, y:276->83, w:154->46, h:119->36

  // 第三行：西藏、四川、陕西、河北、北京、天津、山东
  { id: 'tibet', name: '西藏', x: 10, y: 140, width: 106, height: 91 }, // M389,770H35V466h354V770z -> x:35->10, y:466->140, w:354->106, h:304->91
  { id: 'sichuan', name: '四川', x: 117, y: 196, width: 53, height: 53 }, // 复杂路径，大致计算
  { id: 'shaanxi', name: '陕西', x: 176, y: 125, width: 21, height: 71 }, // M585,653h69V418h-69V653z -> x:585->176, y:418->125, w:69->21, h:235->71
  { id: 'hebei', name: '河北', x: 218, y: 93, width: 35, height: 54 }, // M861,310H726v180h117v-95h18V310z -> x:726->218, y:310->93, w:135->35, h:180->54
  { id: 'beijing', name: '北京', x: 229, y: 101, width: 24, height: 16 }, // M763 336h80v52H763Z -> x:763->229, y:336->101, w:80->24, h:52->16
  { id: 'tianjin', name: '天津', x: 229, y: 116, width: 24, height: 13 }, // M763,388h80v43h-80V388z -> x:763->229, y:388->116, w:80->24, h:43->13
  { id: 'shandong', name: '山东', x: 234, y: 134, width: 42, height: 28 }, // M779,446v92h139v-92H779z -> x:779->234, y:446->134, w:139->42, h:92->28

  // 第四行：重庆、河南、湖北、安徽、江苏、上海
  { id: 'chongqing', name: '重庆', x: 170, y: 196, width: 27, height: 17 }, // M565 653h89v56H565Z -> x:565->170, y:653->196, w:89->27, h:56->17
  { id: 'henan', name: '河南', x: 196, y: 147, width: 38, height: 35 }, // M779,490H654v117h125V490z -> x:654->196, y:490->147, w:125->38, h:117->35
  { id: 'hubei', name: '湖北', x: 196, y: 182, width: 38, height: 24 }, // M779,688v-81H654v81H779z -> x:654->196, y:607->182, w:125->38, h:81->24
  { id: 'anhui', name: '安徽', x: 234, y: 161, width: 22, height: 41 }, // M852,538h-73v138h73V538z -> x:779->234, y:538->161, w:73->22, h:138->41
  { id: 'jiangsu', name: '江苏', x: 256, y: 161, width: 19, height: 26 }, // M899,538v87h-62v-87H899z -> x:837->256, y:538->161, w:62->19, h:87->26
  { id: 'shanghai', name: '上海', x: 265, y: 181, width: 22, height: 14 }, // M882 602h72v47H882Z -> x:882->265, y:602->181, w:72->22, h:47->14

  // 第五行：云南、贵州、湖南、江西、浙江、福建
  { id: 'yunnan', name: '云南', x: 117, y: 221, width: 44, height: 35 }, // M537,737H389v115h148V737z -> x:389->117, y:737->221, w:148->44, h:115->35
  { id: 'guizhou', name: '贵州', x: 161, y: 213, width: 35, height: 24 }, // M654,709H537v79h117V709z -> x:537->161, y:709->213, w:117->35, h:79->24
  { id: 'hunan', name: '湖南', x: 196, y: 206, width: 29, height: 30 }, // M654,688h95v100h-95V688z -> x:654->196, y:688->206, w:95->29, h:100->30
  { id: 'jiangxi', name: '江西', x: 225, y: 203, width: 31, height: 39 }, // M852,806V676H749v130H852z -> x:749->225, y:676->203, w:103->31, h:130->39
  { id: 'zhejiang', name: '浙江', x: 256, y: 188, width: 22, height: 32 }, // M852,625l74,1v107h-74V625z -> x:852->256, y:625->188, w:74->22, h:107->32
  { id: 'fujian', name: '福建', x: 247, y: 220, width: 22, height: 32 }, // M823,733v107h73V733H823z -> x:823->247, y:733->220, w:73->22, h:107->32

  // 第六行：广西、广东、台湾
  { id: 'guangxi', name: '广西', x: 161, y: 236, width: 43, height: 24 }, // M679,788H537v81h142V788z -> x:537->161, y:788->236, w:142->43, h:81->24
  { id: 'guangdong', name: '广东', x: 204, y: 236, width: 43, height: 24 }, // M823,788H679v81h144V788z -> x:679->204, y:788->236, w:144->43, h:81->24
  { id: 'taiwan', name: '台湾', x: 275, y: 236, width: 14, height: 26 }, // M918 788h45v87H918Z -> x:918->275, y:788->236, w:45->14, h:87->26

  // 最下层：海南、港澳
  { id: 'hainan', name: '海南', x: 185, y: 269, width: 23, height: 14 }, // M615 897h78v46H615Z -> x:615->185, y:897->269, w:78->23, h:46->14
  { id: 'hongkong', name: '港', x: 227, y: 257, width: 13, height: 10 }, // M758 856h42v33H758Z -> x:758->227, y:856->257, w:42->13, h:33->10
  { id: 'macau', name: '澳', x: 210, y: 257, width: 14, height: 10 } // M701 856h45v33H701Z -> x:701->210, y:856->257, w:45->14, h:33->10
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

    canvas.width = 340;
    canvas.height = 300;

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
        <svg id="china-map-svg" width="340" height="300" className="border border-gray-200 rounded bg-pink-100">
          {/* 标题 */}
          <text x="170" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1f2937">
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
          <text x="15" y="290" fontSize="11" fontWeight="bold" fill="#1f2937">
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
