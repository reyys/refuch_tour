import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { ImageService } from '../../../../services/image/image.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ServiceService } from '../../../../services/service/service.service';
import { Tour } from '../../../../models/tour.model';
import { TourService } from '../../../../services/tour/tour.service';

@Component({
  selector: 'app-edit-tours',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './edit-tours.component.html',
  styleUrl: './edit-tours.component.css',
})
export class EditToursComponent {
  @Input({ required: true }) tour!: Tour;

  loading = false;
  imageUrl: string = '';
  image: File | undefined;

  tourForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(10)]),
    description: new FormControl('', [
      Validators.required,
      Validators.min(100),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    location: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private tourService: TourService,
    private imageService: ImageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.tourForm.patchValue({
      name: this.tour.name!,
      description: this.tour.description,
      duration: this.tour.duration.toString(),
      location: this.tour.location!,
      price: this.tour.price.toString(),
    });
    this.imageUrl = this.tour.imageUrl;
  }

  onFileChange(e: any) {
    if (e.target.files) {
      this.image = e.target.files[0];
    }
  }

  onSubmit() {
    if (this.tourForm.valid) {
      const formData = this.tourForm.value;
      if (this.image) {
        this.loading = true;
        this.imageService.uploadImage(this.image).subscribe((response) => {
          this.tourService
            .updateTour(this.tour._id, {
              name: formData.name!,
              description: formData.description!,
              duration: Number(formData.duration)!,
              location: formData.location!,
              price: Number(formData.price)!,
              imageUrl: response.imageUrl,
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Tour Updated Successfully',
                });
                this.loading = false;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to update tour. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.tourService
          .updateTour(this.tour._id, {
            name: formData.name!,
            description: formData.description!,
            duration: Number(formData.duration)!,
            location: formData.location!,
            price: Number(formData.price)!,
            imageUrl: this.tour.imageUrl,
          })
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Tour Updated Successfully',
              });
              this.loading = false;
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update tour. Invalid data',
              });
              this.loading = false;
            }
          );
      }
    }
  }
}
