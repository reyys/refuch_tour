import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Testimonial } from '../../../models/testimonial.model';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { TestimonialService } from '../../../services/testimonial/testimonial.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CarouselModule, CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ heroStarSolid })],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  responsiveOptions: any[] | undefined;

  constructor(private testimonialService: TestimonialService) {
    this.testimonialService.getAllTestimonials().subscribe((response) => {
      this.testimonials = response.data;
    });
  }

  ngOnInit() {
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
