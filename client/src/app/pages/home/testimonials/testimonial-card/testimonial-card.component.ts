import { Component, Input } from '@angular/core';
import { Testimonial } from '../../../../models/testimonial.model';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TestimonialService } from '../../../../services/testimonial/testimonial.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditTestimonialsComponent } from '../../../dashboard/admin-testimonials/edit-testimonials/edit-testimonials.component';
import {
  heroPencilSolid,
  heroStarSolid,
  heroTrashSolid,
} from '@ng-icons/heroicons/solid';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ConfirmDialogModule,
    DialogModule,
    EditTestimonialsComponent,
    ButtonModule,
  ],
  viewProviders: [
    provideIcons({ heroStarSolid, heroPencilSolid, heroTrashSolid }),
  ],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css',
})
export class TestimonialCardComponent {
  @Input({ required: true }) testimonial!: Testimonial;
  @Input() adminMode: boolean = false;
  showEditModal = false;

  constructor(
    private messageService: MessageService,
    private testimonialService: TestimonialService,
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
        this.testimonialService
          .deleteTestimonial(this.testimonial._id)
          .subscribe(
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
