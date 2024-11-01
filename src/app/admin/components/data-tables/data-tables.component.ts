import { Component, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {
  selectionType = SelectionType.checkbox;
  selected:any = [];

  patients = [];

columns = [
  { name: '', width: 50, headerCheckboxable: true, checkboxable: true },
  { prop: 'patient_id', name: 'Patient ID', width: 80 },
  { prop: 'user.firstName', name: 'First Name', width: 100 },
  { prop: 'user.middleName', name: 'Middle Name', width: 100 },
  { prop: 'user.lastName', name: 'Last Name', width: 100 },
  { prop: 'user.gender', name: 'Gender', width: 70 },
  { prop: 'user.email', name: 'Email', width: 250 },
  { prop: 'user.dob', name: 'Date of Birth', width: 150 },
  { prop: 'home_phone', name: 'Home Phone', width: 100 },
  { prop: 'cell_phone', name: 'Cell Phone', width: 100 },
  { prop: 'ssn', name: 'SSN', width: 100 },
  { prop: 'address', name: 'Address', width: 200 },
  { prop: 'city', name: 'City', width: 100 },
  { prop: 'state', name: 'State', width: 100 },
  { prop: 'zip', name: 'ZIP Code', width: 80 }];


  constructor(private service:AuthService)
  {

  }
  ngOnInit(): void {
    this.initializePatients();
  }

  initializePatients()
  {
    this.service.getAllPatient().subscribe((response:any)=>{
      this.patients = response;
    },(err:any)=>{
      console.log(err);
    });
  }

  _onSelect({ selected }:any) {
    this.selected = selected.map((patient:any) => patient.user.id);
  }

  deleteSelected() {
    this.patients = this.patients.filter((patient:any) => !this.selected.includes(patient.user.id));
    console.log(this.selected);
    this.service.DeletePatient(this.selected).subscribe((response:any)=>{});
    this.selected = [];
  }

}
