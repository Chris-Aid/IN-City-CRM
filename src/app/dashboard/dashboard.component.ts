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

  customers2021 = [];

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
    this.loadChart();
  }

  loadChart() {
    let ctx: any = document.getElementById('myChart');
    let myCtx = ctx.getContext('2d');
    let myChart = new Chart(myCtx, {
      type: 'line',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
          label: 'Verlauf der Migliederzahlen',
          data: [203, 200, 190, 230, 202, 200],
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
            max: 240,
            min: 180,
            ticks: {
              stepSize: 10
            }
          }
        }
      }
    });
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
    let firstYear = 0;
    let secondYear = 0;
    let thirdYear = 0;
    let fourthYear = 0;
    let fifthYear = 0;
    let sixthYear = 0;

    for (let i = 0; i < customer.length; i++) {
      let entryYear = customer[i].entryDate.slice(-4);
      console.log(entryYear)
      let exitYear = customer[i].terminationDate.slice(-4);
      let status = customer[i].status;
      console.log(status)
      if (entryYear !== "" && entryYear < 2017 && customer[i].status == 'aktiv') {
        firstYear++;
      }
      if (entryYear !== "" && entryYear < 2018 && customer[i].status == 'aktiv') {
        secondYear++;
      }
      if (entryYear !== "" && entryYear < 2019 && customer[i].status == 'aktiv') {
        thirdYear++;
      }
      if (entryYear !== "" && entryYear < 2020 && customer[i].status == 'aktiv') {
        fourthYear++;
      }
      if (entryYear !== "" && entryYear < 2021 && customer[i].status == 'aktiv') {
        fifthYear++;
      }
      if (entryYear !== "" && entryYear < 2022 && customer[i].status == 'aktiv') {
        sixthYear++;
      }
    }
    console.log(firstYear)
    console.log(secondYear)
    console.log(thirdYear)
    console.log(fourthYear)
    console.log(fifthYear)
    console.log(sixthYear)
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