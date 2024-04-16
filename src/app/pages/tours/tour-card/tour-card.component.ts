import { Component, Input } from '@angular/core';
import { Tour } from '../../../models/tour.model';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroEyeSolid,
  heroPencilSolid,
  heroTrashSolid,
} from '@ng-icons/heroicons/solid';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TourService } from '../../../services/tour/tour.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { EditToursComponent } from '../../dashboard/admin-tours/edit-tours/edit-tours.component';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    EditToursComponent,
  ],
  viewProviders: [
    provideIcons({ heroEyeSolid, heroTrashSolid, heroPencilSolid }),
  ],
  providers: [ConfirmationService],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css',
})
export class TourCardComponent {
  @Input({ required: true }) tour!: Tour;
  @Input() adminMode: boolean = false;
  showEditModal = false;

  constructor(
    private messageService: MessageService,
    private tourService: TourService,
    private confirmationService: ConfirmationService
  ) {}

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.tourService.deleteTour(this.tour._id).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Tour deleted successfully',
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete tour',
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
