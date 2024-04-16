import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../../services/service/service.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageService } from '../../../services/image/image.service';
import { MessageService } from 'primeng/api';
import { Service } from '../../../models/service.model';
import { ServiceCardComponent } from '../../services/service-card/service-card.component';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ServiceCardComponent,
  ],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css',
})
export class AdminServicesComponent {
  loading = false;
  image: File | undefined;
  services: Service[] | undefined;

  serviceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private serviceService: ServiceService,
    private imageService: ImageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe((response) => {
      this.services = response.data;
    });
  }

  onFileChange(e: any) {
    if (e.target.files) {
      this.image = e.target.files[0];
    }
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;
      if (this.image) {
        this.loading = true;
        this.imageService.uploadImage(this.image).subscribe((response) => {
          this.serviceService
            .createService({
              title: formData.title,
              content: formData.content,
              imageUrl: response.imageUrl,
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Service Created Successfully',
                });
                // this.serviceService
                //   .getAllServices()
                //   .subscribe((data) => (this.services = data));
                this.loading = false;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to create a new service. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Empty Image',
          detail: 'Please upload your service image',
        });
        this.loading = false;
      }
    }
  }
}
