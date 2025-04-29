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

// 火车票数据
export const trainOptions: TrainOption[] = [
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

// 往返航班数据
export const roundTripFlightOptions: RoundTripFlightOption[] = [
  {
    id: 'rt7',
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
    totalPrice: 1606 // 往返总价
  },
  {
    id: 'rt1',
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
    totalPrice: 1598 // 往返总价
  },
  {
    id: 'rt2',
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
    totalPrice: 1187 // 往返总价
  },
  {
    id: 'rt3',
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
    totalPrice: 1519 // 往返总价
  },
  {
    id: 'rt4',
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
    totalPrice: 1842 // 往返总价
  },
  {
    id: 'rt5',
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
    totalPrice: 1197 // 无托运行李的往返总价
  },
  {
    id: 'rt6',
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
    totalPrice: 1477 // 含托运行李的往返总价
  },
  {
    id: 'rt8',
    outbound: {
      departure: '西安',
      arrival: '桂林',
      departureTime: '07:30',
      arrivalTime: '10:00',
      date: '2025-06-20',
      hasCheckedBaggage: true
    },
    return: {
      departure: '北海',
      arrival: '西安',
      departureTime: '16:00',
      arrivalTime: '18:25',
      date: '2025-06-24',
      hasCheckedBaggage: true
    },
    totalPrice: 1800 // 往返总价
  }
];

// 酒店数据
export const hotelOptions: HotelOption[] = [
  {
    location: '北海(银沙滩)',
    name: '银沙滩酒店',
    pricePerNight: 210, // 平均价格
    includesBreakfast: true,
    nights: 2
  },
  {
    location: '北海(涠洲岛)',
    name: '涠洲岛酒店',
    pricePerNight: 400,
    includesBreakfast: true,
    nights: 1
  },
  {
    location: '桂林(象鼻山景区)',
    name: '象鼻山景区酒店',
    pricePerNight: 400,
    includesBreakfast: true,
    nights: 1
  },
  {
    location: '珠海(过夜)',
    name: '珠海过夜酒店',
    pricePerNight: 160,
    includesBreakfast: true,
    nights: 1
  },
  {
    location: '珠海长隆',
    name: '珠海长隆酒店+门票',
    pricePerNight: 1970, // 一晚含门票总价
    includesBreakfast: true,
    nights: 1
  }
];

// 旅行计划
export const travelPlans: TravelPlan[] = [
  {
    id: 'plan1',
    name: '方案一: 北海往返',
    flights: roundTripFlightOptions[1],
    hotels: [hotelOptions[0], hotelOptions[1]], // 银沙滩2晚 + 涠洲岛2晚 = 4晚
    totalDays: 5
  },
  {
    id: 'plan2',
    name: '方案二: 西安-北海-桂林-西安 (晚班机)',
    flights: roundTripFlightOptions[2],
    train: trainOptions[0],
    hotels: [hotelOptions[0], hotelOptions[1], hotelOptions[2]], // 银沙滩2晚 + 涠洲岛2晚 + 桂林1晚 = 5晚
    totalDays: 6
  },
  {
    id: 'plan3',
    name: '方案三: 西安-北海-桂林-西安 (中午班机)',
    flights: roundTripFlightOptions[3],
    train: trainOptions[0],
    hotels: [hotelOptions[0], hotelOptions[1], hotelOptions[2]], // 银沙滩2晚 + 涠洲岛2晚 + 桂林1晚 = 5晚
    totalDays: 6
  },
  {
    id: 'plan4',
    name: '方案四: 西安-桂林-北海-西安',
    flights: roundTripFlightOptions[4],
    train: trainOptions[1],
    hotels: [hotelOptions[2], hotelOptions[0], hotelOptions[1]], // 桂林1晚 + 银沙滩2晚 + 涠洲岛2晚 = 5晚
    totalDays: 6
  },
  {
    id: 'plan5',
    name: '方案五: 西安-北海-珠海-西安 (无托运)',
    flights: roundTripFlightOptions[5],
    train: trainOptions[2],
    hotels: [
      { ...hotelOptions[0], nights: 2 }, // 银沙滩2晚
      { ...hotelOptions[1], nights: 1 }, // 涠洲岛1晚
      hotelOptions[3], // 珠海过夜1晚
      hotelOptions[4]  // 珠海长隆1晚
    ], // 银沙滩2晚 + 涠洲岛1晚 + 珠海过夜1晚 + 珠海长隆1晚 = 5晚
    totalDays: 6
  },
  {
    id: 'plan6',
    name: '方案六: 西安-北海-珠海-西安 (含托运)',
    flights: roundTripFlightOptions[6],
    train: trainOptions[2],
    hotels: [
      { ...hotelOptions[0], nights: 2 }, // 银沙滩2晚
      { ...hotelOptions[1], nights: 1 }, // 涠洲岛1晚
      hotelOptions[3], // 珠海过夜1晚
      hotelOptions[4]  // 珠海长隆1晚
    ], // 银沙滩2晚 + 涠洲岛1晚 + 珠海过夜1晚 + 珠海长隆1晚 = 5晚
    totalDays: 6
  },
  {
    id: 'plan7',
    name: '方案七: 西安-珠海-北海-西安 (5.28-6.2)',
    flights: roundTripFlightOptions[0],
    train: trainOptions[3], // 珠海到北海
    hotels: [
      hotelOptions[3], // 珠海过夜1晚
      hotelOptions[4], // 珠海长隆1晚
      { ...hotelOptions[0], nights: 2 }, // 银沙滩2晚
      { ...hotelOptions[1], nights: 1 }, // 涠洲岛1晚
    ], // 珠海过夜1晚 + 珠海长隆1晚 + 银沙滩2晚 + 涠洲岛1晚 = 5晚
    totalDays: 6
  },
  {
    id: 'plan8',
    name: '2025端午之旅: 西安-桂林-北海-西安',
    flights: roundTripFlightOptions[7],
    train: trainOptions[1],
    hotels: [
      hotelOptions[2], // 桂林1晚
      { ...hotelOptions[0], nights: 2 }, // 银沙滩2晚
      hotelOptions[1]  // 涠洲岛1晚
    ], // 桂林1晚 + 银沙滩2晚 + 涠洲岛1晚 = 4晚
    totalDays: 5
  }
];

// 假日信息
export const holidayDates = ['2024-05-31', '2024-06-01', '2024-06-02'];

// 计算总费用 (2大人1小孩)
export const calculateTotalCost = (plan: TravelPlan): number => {
  // 机票费用 (小孩同价)
  const flightCost = plan.flights.totalPrice * 3;

  // 火车费用 (如果有)
  const trainCost = plan.train ? (plan.train.adultPrice * 2 + plan.train.childPrice) : 0;

  // 酒店费用 (一个房间)
  const hotelCost = plan.hotels.reduce((total, hotel) => {
    return total + (hotel.pricePerNight * hotel.nights);
  }, 0);

  return flightCost + trainCost + hotelCost;
};

// 计算需要请假的天数
export const calculateWorkDaysOff = (plan: TravelPlan): number => {
  if (plan.id === 'plan7') {
    return 3; // 5.28, 5.29, 5.30 (方案七) - 6.2是节假日不用请假
  } else if (plan.id === 'plan1') {
    return 2; // 5.30和6.3 (方案一)
  } else if (plan.id === 'plan5' || plan.id === 'plan6') {
    return 3; // 5.30, 6.3, 6.4 (珠海方案五、六)
  } else if (plan.id === 'plan8') {
    return 2; // 6.20, 6.24 (2025端午之旅)
  } else {
    return 3; // 5.30, 6.3, 6.4 (桂林方案二、三、四)
  }
};
