// Interfaces for Customer and Transaction models
export interface Customer {
    id: number;
    name: string;
  }
  
  export interface Transaction {
    id: number;
    customer_id: number;
    date: string;
    amount: number;
  }
  
  // Interface for Aggregated Data
  export interface AggregatedData {
    name: string;
    totalAmount: number;
  }
  
  // Interface for Chart Options
  import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexLegend } from 'ng-apexcharts';
  
  export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;  // Ensure title is non-optional
    legend: ApexLegend;
  }
  