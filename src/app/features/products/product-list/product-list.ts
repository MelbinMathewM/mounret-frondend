import { Component, OnInit } from "@angular/core"
import { ProductsService } from "../services/products.service"
import { CategoryService } from "../services/category.service"
import { BrandsService } from "../services/brands.service"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Subject } from "rxjs"
import { debounceTime } from "rxjs/operators"
import { RouterModule } from "@angular/router"

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {

  products: any[] | null = null
  categories: any[] | null = null
  brands: any[] | null = null

  loading = false

  filters: any = {
    categoryId: '',
    brandId: '',
    sortBy: ''
  }

  private filterChanged = new Subject<void>()

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) { }

  ngOnInit() {

    // 🔥 debounce filter changes
    this.filterChanged
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.loadProducts()
      })

    this.loadProducts()

    this.categoryService.getAll().subscribe((res: any) => {
      this.categories = res
    })

    this.brandService.getAll().subscribe((res: any) => {
      this.brands = res
    })
  }

  loadProducts() {
    this.loading = true

    this.productService.getProducts(this.filters)
      .subscribe({
        next: (res: any) => {
          this.products = res.data
          this.loading = false
        },
        error: (err) => {
          console.error("Error loading products:", err)
          this.loading = false
        }
      })
  }

  applyFilters() {
    this.filterChanged.next()
  }

}