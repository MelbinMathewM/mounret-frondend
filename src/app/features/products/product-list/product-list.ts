import { Component, OnInit } from "@angular/core"
import { ProductsService } from "../services/products.service"
import { CategoryService } from "../services/category.service"
import { BrandsService } from "../services/brands.service"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {

  products: any[] | null = null
  categories: any[] | null = null
  brands: any[] | null = null

  filters: any = {
    categoryId: '',
    brandId: '',
    sortBy: ''
  }

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) { }

  ngOnInit() {

    this.loadProducts()

    this.categoryService.getAll().subscribe((res: any) => {
      this.categories = res
    })

    this.brandService.getAll().subscribe((res: any) => {
      this.brands = res
    })

  }

  loadProducts() {

    this.productService.getProducts(this.filters)
      .subscribe((res: any) => {
        this.products = res.data

        console.log(res.data, 'df')
      })

  }

  applyFilters() {
    this.loadProducts()
  }

}