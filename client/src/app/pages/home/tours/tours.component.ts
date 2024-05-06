import { Component, OnInit } from '@angular/core';
import { TourService } from '../../../services/tour/tour.service';
import { Tour } from '../../../models/tour.model';
import { TourCardComponent } from '../../tours/tour-card/tour-card.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [TourCardComponent, CarouselModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css',
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  responsiveOptions: any[] | undefined;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.getAllTours().subscribe((response) => {
      this.tours = response.data;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
