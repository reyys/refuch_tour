import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroEyeSolid,
  heroPencilSolid,
  heroTrashSolid,
} from '@ng-icons/heroicons/solid';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Service } from '../../../models/service.model';
import { ServiceService } from '../../../services/service/service.service';
import { DialogModule } from 'primeng/dialog';
import { EditServicesComponent } from '../../dashboard/admin-services/edit-services/edit-services.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    EditServicesComponent,
  ],
  viewProviders: [
    provideIcons({ heroEyeSolid, heroTrashSolid, heroPencilSolid }),
  ],
  providers: [ConfirmationService],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  loading = false;
  @Input({ required: true }) service!: Service;
  @Input() adminMode: boolean = false;
  showEditModal = false;

  constructor(
    private messageService: MessageService,
    private serviceService: ServiceService,
    private confirmationService: ConfirmationService
  ) {}

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  confirm1(event: Event) {
    this.loading = true;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this service ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.serviceService.deleteService(this.service._id).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Service deleted successfully',
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete service',
            });
          }
        );
        this.loading = false;
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
        this.loading = false;
      },
    });
  }
}
