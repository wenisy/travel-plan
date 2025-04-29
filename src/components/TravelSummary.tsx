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

interface TravelSummaryProps {
  plans: TravelPlan[];
}

const TravelSummary: React.FC<TravelSummaryProps> = ({ plans }) => {
  // 找出最便宜的方案
  const cheapestPlan = plans.reduce((prev, current) =>
    calculateTotalCost(prev) < calculateTotalCost(current) ? prev : current
  );

  // 找出请假天数最少的方案
  const leastTimeOffPlan = plans.reduce((prev, current) =>
    calculateWorkDaysOff(prev) < calculateWorkDaysOff(current) ? prev : current
  );

  return (
    <div className="my-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">旅行方案总结</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded bg-blue-50">
          <h3 className="text-xl font-bold mb-2">最经济方案</h3>
          <p className="font-medium">{cheapestPlan.name}</p>
          <p className="mt-2">总费用: <span className="text-lg font-bold">¥{calculateTotalCost(cheapestPlan)}</span></p>
          <div className="text-sm mt-1">
            <div>交通费: ¥{calculateFlightCost(cheapestPlan) + calculateTrainCost(cheapestPlan)}</div>
            <div>住宿费: ¥{calculateHotelCost(cheapestPlan)}</div>
          </div>
          <p className="mt-2">总天数: {cheapestPlan.totalDays}天{cheapestPlan.totalDays-1}晚</p>
          <p className="mt-1">需请假: {calculateWorkDaysOff(cheapestPlan)}天</p>
          <div className="mt-3">
            <p>行程:</p>
            <ul className="list-disc list-inside mt-1">
              <li>去程: {cheapestPlan.flights.outbound.date} {cheapestPlan.flights.outbound.departure} → {cheapestPlan.flights.outbound.arrival}</li>
              <li>返程: {cheapestPlan.flights.return.date} {cheapestPlan.flights.return.departure} → {cheapestPlan.flights.return.arrival}</li>
              <li>往返机票: ¥{cheapestPlan.flights.totalPrice}</li>
              {cheapestPlan.train && (
                <li>火车: {cheapestPlan.train.from} → {cheapestPlan.train.to} (¥{cheapestPlan.train.adultPrice * 2 + cheapestPlan.train.childPrice})</li>
              )}
              <li>住宿:
                <ul className="ml-4">
                  {cheapestPlan.hotels.map((hotel, index) => (
                    <li key={index}>
                      {hotel.location} {hotel.nights}晚 (¥{hotel.pricePerNight * hotel.nights})
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="border p-4 rounded bg-green-50">
          <h3 className="text-xl font-bold mb-2">请假最少方案</h3>
          <p className="font-medium">{leastTimeOffPlan.name}</p>
          <p className="mt-2">总费用: <span className="text-lg font-bold">¥{calculateTotalCost(leastTimeOffPlan)}</span></p>
          <div className="text-sm mt-1">
            <div>交通费: ¥{calculateFlightCost(leastTimeOffPlan) + calculateTrainCost(leastTimeOffPlan)}</div>
            <div>住宿费: ¥{calculateHotelCost(leastTimeOffPlan)}</div>
          </div>
          <p className="mt-2">总天数: {leastTimeOffPlan.totalDays}天{leastTimeOffPlan.totalDays-1}晚</p>
          <p className="mt-1">需请假: {calculateWorkDaysOff(leastTimeOffPlan)}天</p>
          <div className="mt-3">
            <p>行程:</p>
            <ul className="list-disc list-inside mt-1">
              <li>去程: {leastTimeOffPlan.flights.outbound.date} {leastTimeOffPlan.flights.outbound.departure} → {leastTimeOffPlan.flights.outbound.arrival}</li>
              <li>返程: {leastTimeOffPlan.flights.return.date} {leastTimeOffPlan.flights.return.departure} → {leastTimeOffPlan.flights.return.arrival}</li>
              <li>往返机票: ¥{leastTimeOffPlan.flights.totalPrice}</li>
              {leastTimeOffPlan.train && (
                <li>火车: {leastTimeOffPlan.train.from} → {leastTimeOffPlan.train.to} (¥{leastTimeOffPlan.train.adultPrice * 2 + leastTimeOffPlan.train.childPrice})</li>
              )}
              <li>住宿:
                <ul className="ml-4">
                  {leastTimeOffPlan.hotels.map((hotel, index) => (
                    <li key={index}>
                      {hotel.location} {hotel.nights}晚 (¥{hotel.pricePerNight * hotel.nights})
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded bg-yellow-50">
        <h3 className="text-xl font-bold mb-2">家庭出行提示</h3>
        <ul className="list-disc list-inside">
          <li>所有费用计算基于2大人1小孩的家庭</li>
          <li>机票价格为往返总价，小孩与成人同价</li>
          <li>火车票小孩半价</li>
          <li>酒店价格为每晚价格，一个房间可住一家人</li>
          <li>5.31-6.2为假期，其他工作日需请假</li>
        </ul>
      </div>
    </div>
  );
};

export default TravelSummary;
