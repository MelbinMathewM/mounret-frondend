import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  categories: any[] = [];

  showForm = false;
  editing = false;

  form: any = {
    id: null,
    name: '',
    description: ''
  };


  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((res: any) => {
      this.categories = res;
    });
  }

  openAdd() {
    this.showForm = true;
    this.editing = false;

    this.form = {
      name: '',
      description: ''
    };
  }

  edit(category: any) {

    this.showForm = true;
    this.editing = true;

    this.form = {
      id: category.id,
      name: category.name,
      description: category.description
    };

  }

  save() {

    if (this.editing) {

      this.service.update(this.form.id, this.form)
        .subscribe(() => {
          this.load();
          this.cancel();
        });

    }
    else {

      this.service.create(this.form)
        .subscribe(() => {
          this.load();
          this.cancel();
        });

    }

  }

  delete(id: number) {

    if (confirm("Delete category?")) {

      this.service.delete(id).subscribe(() => {
        this.load();
      });

    }

  }

  cancel() {
    this.showForm = false;
  }

}
