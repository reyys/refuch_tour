import { Component } from '@angular/core';
import { Tour } from '../../../models/tour.model';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../../services/tour/tour.service';
import { MessageService } from 'primeng/api';
import { PaymentService } from '../../../services/payment/payment.service';
import { TourCardComponent } from '../tour-card/tour-card.component';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-tour-search',
  standalone: true,
  imports: [TourCardComponent, FormsModule, SkeletonModule],
  templateUrl: './tour-search.component.html',
  styleUrl: './tour-search.component.css',
})
export class TourSearchComponent {
  loading = true;
  query: string | undefined | null;
  tours: Tour[] = [];

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('query') !== null) {
        this.query = params.get('query');
        if (this.query) {
          this.tourService.searchTour(this.query).subscribe(
            (response) => {
              this.tours = response.data;
              this.loading = false;
            },
            (err) => {
              this.loading = false;
            }
          );
        }
      }
    });
  }
}
