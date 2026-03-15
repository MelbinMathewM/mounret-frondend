import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products';
import { CategoryService } from '../services/category';
import { BrandsService } from '../services/brands';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class Products implements OnInit {

  products: any[] = []
  categories: any[] = []
  brands: any[] = []

  showForm = false
  editing = false

  selectedFile: File | null = null
  preview: string | null = null

  form: any = this.getEmptyForm()

  constructor(
    private service: ProductsService,
    private categoryService: CategoryService,
    private brandService: BrandsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load()
    this.loadCategories()
    this.loadBrands()
  }

  getEmptyForm() {
    return {
      id: null,
      name: '',
      description: '',
      brandId: '',
      categoryId: '',
      stock: 0,
      price: 0,
      dimensions: '',
      material: '',
      additionalInfo: '',
      isActive: true
    }
  }

  load() {
    this.service.getAll().subscribe((res: any) => {

      this.products = [...res.data]

      this.cdr.detectChanges()
    })
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((res: any) => {
      this.categories = res
    })
  }

  loadBrands() {
    this.brandService.getAll().subscribe((res: any) => {
      this.brands = res
    })
  }

  openAdd() {
    this.showForm = true
    this.editing = false

    this.form = this.getEmptyForm()

    this.preview = null
    this.selectedFile = null
  }

  edit(product: any) {

    this.showForm = true
    this.editing = true

    this.form = { ...product }

    this.preview = "http://localhost:5234" + product.image
    this.selectedFile = null
  }

  onFileSelected(event: any) {

    const file = event.target.files[0]
    if (!file) return

    this.selectedFile = file

    const reader = new FileReader()

    reader.onload = () => {
      this.preview = reader.result as string
    }

    reader.readAsDataURL(file)
  }

  save() {

    const formData = new FormData()

    Object.keys(this.form).forEach(k => {

      if (k === "id") return

      formData.append(k, this.form[k])
    })

    if (this.selectedFile) {
      formData.append("image", this.selectedFile)
    }

    if (this.editing) {

      this.service.update(this.form.id, formData)
        .subscribe({
          next: (res: any) => {

            console.log("Update success", res)

            this.cancel()
            this.load()

          },
          error: (err) => {

            console.error("Update failed", err)

          }
        })

    }
    else {

      this.service.create(formData)
        .subscribe(() => {
          this.cancel()
          this.load()
        })

    }
  }

  delete(id: number) {

    if (confirm("Delete product?")) {

      this.service.delete(id)
        .subscribe(() => {
          this.load()
        })

    }

  }

  cancel() {
    this.showForm = false
    this.form = this.getEmptyForm()
    this.preview = null
    this.selectedFile = null
  }

}