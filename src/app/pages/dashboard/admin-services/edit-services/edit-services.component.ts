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
import { Service } from '../../../../models/service.model';
import { ServiceService } from '../../../../services/service/service.service';

@Component({
  selector: 'app-edit-services',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './edit-services.component.html',
  styleUrl: './edit-services.component.css',
})
export class EditServicesComponent {
  @Input({ required: true }) service!: Service;

  loading = false;
  imageUrl: string = '';
  image: File | undefined;

  serviceForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.min(10)]),
    content: new FormControl('', [Validators.required, Validators.min(100)]),
  });

  constructor(
    private serviceService: ServiceService,
    private imageService: ImageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.serviceForm.patchValue({
      title: this.service.title,
      content: this.service.content,
    });
    this.imageUrl = this.service.imageUrl;
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
            .updateService(this.service._id, {
              title: formData.title,
              content: formData.content,
              imageUrl: response.imageUrl,
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Service Updated Successfully',
                });
                this.loading = false;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to update service. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.serviceService
          .updateService(this.service._id, {
            title: formData.title,
            content: formData.content,
            imageUrl: this.service.imageUrl,
          })
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Service Updated Successfully',
              });
              this.loading = false;
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update service. Invalid data',
              });
              this.loading = false;
            }
          );
      }
    }
  }
}
