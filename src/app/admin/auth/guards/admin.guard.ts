import { Injectable, inject, PLATFORM_ID } from '@angular/core'
import { Router } from '@angular/router'
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  private router = inject(Router)
  private platformId = inject(PLATFORM_ID)

  canActivate() {

    if (isPlatformBrowser(this.platformId)) {

      const token = localStorage.getItem("token")

      if (!token) {
        this.router.navigate(['/'])
        return false
      }

      return true
    }

    // allow server rendering
    return true
  }
}