import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  caseForm: any = FormGroup;
  practiceLocations: any;
  categories: any;
  purposes: any;
  caseTypes: any;
  insuranceNames: any;
  cities: any;
  states: any;
  firmData: any;
  firmNames: any;
  insuranceData: any;


  constructor(private fb: FormBuilder, private service: AuthService) { }
  @Output() formSubmitted = new EventEmitter<any>();


  ngOnInit(): void {
    this.createForm();
    this.initailizePracticeLocation();
    this.initalizeCategory();
    this.initailizePurposeOfVisit();
    this.initializeCaseType();
    this.initializeFirm();
    this.selectFirm();
    this.initailizeInsurance();
    this.selectInsurance();
  }


  initailizePracticeLocation(): void {
    this.service.getPracticeLocation().subscribe((result) => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.practiceLocations = data;
      console.log(data);
    }, err => { });
  }


  initalizeCategory(): void {
    this.service.getCategory().subscribe(result => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.categories = data;
    });
  }

  initailizePurposeOfVisit(): void {
    this.service.getPurpose().subscribe(result => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.purposes = data;
      console.log(this.purposes);

    })
  }

  initializeCaseType(): void {
    this.service.getCaseType().subscribe((result) => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.caseTypes = data;
    });
  }
  initializeFirm(): void {
    this.service.getFirm().subscribe((result) => {
      let data = result;
      this.firmData = data;
      console.log(this.firmData);
    });
  }

  createForm() {
    this.caseForm = this.fb.group({
      practiceLocation: ['', Validators.required],
      category: ['', Validators.required],
      purposeOfVisit: ['', Validators.required],
      caseType: ['', Validators.required],
      doa: [''],

      insuranceName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],

      firmName: ['', Validators.required],
      firmCity: ['', Validators.required],
      firmState: ['', Validators.required],
      firmZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  initailizeInsurance(): void {
    this.service.getInsurance().subscribe((result) => {
      let data = result;
      this.insuranceData = data;
      this.insuranceNames = data.map((e: any) => {
        return e.name;
      });
      console.log(this.insuranceData);
    });
  }

  selectInsurance(): void {
    this.caseForm.get('insuranceName')?.valueChanges.subscribe((selectedInsuranceName: any) => {
      const selectedInsurance = this.insuranceData.find((Insurance: any) => Insurance.name === selectedInsuranceName);
      if (selectedInsurance) {
        this.caseForm.patchValue({
          city: selectedInsurance.city,
          state: selectedInsurance.state,
          zipCode: selectedInsurance.zip_code
        });
      } else {
        this.caseForm.patchValue({
          city: '',
          state: '',
          zipCode: ''
        });
      }
    });
  }

  selectFirm(): void {
    this.caseForm.get('firmName')?.valueChanges.subscribe((selectedFirmName: any) => {
      const selectedFirm = this.firmData.find((firm: any) => firm.name === selectedFirmName);
      if (selectedFirm) {
        this.caseForm.patchValue({
          firmCity: selectedFirm.city,
          firmState: selectedFirm.state,
          firmZipCode: selectedFirm.zip_code
        });
      } else {
        this.caseForm.patchValue({
          firmCity: '',
          firmState: '',
          firmZipCode: ''
        });
      }
    });
  }

  onSubmit() {
    if (this.caseForm.valid) {
      const formValues = this.caseForm.value;
      if (formValues.doa) {
        const formattedDoa = new Date(formValues.doa).toISOString().split('T')[0];
        this.caseForm.patchValue({ doa: formattedDoa });
      }
      const formData = this.caseForm.value;
      console.log('Form Data:', formData);
      this.service.submitCase(formData).subscribe(result => {
        alert(result.message);
        this.formSubmitted.emit(result);
      }, err => {
        alert(err.error.message);
      });
    } else {
      console.log('Form is invalid!');
    }
  }

}