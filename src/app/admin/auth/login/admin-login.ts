import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
    selector: 'admin-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-login.html'
})
export class AdminLogin {

    email = ""
    password = ""
    loading = false
    error = ""

    constructor(
        private auth: AdminAuthService,
        private router: Router
    ) { }

    login() {

        this.loading = true
        this.error = ""

        this.auth.login({
            email: this.email,
            password: this.password
        }).subscribe({
            next: (res: any) => {

                this.auth.storeAuth(res)

                this.router.navigate(['/admin/dashboard'])

            },
            error: () => {

                this.error = "Invalid credentials"
                this.loading = false

            }
        })

    }

}