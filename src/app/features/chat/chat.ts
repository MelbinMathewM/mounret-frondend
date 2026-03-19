import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html'
})
export class ChatComponent {

  messages: any[] = []
  userInput: string = ''
  loading = false
  isOpen = false

  constructor(private http: HttpClient) { }

  toggleChat() {
    this.isOpen = !this.isOpen
  }

  sendMessage() {
    if (!this.userInput.trim()) return

    const message = this.userInput

    // 👤 push user message
    this.messages.push({
      role: 'user',
      text: message
    })

    this.userInput = ''
    this.loading = true

    this.http.post('http://localhost:5234/api/chat',
      { message: message },
      { responseType: 'text' }
    ).subscribe({
      next: (res: any) => {
        this.messages.push({
          role: 'ai',
          text: res
        })
        this.loading = false
      },
      error: () => {
        this.messages.push({
          role: 'ai',
          text: 'Something went wrong. Try again.'
        })
        this.loading = false
      }
    })
  }
}