import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalogue-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalogue-section.html',
  styleUrl: './catalogue-section.css',
})
export class CatalogueSection {

  loading = false;
  submitted = false;

  catalogue: any;
  catalogueForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.catalogueForm = this.fb.group({
      profileType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      industry: [''],
      company: ['', Validators.required],
      website: ['', Validators.required]
    });

    this.loadCatalogue();
  }

  loadCatalogue() {
    this.http.get("http://localhost:5234/api/catalogue")
      .subscribe((res: any) => {
        this.catalogue = res;
      });
  }

  submitForm() {

    this.submitted = true;

    if (this.catalogueForm.invalid) {
      return;
    }

    this.loading = true;

    this.http.post("http://localhost:5234/api/catalogue/request", this.catalogueForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          alert("Request submitted successfully");
          this.catalogueForm.reset();
        },
        error: () => {
          this.loading = false;
          alert("Something went wrong");
        }
      });

  }

  downloadCatalogue() {
    window.open(this.catalogue?.downloadUrl, "_blank");
  }

}