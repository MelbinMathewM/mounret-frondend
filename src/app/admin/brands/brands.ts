import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandsService } from '../services/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brands.html'
})
export class Brands implements OnInit {

  brands: any[] = [];

  showForm = false;
  editing = false;

  selectedFile: any = null;
  preview: any = null;

  form: any = {
    id: null,
    name: ''
  };

  constructor(
    private service: BrandsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((res: any) => {
      this.brands = res;
      this.cdr.detectChanges()
    });
  }

  openAdd() {

    this.showForm = true;
    this.editing = false;

    this.form = {
      name: ''
    };

    this.preview = null;
    this.selectedFile = null;

  }

  edit(brand: any) {

    this.showForm = true;
    this.editing = true;

    this.form = {
      id: brand.id,
      name: brand.name
    };

    this.preview = "http://localhost:5234" + brand.image;

  }

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result;
    };

    reader.readAsDataURL(file);

  }

  save() {

    const formData = new FormData();

    formData.append("name", this.form.name);

    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }

    if (this.editing) {

      this.service.update(this.form.id, formData)
        .subscribe(() => {
          this.load();
          this.cancel();
        });

    }
    else {

      this.service.create(formData)
        .subscribe(() => {
          this.load();
          this.cancel();
        });

    }

  }

  delete(id: number) {

    if(confirm("Delete brand?")) {

      this.service.delete(id).subscribe(() => {
        this.load();
      });

    }

  }

  cancel() {
    this.showForm = false;
  }

}