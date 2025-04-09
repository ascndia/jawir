import { FinancialData } from ".";

const generateTrendData = (points: number, change: number) => {
    const volatility = Math.random() * 0.5 + 0.5; // Random volatility between 0.5 and 1
    const isPositive = change >= 0;
    const startValue = 50; // Starting value between 40-60
    const data: number[] = [];
  
    // Generate random walk with slight bias towards the direction of change
    let currentValue = startValue;
    
    for (let i = 0; i < points; i++) {
      // Bias helps ensure the trend generally moves in the direction of change
      const bias = isPositive ? 0.55 : 0.45;
      const direction = Math.random() < bias ? 1 : -1;
      const move = direction * Math.random() * volatility;
      
      currentValue += move;
      // Keep values between 0 and 100
      currentValue = Math.max(0, Math.min(100, currentValue));
      
      data.push(currentValue);
    }
  
    return data;
  };
  
  // Generate a set of mock financial data
  export const generateMockFinancialData = (count: number = 10): FinancialData[] => {
    const assets = [
      { name: 'Apple Inc.', symbol: 'AAPL' },
      { name: 'Microsoft Corp', symbol: 'MSFT' },
      { name: 'Amazon.com Inc', symbol: 'AMZN' },
      { name: 'Alphabet Inc', symbol: 'GOOGL' },
      { name: 'Tesla Inc', symbol: 'TSLA' },
      { name: 'Meta Platforms Inc', symbol: 'META' },
      { name: 'NVIDIA Corp', symbol: 'NVDA' },
      { name: 'Berkshire Hathaway Inc', symbol: 'BRK.B' },
      { name: 'JPMorgan Chase & Co', symbol: 'JPM' },
      { name: 'Johnson & Johnson', symbol: 'JNJ' },
      { name: 'Visa Inc', symbol: 'V' },
      { name: 'Procter & Gamble Co', symbol: 'PG' },
      { name: 'UnitedHealth Group Inc', symbol: 'UNH' },
      { name: 'Home Depot Inc', symbol: 'HD' },
      { name: 'Mastercard Inc', symbol: 'MA' }
    ];
  
    // Ensure we don't try to generate more data than we have assets
    const actualCount = Math.min(count, assets.length);
  
    return Array.from({ length: actualCount }, (_, i) => {
      // Generate random financial values
      const value = Math.round(1000 + Math.random() * 10000); // Value between $1000-$11000
      const change = (Math.random() * 20 - 10).toFixed(1); // Change between -10% and +10%
      const allocation = Math.round(1 + Math.random() * 29); // Allocation between 1% and 30%
      
      // Get the asset details
      const asset = assets[i];
  
      return {
        id: `asset-${i + 1}`,
        name: asset.name,
        symbol: asset.symbol,
        value,
        change: parseFloat(change),
        trendData: generateTrendData(30, parseFloat(change)), // 30 data points
        allocation,
      };
    });
  };
  
  // Calculate summary statistics
  export const calculateSummaryStats = (data: FinancialData[]) => {
    // Calculate total portfolio value
    const totalPortfolio = data.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate weighted average change percentage
    const totalChange = data.reduce((sum, item) => sum + (item.change * item.value), 0);
    const changePercentage = totalChange / totalPortfolio;
    
    // Calculate total allocation
    const totalAllocation = data.reduce((sum, item) => sum + item.allocation, 0);
    
    // Calculate YTD performance (mock value)
    const ytdPerformance = parseFloat((Math.random() * 30 - 5).toFixed(2)); // Between -5% and 25%
    
    return {
      totalPortfolio,
      changePercentage,
      totalAllocation,
      performance: ytdPerformance
    };
  };