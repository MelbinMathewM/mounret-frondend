import { ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { EnquiryService } from "../services/enquiry"

@Component({
    selector: 'app-admin-enquiries',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './enquiries.html'
})
export class AdminEnquiries implements OnInit {

    enquiries: any[] = []
    loading = false

    constructor(
        private enquiryService: EnquiryService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.loadEnquiries()
    }

    loadEnquiries() {
        this.loading = true

        setTimeout(() => {
            this.enquiryService.getAll()
                .subscribe({
                    next: (res: any) => {
                        this.enquiries = res
                        this.loading = false
                        this.cdr.detectChanges()
                    },
                    error: () => {
                        this.loading = false
                        this.cdr.detectChanges()
                    }
                })
        })
    }

    deleteEnquiry(id: number) {
        if (!confirm("Delete this enquiry?")) return

        this.enquiryService.delete(id)
            .subscribe(() => {
                this.loadEnquiries()
            })
    }

}