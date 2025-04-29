import React from 'react';
import { holidayDates } from '../data/travelData';

interface CalendarProps {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

const TravelCalendar: React.FC<CalendarProps> = ({ startDate, endDate }) => {
  // 生成日期范围
  const generateDateRange = (start: string, end: string) => {
    const dates = [];
    const currentDate = new Date(start);
    const lastDate = new Date(end);
    
    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const dateRange = generateDateRange(startDate, endDate);
  
  // 检查日期是否为假期
  const isHoliday = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return holidayDates.includes(dateString);
  };
  
  // 检查日期是否为周末
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  
  // 获取日期的类名
  const getDateClassName = (date: Date) => {
    if (isHoliday(date) || isWeekend(date)) {
      return 'vacation-day';
    }
    return 'workday-off';
  };

  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-3">行程日历</h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        <div className="font-bold">周日</div>
        <div className="font-bold">周一</div>
        <div className="font-bold">周二</div>
        <div className="font-bold">周三</div>
        <div className="font-bold">周四</div>
        <div className="font-bold">周五</div>
        <div className="font-bold">周六</div>
        
        {/* 填充日历开始前的空白 */}
        {Array.from({ length: dateRange[0].getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}
        
        {/* 日历日期 */}
        {dateRange.map((date, index) => (
          <div 
            key={index} 
            className={`p-2 border rounded ${getDateClassName(date)}`}
          >
            <div className="font-bold">{date.getDate()}</div>
            <div className="text-xs">
              {date.toLocaleString('zh-CN', { month: 'numeric' })}月
            </div>
            <div className="text-xs mt-1">
              {isHoliday(date) ? '假期' : isWeekend(date) ? '周末' : '工作日'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 vacation-day mr-2"></div>
          <span>假期/周末</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 workday-off mr-2"></div>
          <span>需请假的工作日</span>
        </div>
      </div>
    </div>
  );
};

export default TravelCalendar;
