import { CurrencyPipe, formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { first } from 'rxjs';
import { SharedService } from '../shared.service';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentYear: number;

  firstYear = [];
  secondYear = [];
  thirdYear = [];
  fourthYear = [];
  fifthYear = [];
  sixthYear = [];

  backgroundColorChart = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ];

  borderColorChart = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  constructor(public firestore: AngularFirestore, private _formBuilder: FormBuilder, public settings: SharedService) { }

  isChecked = false;

  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  fees = [];
  sum: number = 0;
  formattedSum;
  show: boolean = false;
  amountOfCustomers: number = 0;
  amountOfTerminatedCustomers: number = 0;
  terminatedCustomer = [];

  ngOnInit(): void {
    this.getDataFromFirebase();
    this.getCurrentYear();
    // loads Charts, takes few ms to get data ready
    setTimeout(() => {
      this.loadMemberChart();
      this.loadIncomeChart();
    }, 500)
  }

  getDataFromFirebase() {
    this.firestore
      .collection('Kunden')
      .valueChanges()
      .subscribe((customer: any) => {

        this.getMembershipFees(customer);
        this.getTerminatedCustomer(customer);
        this.sortCustomerByEntryDate(customer);
      });
  }

  getCurrentYear() {
    let currentDate = new Date;
    let year = currentDate.getFullYear();
    this.currentYear = year;
  }

  loadMemberChart() {
    let ctx: any = document.getElementById('memberChart');
    let myCtx = ctx.getContext('2d');
    let myChart = new Chart(myCtx, {
      type: 'bar',
      data: {
        labels: [this.currentYear - 5, this.currentYear - 4, this.currentYear - 3, this.currentYear - 2, this.currentYear - 1, this.currentYear],
        datasets: [{
          data: [
            this.firstYear.length,
            this.secondYear.length,
            this.thirdYear.length,
            this.fourthYear.length,
            this.fifthYear.length,
            this.sixthYear.length
          ],
          backgroundColor: this.backgroundColorChart,
          borderColor: this.borderColorChart,
          borderWidth: 1.5
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Verlauf der Mitgliederzahlen'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            max: 15,
            min: 5,
            ticks: {
              stepSize: 2
            }
          }
        }
      }
    });
  }

  loadIncomeChart() {
    let ctx: any = document.getElementById('incomeChart');
    let myCtx = ctx.getContext('2d');
    let myChart = new Chart(myCtx, {
      type: 'line',
      data: {
        labels: [this.currentYear - 5, this.currentYear - 4, this.currentYear - 3, this.currentYear - 2, this.currentYear - 1, this.currentYear],
        datasets: [{
          data: [
            this.getIncome(this.firstYear),
            this.getIncome(this.secondYear),
            this.getIncome(this.thirdYear),
            this.getIncome(this.fourthYear),
            this.getIncome(this.fifthYear),
            this.getIncome(this.sixthYear)
          ],
          backgroundColor: this.backgroundColorChart,
          borderColor: this.borderColorChart,
          borderWidth: 1.5
        }]
      },
      options: {
        plugins: {

          title: {
            display: true,
            text: 'Einnahmen durch Mitgliedsbeiträge'
          },
          legend: {
            display: false,
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          y: {
            max: 10000,
            min: 1000,
            ticks: {
              // color: 'white',
              stepSize: 1000
            }
          }
        }
      }
    });
  }

  getIncome(year) {
    let income = 0;
    for (let i = 0; i < year.length; i++) {
      income += +year[i].membershipFee;
    }
    console.log(income * 12)
    return income * 12
  }

  // each array stands for a certain year to display the last 5 years in chartsJS. Customers that were active in certain years are push to the arrays
  sortCustomerByEntryDate(customer) {
    for (let i = 0; i < customer.length; i++) {
      let entryYear = customer[i].entryDate.slice(-4);
      let exitYear = customer[i].terminationDate.slice(-4);
      if (entryYear !== "" && entryYear <= this.currentYear - 5 && exitYear == "" || exitYear > this.currentYear - 5) {
        this.firstYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= this.currentYear - 4 && exitYear == "" || exitYear > this.currentYear - 4) {
        this.secondYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= this.currentYear - 3 && exitYear == "" || exitYear > this.currentYear - 3) {
        this.thirdYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= this.currentYear - 2 && exitYear == "" || exitYear > this.currentYear - 2) {
        this.fourthYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= this.currentYear - 1 && exitYear == "" || exitYear > this.currentYear - 1) {
        this.fifthYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= this.currentYear && exitYear == "" || exitYear > this.currentYear) {
        this.sixthYear.push(customer[i])
      }
    }
  }

  getMembershipFees(customer) {
    for (let i = 0; i < customer.length; i++) {
      if (customer[i].status == 'aktiv' && customer[i].member == 'member') {
        // summs up all membershipFees
        this.sum += +customer[i].membershipFee;

        // findes out how many custermers the company has
        this.amountOfCustomers++;
      }
    }

    let sumOfYear = this.sum * 12;
    this.formattedSum = sumOfYear.toLocaleString("es-ES", { minimumFractionDigits: 2 })
  }

  getTerminatedCustomer(customer) {
    for (let i = 0; i < customer.length; i++) {
      if (customer[i].status == 'gekündigt') {

        this.terminatedCustomer.push(
          {
            name: customer[i].company,
            reason: customer[i].terminationReason,
            date: customer[i].terminationDate
          }
        );
        this.amountOfTerminatedCustomers++;
      }
    }
  }
}