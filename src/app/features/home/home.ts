import { CommonModule } from '@angular/common';
import { CatalogueSection } from './catalogue-section/catalogue-section';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [CommonModule, CatalogueSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


  categories = [
    {
      name: "ARTWORKS",
      image: "assets/images/artworks.webp"
    },
    {
      name: "MIRRORS",
      image: "assets/images/mirrors.jpg"
    },
    {
      name: "HOTEL ALARM",
      image: "assets/images/alarm.webp"
    },
    {
      name: "VASES & BOWLS",
      image: "assets/images/vases_and_bowls.jpg"
    },
    {
      name: "SCULPTURE",
      image: "assets/images/sculpture.jpg"
    },
    {
      name: "TABLE LIGHT & CANDLES",
      image: "assets/images/candlelight.webp"
    }
  ];

  brands = [
    { image: 'assets/images/interiorbrand.jpg' },
    { image: 'assets/images/interiorbrand2.jpg' },
    { image: 'assets/images/interiorbrand3.jpg' },
    { image: 'assets/images/interiorbrand4.jpg' },
    { image: 'assets/images/interiorbrand2.jpg' }
  ];

}
