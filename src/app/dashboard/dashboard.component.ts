import { formatNumber } from '@angular/common';
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

  firstYear = [];
  secondYear = [];
  thirdYear = [];
  fourthYear = [];
  fifthYear = [];
  sixthYear = [];

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
    setTimeout(() => {
      this.loadMemberChart();
      this.loadIncomeChart();
      console.log(this.firstYear)
    }, 500)

  }

  loadMemberChart() {
    let ctx: any = document.getElementById('memberChart');
    let myCtx = ctx.getContext('2d');
    let myChart = new Chart(myCtx, {
      type: 'bar',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
          label: 'Migliederzahlen',
          data: [
            this.firstYear.length,
            this.secondYear.length,
            this.thirdYear.length,
            this.fourthYear.length,
            this.fifthYear.length,
            this.sixthYear.length
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
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
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
          label: 'Einnahmen durch Mitgliedsbeiträge',
          data: [
            this.getIncome(this.firstYear),
            this.getIncome(this.secondYear),
            this.getIncome(this.thirdYear),
            this.getIncome(this.fourthYear),
            this.getIncome(this.fifthYear),
            this.getIncome(this.sixthYear)
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            max: 1000,
            min: 100,
            ticks: {
              stepSize: 100
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
    return income
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

  sortCustomerByEntryDate(customer) {
    for (let i = 0; i < customer.length; i++) {
      let entryYear = customer[i].entryDate.slice(-4);
      let exitYear = customer[i].terminationDate.slice(-4);
      if (entryYear !== "" && entryYear <= 2017 && exitYear == "" || exitYear > 2017) {
        this.firstYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= 2018 && exitYear == "" || exitYear > 2018) {
        this.secondYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= 2019 && exitYear == "" || exitYear > 2019) {
        this.thirdYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= 2020 && exitYear == "" || exitYear > 2020) {
        this.fourthYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= 2021 && exitYear == "" || exitYear > 2021) {
        this.fifthYear.push(customer[i])
      }
      if (entryYear !== "" && entryYear <= 2022 && exitYear == "" || exitYear > 2022) {
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