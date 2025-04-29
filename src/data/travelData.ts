// 旅游规划数据

export interface FlightOption {
  id: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  price: number;
  hasCheckedBaggage: boolean;
}

export interface RoundTripFlightOption {
  id: string;
  outbound: {
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    date: string;
    hasCheckedBaggage: boolean;
  };
  return: {
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    date: string;
    hasCheckedBaggage: boolean;
  };
  totalPrice: number; // 往返总价
}

export interface TrainOption {
  from: string;
  to: string;
  price: number;
  adultPrice: number;
  childPrice: number;
}

export interface HotelOption {
  location: string;
  name: string;
  pricePerNight: number;
  includesBreakfast: boolean;
  nights: number;
}

export interface TravelPlan {
  id: string;
  name: string;
  flights: RoundTripFlightOption;
  train?: TrainOption;
  hotels: HotelOption[];
  totalDays: number;
}

// 新增：旅行计划集合接口
export interface TravelPlanSet {
  id: string;
  name: string;
  description?: string; // 可选描述
  plans: TravelPlan[];
  holidayDates?: string[]; // 该计划集合相关的假日
}


// --- 基础数据 ---

// 火车票数据 (保持不变)
const trainOptions: TrainOption[] = [
  {
    from: '北海',
    to: '桂林',
    price: 210,
    adultPrice: 210,
    childPrice: 105,
  },
  {
    from: '桂林',
    to: '北海',
    price: 210,
    adultPrice: 210,
    childPrice: 105,
  },
  {
    from: '北海',
    to: '珠海',
    price: 393,
    adultPrice: 393,
    childPrice: 197, // 假设半价
  },
  {
    from: '珠海',
    to: '北海',
    price: 393,
    adultPrice: 393,
    childPrice: 197, // 与北海到珠海相同
  }
];

// 往返航班数据 (保持不变)
const roundTripFlightOptions: RoundTripFlightOption[] = [
  {
    id: 'rt7', // 珠海-北海
    outbound: {
      departure: '西安',
      arrival: '珠海',
      departureTime: '08:10',
      arrivalTime: '10:30',
      date: '2024-05-28',
      hasCheckedBaggage: false
    },
    return: {
      departure: '北海',
      arrival: '西安',
      departureTime: '16:00',
      arrivalTime: '18:25',
      date: '2024-06-02',
      hasCheckedBaggage: true
    },
    totalPrice: 1606
  },
  {
    id: 'rt1', // 北海往返
    outbound: {
      departure: '西安',
      arrival: '北海',
      departureTime: '06:10',
      arrivalTime: '08:50',
      date: '2024-05-30',
      hasCheckedBaggage: false
    },
    return: {
      departure: '北海',
      arrival: '西安',
      departureTime: '16:00',
      arrivalTime: '18:25',
      date: '2024-06-03',
      hasCheckedBaggage: true
    },
    totalPrice: 1598
  },
  {
    id: 'rt2', // 北海-桂林 (晚班)
    outbound: {
      departure: '西安',
      arrival: '北海',
      departureTime: '06:10',
      arrivalTime: '08:50',
      date: '2024-05-30',
      hasCheckedBaggage: false
    },
    return: {
      departure: '桂林',
      arrival: '西安',
      departureTime: '22:15',
      arrivalTime: '00:15',
      date: '2024-06-04',
      hasCheckedBaggage: true
    },
    totalPrice: 1187
  },
  {
    id: 'rt3', // 北海-桂林 (中班)
    outbound: {
      departure: '西安',
      arrival: '北海',
      departureTime: '06:10',
      arrivalTime: '08:50',
      date: '2024-05-30',
      hasCheckedBaggage: false
    },
    return: {
      departure: '桂林',
      arrival: '西安',
      departureTime: '11:45',
      arrivalTime: '13:40',
      date: '2024-06-04',
      hasCheckedBaggage: true
    },
    totalPrice: 1519
  },
  {
    id: 'rt4', // 桂林-北海
    outbound: {
      departure: '西安',
      arrival: '桂林',
      departureTime: '07:30',
      arrivalTime: '10:00',
      date: '2024-05-30',
      hasCheckedBaggage: true
    },
    return: {
      departure: '北海',
      arrival: '西安',
      departureTime: '16:00',
      arrivalTime: '18:25',
      date: '2024-06-04',
      hasCheckedBaggage: true
    },
    totalPrice: 1842
  },
  {
    id: 'rt5', // 北海-珠海 (无托运)
    outbound: {
      departure: '西安',
      arrival: '北海',
      departureTime: '06:10',
      arrivalTime: '08:50',
      date: '2024-05-30',
      hasCheckedBaggage: false
    },
    return: {
      departure: '珠海',
      arrival: '西安',
      departureTime: '21:00',
      arrivalTime: '23:45',
      date: '2024-06-04',
      hasCheckedBaggage: false
    },
    totalPrice: 1197
  },
  {
    id: 'rt6', // 北海-珠海 (含托运)
    outbound: {
      departure: '西安',
      arrival: '北海',
      departureTime: '06:10',
      arrivalTime: '08:50',
      date: '2024-05-30',
      hasCheckedBaggage: false
    },
    return: {
      departure: '珠海',
      arrival: '西安',
      departureTime: '21:00',
      arrivalTime: '23:45',
      date: '2024-06-04',
      hasCheckedBaggage: true
    },
    totalPrice: 1477
  }
];

// 酒店数据 (保持不变)
const hotelOptions: HotelOption[] = [
  {
    location: '北海(银沙滩)',
    name: '银沙滩酒店',
    pricePerNight: 210,
    includesBreakfast: true,
    nights: 2 // 默认值，可在计划中覆盖
  },
  {
    location: '北海(涠洲岛)',
    name: '涠洲岛酒店',
    pricePerNight: 400,
    includesBreakfast: true,
    nights: 1 // 默认值
  },
  {
    location: '桂林(象鼻山景区)',
    name: '象鼻山景区酒店',
    pricePerNight: 400,
    includesBreakfast: true,
    nights: 1 // 默认值
  },
  {
    location: '珠海(过夜)',
    name: '珠海过夜酒店',
    pricePerNight: 160,
    includesBreakfast: true,
    nights: 1 // 默认值
  },
  {
    location: '珠海长隆',
    name: '珠海长隆酒店+门票',
    pricePerNight: 1970, // 一晚含门票总价
    includesBreakfast: true,
    nights: 1 // 默认值
  }
];

// --- 旅行计划集合 ---

// 集合一：2024 广西/珠海 端午备选方案
const duanwu2024Plans: TravelPlan[] = [
  {
    id: 'plan1',
    name: '方案一: 北海往返',
    flights: roundTripFlightOptions[1], // rt1
    hotels: [
        {...hotelOptions[0], nights: 2}, // 银沙滩2晚
        {...hotelOptions[1], nights: 2}  // 涠洲岛2晚
    ], // 共4晚
    totalDays: 5
  },
  {
    id: 'plan2',
    name: '方案二: 西安-北海-桂林-西安 (晚班机)',
    flights: roundTripFlightOptions[2], // rt2
    train: trainOptions[0], // 北海->桂林
    hotels: [
        {...hotelOptions[0], nights: 2}, // 银沙滩2晚
        {...hotelOptions[1], nights: 2}, // 涠洲岛2晚
        hotelOptions[2]                 // 桂林1晚
    ], // 共5晚
    totalDays: 6
  },
  {
    id: 'plan3',
    name: '方案三: 西安-北海-桂林-西安 (中午班机)',
    flights: roundTripFlightOptions[3], // rt3
    train: trainOptions[0], // 北海->桂林
    hotels: [
        {...hotelOptions[0], nights: 2}, // 银沙滩2晚
        {...hotelOptions[1], nights: 2}, // 涠洲岛2晚
        hotelOptions[2]                 // 桂林1晚
    ], // 共5晚
    totalDays: 6
  },
  {
    id: 'plan4',
    name: '方案四: 西安-桂林-北海-西安',
    flights: roundTripFlightOptions[4], // rt4
    train: trainOptions[1], // 桂林->北海
    hotels: [
        hotelOptions[2],                 // 桂林1晚
        {...hotelOptions[0], nights: 2}, // 银沙滩2晚
        {...hotelOptions[1], nights: 2}  // 涠洲岛2晚
    ], // 共5晚
    totalDays: 6
  },
  {
    id: 'plan5',
    name: '方案五: 西安-北海-珠海-西安 (无托运)',
    flights: roundTripFlightOptions[5], // rt5
    train: trainOptions[2], // 北海->珠海
    hotels: [
      { ...hotelOptions[0], nights: 2 }, // 银沙滩2晚
      { ...hotelOptions[1], nights: 1 }, // 涠洲岛1晚
      hotelOptions[3], // 珠海过夜1晚
      hotelOptions[4]  // 珠海长隆1晚
    ], // 共5晚
    totalDays: 6
  },
  {
    id: 'plan6',
    name: '方案六: 西安-北海-珠海-西安 (含托运)',
    flights: roundTripFlightOptions[6], // rt6
    train: trainOptions[2], // 北海->珠海
    hotels: [
      { ...hotelOptions[0], nights: 2 }, // 银沙滩2晚
      { ...hotelOptions[1], nights: 1 }, // 涠洲岛1晚
      hotelOptions[3], // 珠海过夜1晚
      hotelOptions[4]  // 珠海长隆1晚
    ], // 共5晚
    totalDays: 6
  },
  {
    id: 'plan7',
    name: '方案七: 西安-珠海-北海-西安 (5.28-6.2)',
    flights: roundTripFlightOptions[0], // rt7
    train: trainOptions[3], // 珠海->北海
    hotels: [
      hotelOptions[3], // 珠海过夜1晚
      hotelOptions[4], // 珠海长隆1晚
      { ...hotelOptions[0], nights: 2 }, // 银沙滩2晚
      { ...hotelOptions[1], nights: 1 }, // 涠洲岛1晚
    ], // 共5晚
    totalDays: 6
  }
];

// 导出所有旅行计划集合
export const allTravelPlanSets: TravelPlanSet[] = [
  {
    id: 'duanwu-2025-guangxi-zhuhai', // 更新年份
    name: '2025 广西/珠海 端午旅行方案', // 更新年份
    description: '围绕2025年端午节假期，规划的广西（北海、桂林）或珠海长隆的旅行方案对比。', // 更新年份
    plans: duanwu2024Plans, // 计划数组名称保持不变，但内容是针对2025的
    holidayDates: ['2025-05-30', '2025-05-31', '2025-06-01'] // 假设2025端午假期日期，请根据实际情况调整
  },
  // 未来可以在这里添加更多 TravelPlanSet
  // {
  //   id: 'guoqing-2024-xxx',
  //   name: '2024 国庆 XXX 备选方案',
  //   description: '...',
  //   plans: [],
  //   holidayDates: ['2024-10-01', ...]
  // }
];


// --- 辅助函数 ---

// 计算总费用 (2大人1小孩) - 保持不变
export const calculateTotalCost = (plan: TravelPlan): number => {
  const flightCost = plan.flights.totalPrice * 3;
  const trainCost = plan.train ? (plan.train.adultPrice * 2 + plan.train.childPrice) : 0;
  const hotelCost = plan.hotels.reduce((total, hotel) => {
    return total + (hotel.pricePerNight * hotel.nights);
  }, 0);
  return flightCost + trainCost + hotelCost;
};

// 计算需要请假的天数 - 保持不变 (逻辑基于 plan.id)
export const calculateWorkDaysOff = (plan: TravelPlan): number => {
  // 注意：这里的 plan.id 是 TravelPlan 内部的 id，不是 TravelPlanSet 的 id
  if (plan.id === 'plan7') {
    return 3; // 5.28, 5.29, 5.30 (方案七)
  } else if (plan.id === 'plan1') {
    return 2; // 5.30 和 6.3 (方案一)
  } else if (plan.id === 'plan5' || plan.id === 'plan6') {
    return 3; // 5.30, 6.3, 6.4 (珠海方案五、六)
  } else { // plan2, plan3, plan4
    return 3; // 5.30, 6.3, 6.4 (桂林方案二、三、四)
  }
};

// 新增：根据集合ID获取计划集合的函数
export const getPlanSetById = (id: string): TravelPlanSet | undefined => {
  return allTravelPlanSets.find(set => set.id === id);
};
