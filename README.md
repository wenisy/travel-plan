# 旅行规划应用 (Travel Plan)

一个基于Next.js的旅行规划应用，帮助用户比较不同旅行方案的成本和行程安排。

## 项目特点

- 📊 多方案对比表格：清晰展示不同旅行方案的详细信息
- 💰 费用明细分析：分别展示交通费用和住宿费用
- 📈 可视化图表：直观比较不同方案的成本构成
- 📅 行程日历视图：显示假期和需要请假的工作日
- 📱 响应式设计：适配各种设备屏幕
- 🔄 静态生成：快速加载和良好的SEO表现

## 技术栈

- **框架**: [Next.js](https://nextjs.org/) 14.1.1
- **UI库**: [Tailwind CSS](https://tailwindcss.com/), [Material UI](https://mui.com/)
- **图表**: [Chart.js](https://www.chartjs.org/) 和 [react-chartjs-2](https://react-chartjs-2.js.org/)
- **部署**: GitHub Pages

## 安装与运行

本项目使用 [Node.js](https://nodejs.org/) 22.14.0 版本开发。推荐使用 [nvm](https://github.com/nvm-sh/nvm) 进行Node.js版本管理。

```bash
# 克隆仓库
git clone https://github.com/yourusername/travel-plan.git
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
│   │   ├── plans/           # 旅行计划详情页
│   │   └── layout.tsx       # 应用布局
│   ├── components/          # React组件
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

## 功能说明

### 旅行计划目录
首页展示所有可用的旅行计划集合，使用时间线形式直观展示。

### 旅行方案对比
详细对比不同旅行方案的行程、交通、住宿和总费用，帮助用户做出最佳选择。

### 成本分析
通过图表直观展示各方案的费用构成，包括交通费和住宿费的明细对比。

### 方案总结
自动分析并推荐最经济的方案和请假天数最少的方案，并提供详细说明。

## 贡献指南

欢迎贡献代码或提出建议！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。
