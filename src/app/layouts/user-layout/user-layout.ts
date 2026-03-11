import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { SocialSidebar } from '../social-sidebar/social-sidebar';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, SocialSidebar],
  templateUrl: './user-layout.html'
})
export class UserLayout {}