import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TourCardComponent } from './tour-card/tour-card.component';
import { TourService } from '../../services/tour/tour.service';
import { InputTextModule } from 'primeng/inputtext';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [
    TourCardComponent,
    CommonModule,
    SkeletonModule,
    InputTextModule,
    NgIconComponent,
  ],
  viewProviders: [provideIcons({ heroMagnifyingGlass })],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css',
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.getAllTours().subscribe((response) => {
      this.tours = response.data;
    });
  }
}
