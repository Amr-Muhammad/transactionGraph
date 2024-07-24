import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Customer, Transaction } from '../chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customers: Customer[] = [];
  transactions: Transaction[] = [];
  filteredCustomers: Customer[] = [];
  filteredTransactions: Transaction[] = [];
  filterName: string = '';
  filterAmount: number | null = null;
  selectedCustomer: Customer | null = null;
  chartOptions: any = {
    series: [],
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: []
    },
    title: {
      text: 'Total Transactions per Day'
    }
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = data;
    });

    this.dataService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = data;
    });
  }

  applyFilters(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.filterName.toLowerCase())
    );
    this.filteredTransactions = this.transactions.filter(transaction =>
      this.filterAmount === null || transaction.amount >= this.filterAmount
    );
  }

  drawChart(customer: Customer): void {
    this.selectedCustomer = customer;

    const customerTransactions = this.transactions.filter(transaction =>
      transaction.customer_id === customer.id
    );

    const transactionTotalsByDate = customerTransactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {} as { [date: string]: number });

    const dates = Object.keys(transactionTotalsByDate);
    const amounts = Object.values(transactionTotalsByDate);

    this.chartOptions = {
      ...this.chartOptions,
      series: [{
        name: 'Amount',
        data: amounts
      }],
      xaxis: {
        categories: dates
      }
    };
  }
}
