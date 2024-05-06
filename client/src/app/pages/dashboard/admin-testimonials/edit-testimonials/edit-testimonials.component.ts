import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { Testimonial } from '../../../../models/testimonial.model';
import { TestimonialService } from '../../../../services/testimonial/testimonial.service';
import { ImageService } from '../../../../services/image/image.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-edit-testimonials',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './edit-testimonials.component.html',
  styleUrl: './edit-testimonials.component.css',
})
export class EditTestimonialsComponent {
  @Input({ required: true }) testimonial!: Testimonial;

  loading = false;
  imageUrl: string = '';
  image: File | undefined;

  testimonialForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(4)]),
    comment: new FormControl('', [Validators.required, Validators.min(20)]),
    job: new FormControl('', [Validators.required, Validators.min(5)]),
  });

  constructor(
    private testimonialService: TestimonialService,
    private imageService: ImageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.testimonialForm.patchValue({
      name: this.testimonial.name,
      comment: this.testimonial.comment,
      job: this.testimonial.job,
    });
    this.imageUrl = this.testimonial.avatarUrl;
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
            .updateTestimonial(this.testimonial._id, {
              name: formData.name,
              imageUrl: response.imageUrl,
              comment: formData.comment,
              job: formData.job,
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Testimonial Updated Successfully',
                });
                this.loading = false;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to update testimonial. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.testimonialService
          .updateTestimonial(this.testimonial._id, {
            name: formData.name,
            avatarUrl: this.imageUrl,
            comment: formData.comment,
            job: formData.job,
          })
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Testimonial Updated Successfully',
              });
              this.loading = false;
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update testimonial. Invalid data',
              });
              this.loading = false;
            }
          );
      }
    }
  }
}
