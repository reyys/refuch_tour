import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroChevronLeft } from '@ng-icons/heroicons/outline';
import { Tour } from '../../../models/tour.model';
import { CommonModule, DatePipe } from '@angular/common';
import { TourService } from '../../../services/tour/tour.service';
import { MessageService } from 'primeng/api';
import { PaymentService } from '../../../services/payment/payment.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ButtonModule],
  viewProviders: [provideIcons({ heroArrowLeft, heroChevronLeft })],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css',
  providers: [DatePipe],
})
export class TourDetailComponent implements OnInit {
  loading = false;
  slug: string | undefined | null;
  tourData: Tour | undefined | null;
  parsedDescription: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private messageService: MessageService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('slug') !== null) {
        this.slug = params.get('slug');
        if (this.slug) {
          this.tourService.getTourBySlug(this.slug).subscribe((response) => {
            this.tourData = response.data;
            this.parsedDescription = response.data.description.replaceAll(
              /\n/g,
              '<br />'
            );
          });
        }
      }
    });
  }

  buyTicket() {
    this.loading = true;
    this.paymentService.payTour(this.tourData!._id).subscribe(
      (response) => {
        window.location.href = response.invoice_url;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to generate invoice link. Please try again later',
        });
        this.loading = false;
      }
    );
  }
}
