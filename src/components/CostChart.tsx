import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TravelPlan, calculateTotalCost } from '../data/travelData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CostChartProps {
  plans: TravelPlan[];
}

const CostChart: React.FC<CostChartProps> = ({ plans }) => {
  // 计算每个方案的机票、酒店和火车票费用
  const calculateFlightCost = (plan: TravelPlan): number => {
    return plan.flights.totalPrice * 3;
  };

  const calculateHotelCost = (plan: TravelPlan): number => {
    return plan.hotels.reduce((total, hotel) => {
      return total + (hotel.pricePerNight * hotel.nights);
    }, 0);
  };

  const calculateTrainCost = (plan: TravelPlan): number => {
    return plan.train ? (plan.train.adultPrice * 2 + plan.train.childPrice) : 0;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '旅行方案费用对比 (3人家庭)',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: plans.map(plan => `方案${plan.id.replace('plan', '')}`),
    datasets: [
      {
        label: '机票费用',
        data: plans.map(calculateFlightCost),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '酒店费用',
        data: plans.map(calculateHotelCost),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '火车费用',
        data: plans.map(calculateTrainCost),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-3">费用对比图表</h3>
      <Bar options={options} data={data} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-bold mb-2">总费用对比</h4>
          <ul>
            {plans.map(plan => (
              <li key={plan.id} className="mb-2">
                <span className="font-medium">{plan.name}:</span> ¥{calculateTotalCost(plan)}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-bold mb-2">请假天数对比</h4>
          <ul>
            {plans.map(plan => (
              <li key={plan.id} className="mb-2">
                <span className="font-medium">{plan.name}:</span>
                {plan.id === 'plan1' ? '2天 (5.30, 6.3)' : '3天 (5.30, 6.3, 6.4)'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CostChart;
