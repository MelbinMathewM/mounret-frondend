import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ProductsService } from "../services/products.service"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html'
})
export class ProductDetail implements OnInit {

  product: any = null
  userType: string = 'private'

  images: string[] = []
  selectedImage: string = ''

  qty = 1
  loading = false

  activeModal: string | null = null

  activeTab: string = 'info'

  form: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    userType: 'private',
    productId: null
  }


  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.loadProduct(+id)
    }
  }

  loadProduct(id: number) {
    this.loading = true

    this.productService.getById(id).subscribe({
      next: (res: any) => {
        this.product = res

        this.form.productId = res.id

        // 👇 Handle images (single or multiple)
        if (res.images && res.images.length) {
          this.images = res.images.map((img: string) =>
            'http://localhost:5234' + img
          )
        } else if (res.image) {
          this.images = ['http://localhost:5234' + res.image]
        }

        if (this.images.length === 0) {
          this.images = ['https://via.placeholder.com/500']
        }

        // 👇 ensure 6 slots (fallback UI)
        while (this.images.length < 6) {
          this.images.push(this.images[0])
        }

        this.selectedImage = this.images[0]

        this.loading = false
      },
      error: () => {
        this.loading = false
      }
    })
  }

  openModal(type: string) {
    this.activeModal = type
  }

  setTab(tab: string) {
    this.activeTab = tab
  }

  closeModal() {
    this.activeModal = null
  }

  submitRequest() {

    console.log(this.form) // debug

    this.productService.sendEnquiry(this.form).subscribe({
      next: () => {
        alert('Request sent successfully!')
        this.closeModal()
      },
      error: (err) => {
        console.error(err)
        alert('Something went wrong')
      }
    })
  }

}