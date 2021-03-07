import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators ,FormGroup, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';

import { DashboardService } from '../service/dashboard.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { MatPaginator, MatTableDataSource } from '@angular/material';


export interface Ships {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

	dashboardForm: FormGroup;
  response:any;
  dataSource: any;
  dataSubject = new BehaviorSubject<any[]>([]);
  displayedColumns: string[] = ['Ship Type', 'Weight', 'Home Port', 'Ship Name', 'Class','Upload Icon'];

  shiptypes: Ships[] = [
    {value: 'Ship 1', viewValue: 'Ship 1'},
    {value: 'Ship 2', viewValue: 'Ship 2'},
    {value: 'Ship 3', viewValue: 'Ship 3'}
  ];
  constructor(private formBuilder: FormBuilder,
    private ds: DashboardService,
    ) { }

  ngOnInit() {
    this.dashboardForm = this.formBuilder.group({
      shipType: [''],
			Weight: [''],
			HomePort: ['']		
  })
  this.ds.getAllData()
			.subscribe(r => {
        console.log("response is",r)
        this.response= JSON.parse(r.result)
        this.onChangeDataSource(JSON.parse(r.result)) 
      })
}

onSearch(){
  var shipType = this.dashboardForm.get("shipType").value
  var weight = this.dashboardForm.get("Weight").value
  var homePort = this.dashboardForm.get("HomePort").value

   var searchData ={
    shipType: shipType,
    weight: weight,
     homePort:homePort

   }
   console.log("searchData",searchData)
   if(shipType!= null&& shipType!= "")
   this.dataSource.filter = shipType.trim().toLowerCase();
   if(weight!= null && weight!= "")
   this.dataSource.filter = weight.trim().toLowerCase();
   if(homePort!= null && homePort!= "")
   this.dataSource.filter = homePort.trim().toLowerCase();

   console.log("this.datasource",this.dataSource)
   console.log("this.dataSource.filteredData.length",this.dataSource.filteredData.length)

   if(this.dataSource.filteredData.length == 0)
   { 
      this.ds.getData(searchData)
			.subscribe(r => {
        console.log("response is",r)
        this.onChangeDataSource(JSON.parse(r.result)) 
      })
    }

}
onReset(){
  this.onChangeDataSource(this.response)
}
onChangeDataSource(value) {
  this.dataSubject.next(value);
  this.dataSource = new MatTableDataSource();

  this.dataSource = new MatTableDataSource(value);
  this.dataSource.paginator = this.paginator;
  console.log("dataSource : ", this.dataSource);
}
}
