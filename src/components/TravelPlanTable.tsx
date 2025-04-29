import React from 'react';
import { TravelPlan, calculateTotalCost, calculateWorkDaysOff } from '../data/travelData';

// 计算各项费用的辅助函数
const calculateFlightCost = (plan: TravelPlan): number => {
  return plan.flights.totalPrice * 3; // 3人
};

const calculateHotelCost = (plan: TravelPlan): number => {
  return plan.hotels.reduce((total, hotel) => {
    return total + (hotel.pricePerNight * hotel.nights);
  }, 0);
};

const calculateTrainCost = (plan: TravelPlan): number => {
  return plan.train ? (plan.train.adultPrice * 2 + plan.train.childPrice) : 0; // 2大人1小孩
};

interface TravelPlanTableProps {
  plans: TravelPlan[];
}

const TravelPlanTable: React.FC<TravelPlanTableProps> = ({ plans }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">方案</th>
            <th className="py-2 px-4 border-b">去程</th>
            <th className="py-2 px-4 border-b">返程</th>
            <th className="py-2 px-4 border-b">火车</th>
            <th className="py-2 px-4 border-b">酒店</th>
            <th className="py-2 px-4 border-b">总天数</th>
            <th className="py-2 px-4 border-b">需请假天数</th>
            <th className="py-2 px-4 border-b">总费用 (3人)</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="py-2 px-4 border-b">{plan.name}</td>
              <td className="py-2 px-4 border-b">
                {plan.flights.outbound.date} {plan.flights.outbound.departure} → {plan.flights.outbound.arrival}
                <br />
                ({plan.flights.outbound.departureTime}-{plan.flights.outbound.arrivalTime})
              </td>
              <td className="py-2 px-4 border-b">
                {plan.flights.return.date} {plan.flights.return.departure} → {plan.flights.return.arrival}
                <br />
                ({plan.flights.return.departureTime}-{plan.flights.return.arrivalTime})
                <br />
                <span className="font-bold">往返总价: ¥{plan.flights.totalPrice}</span>
              </td>
              <td className="py-2 px-4 border-b">
                {plan.train ? (
                  <>
                    {plan.train.from} → {plan.train.to}
                    <br />
                    成人: ¥{plan.train.adultPrice}/人
                    <br />
                    儿童: ¥{plan.train.childPrice}/人
                  </>
                ) : '无'}
              </td>
              <td className="py-2 px-4 border-b">
                {plan.hotels.map((hotel, index) => (
                  <div key={index} className="mb-2">
                    {hotel.location} ({hotel.nights}晚)
                    <br />
                    ¥{hotel.pricePerNight}/晚 {hotel.includesBreakfast ? '(含早)' : ''}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border-b">{plan.totalDays}天{plan.totalDays-1}晚</td>
              <td className="py-2 px-4 border-b workday-off">{calculateWorkDaysOff(plan)}天</td>
              <td className="py-2 px-4 border-b highlight">
                <div>总费用: ¥{calculateTotalCost(plan)}</div>
                <div className="text-sm mt-1">
                  <div>交通费: ¥{calculateFlightCost(plan) + calculateTrainCost(plan)}</div>
                  <div>住宿费: ¥{calculateHotelCost(plan)}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TravelPlanTable;
