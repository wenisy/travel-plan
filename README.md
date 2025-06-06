# 旅行规划助手 🧳

一个现代化的旅行规划和足迹记录应用，帮助用户规划旅行路线、对比费用，并记录旅行足迹。

## ✨ 功能特色

### 🗺️ 旅行计划管理
- 📊 **多方案对比表格**：清晰展示不同旅行方案的详细信息
- 💰 **费用明细分析**：分别展示交通费用和住宿费用
- 📈 **可视化图表**：直观比较不同方案的成本构成
- 📅 **行程日历视图**：显示假期和需要请假的工作日
- 🧮 **智能计算**：自动计算总费用和请假天数

### 🇨🇳 中国制霸地图
- 🗺️ **省份标记**：标记您去过的所有省份和地区
- 🏷️ **访问等级**：支持居住、短居、游玩、出差、路过等不同等级
- 💾 **数据持久化**：自动保存到本地浏览器，数据不丢失
- 📊 **统计分析**：实时显示各等级省份统计数据
- 🎨 **可视化展示**：简化地图设计，一目了然

### 🎯 通用特性
- 📱 **响应式设计**：适配各种设备屏幕
- 🔄 **静态生成**：快速加载和良好的SEO表现
- 🎨 **现代UI**：基于Tailwind CSS的美观界面

## 技术栈

- **框架**: [Next.js](https://nextjs.org/) 14.1.1
- **UI库**: [Tailwind CSS](https://tailwindcss.com/), [Material UI](https://mui.com/)
- **图表**: [Chart.js](https://www.chartjs.org/) 和 [react-chartjs-2](https://react-chartjs-2.js.org/)
- **部署**: GitHub Pages

## 安装与运行

本项目使用 [Node.js](https://nodejs.org/) 22.14.0 版本开发。推荐使用 [nvm](https://github.com/nvm-sh/nvm) 进行Node.js版本管理。

```bash
# 克隆仓库
git clone git@github.com:wenisy/travel-plan.git
cd travel-plan

# 使用nvm选择正确的Node.js版本
nvm use

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 项目结构

```
travel-plan/
├── src/
│   ├── app/                 # Next.js 应用页面
│   │   ├── page.tsx         # 首页（旅行计划目录）
│   │   ├── map/             # 中国制霸地图页面
│   │   │   └── page.tsx     # 地图页面
│   │   ├── plans/           # 旅行计划详情页
│   │   └── layout.tsx       # 应用布局
│   ├── components/          # React组件
│   │   ├── ChinaMap.tsx     # 中国制霸地图组件
│   │   ├── CostChart.tsx    # 费用对比图表
│   │   ├── TravelPlanTable.tsx  # 旅行方案对比表格
│   │   ├── TravelSummary.tsx    # 旅行方案总结
│   │   └── TravelCalendar.tsx   # 行程日历
│   └── data/                # 数据模型和服务
│       └── travelData.ts    # 旅行数据和计算函数
├── public/                  # 静态资源
├── .github/                 # GitHub配置
│   └── workflows/           # GitHub Actions工作流
│       └── deploy.yml       # 部署到GitHub Pages的工作流
└── package.json             # 项目依赖和脚本
```

## 🎯 功能说明

### 🗺️ 旅行计划功能

#### 旅行计划目录
首页展示所有可用的旅行计划集合，使用时间线形式直观展示，支持快速导航。

#### 旅行方案对比
详细对比不同旅行方案的行程、交通、住宿和总费用，帮助用户做出最佳选择。

#### 成本分析
通过图表直观展示各方案的费用构成，包括交通费和住宿费的明细对比。

#### 方案总结
自动分析并推荐最经济的方案和请假天数最少的方案，并提供详细说明。

### 🇨🇳 中国制霸地图功能

#### 省份标记系统
- 点击地图上的省份进行选择
- 支持34个省级行政区域的标记
- 简化地图设计，保持地缘相接特征

#### 访问等级分类
- **居住**：住过年以上
- **短居**：住过月以上
- **游玩**：旅行过
- **出差**：去过但完全没玩
- **路过**：汽车火车路过或飞机经停

#### 数据管理
- 自动保存到本地浏览器存储
- 支持一键清除所有标记
- 实时统计各等级省份数量

#### 使用方法
1. 点击地图上的省份进行选择
2. 选择省份后，点击对应的访问等级按钮
3. 查看底部统计数据了解旅行足迹
4. 使用"清除所有"按钮重置数据

## 贡献指南

欢迎贡献代码或提出建议！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。
