import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { SocialSidebar } from '../social-sidebar/social-sidebar';
import { ChatComponent } from '../../features/chat/chat';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, SocialSidebar, ChatComponent],
  templateUrl: './user-layout.html'
})
export class UserLayout {}