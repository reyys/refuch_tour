import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../models/blog.model';
import { BlogService } from '../../../services/blog/blog.service';
import { MessageService } from 'primeng/api';
import { PaymentService } from '../../../services/payment/payment.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroChevronLeft } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeft, heroChevronLeft })],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent {
  slug: string | undefined | null;
  blogData: Blog | undefined | null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('slug') !== null) {
        this.slug = params.get('slug');
        if (this.slug) {
          this.blogService.getBlogBySlug(this.slug).subscribe((response) => {
            this.blogData = response.data;
          });
        }
      }
    });
  }
}
