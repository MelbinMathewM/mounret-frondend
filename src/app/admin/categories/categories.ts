import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html'
})
export class Categories implements OnInit {

  categories: any[] = [];

  showForm = false;
  editing = false;

  selectedFile: any = null;
  preview: any = null;

  form: any = {
    id: null,
    name: ''
  };

  constructor(
    private service: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((res: any) => {
      this.categories = res;
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

  edit(category: any) {

    this.showForm = true;
    this.editing = true;

    this.form = {
      id: category.id,
      name: category.name
    };

    this.preview = "http://localhost:5234" + category.image;

  }

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result;
    }

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

    if (confirm("Delete category?")) {

      this.service.delete(id)
        .subscribe(() => {
          this.load();
        });

    }

  }

  cancel() {
    this.showForm = false;
    this.preview = null;
    this.selectedFile = null;
  }

}