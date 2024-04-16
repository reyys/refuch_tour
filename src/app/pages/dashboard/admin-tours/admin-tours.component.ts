import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TourService } from '../../../services/tour/tour.service';
import { Tour } from '../../../models/tour.model';
import { TourCardComponent } from '../../tours/tour-card/tour-card.component';
import { MessageService } from 'primeng/api';
import { ImageService } from '../../../services/image/image.service';

@Component({
  selector: 'app-admin-tours',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    TourCardComponent,
  ],
  templateUrl: './admin-tours.component.html',
  styleUrl: './admin-tours.component.css',
})
export class AdminToursComponent implements OnInit {
  loading = false;
  image: File | undefined;
  tours: Tour[] = [];

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
    private imageService: ImageService,
    private tourService: TourService,
    private messageService: MessageService
  ) {}

  onFileChange(e: any) {
    if (e.target.files) {
      this.image = e.target.files[0];
    }
  }

  ngOnInit(): void {
    this.tourService.getAllTours().subscribe((response) => {
      this.tours = response.data;
    });
  }

  onSubmit() {
    if (this.tourForm.valid) {
      const formData = this.tourForm.value;
      if (this.image) {
        this.loading = true;
        this.imageService.uploadImage(this.image).subscribe((response) => {
          this.tourService
            .createTour({
              name: formData.name!,
              description: formData.description!,
              duration: Number(formData.duration)!,
              imageUrl: response.imageUrl,
              location: formData.location!,
              price: Number(formData.price)!,
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Tour Created Successfully',
                });
                // this.tourService
                //   .getAllTours()
                //   .subscribe((data) => (this.tours = data));
                this.loading = false;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to create a new tour. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Empty Image',
          detail: 'Please upload your tour image',
        });
        this.loading = false;
      }
    }
  }
}
