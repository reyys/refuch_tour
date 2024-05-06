import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TestimonialCardComponent } from '../../home/testimonials/testimonial-card/testimonial-card.component';
import { MessageService } from 'primeng/api';
import { ImageService } from '../../../services/image/image.service';
import { Testimonial } from '../../../models/testimonial.model';
import { TestimonialService } from '../../../services/testimonial/testimonial.service';

@Component({
  selector: 'app-admin-testimonials',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    TestimonialCardComponent,
  ],
  templateUrl: './admin-testimonials.component.html',
  styleUrl: './admin-testimonials.component.css',
})
export class AdminTestimonialsComponent {
  loading = false;
  image: File | undefined;
  testimonials: Testimonial[] | undefined;

  testimonialForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(4)]),
    comment: new FormControl('', [Validators.required, Validators.min(20)]),
    job: new FormControl('', [Validators.required, Validators.min(5)]),
  });

  constructor(
    private imageService: ImageService,
    private testimonialService: TestimonialService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.testimonialService.getAllTestimonials().subscribe((response) => {
      this.testimonials = response.data;
    });
  }

  onFileChange(e: any) {
    if (e.target.files) {
      this.image = e.target.files[0];
    }
  }

  onSubmit() {
    if (this.testimonialForm.valid) {
      const formData = this.testimonialForm.value;
      if (this.image) {
        this.loading = true;
        this.imageService.uploadImage(this.image).subscribe((response) => {
          this.testimonialService
            .createTestimonial({
              name: formData.name!,
              avatarUrl: response.imageUrl,
              comment: formData.comment!,
              job: formData.job!,
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Testimonial Created Successfully',
                });
                this.testimonialForm.reset();
                this.image = undefined;
                this.loading = false;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: error.message,
                  detail: 'Failed to create a new testimonial. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Empty Image',
          detail: 'Please upload your testimonial image',
        });
        this.loading = false;
      }
    }
  }
}
