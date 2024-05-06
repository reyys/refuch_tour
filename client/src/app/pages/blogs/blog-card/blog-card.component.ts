import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroEyeSolid,
  heroPencilSolid,
  heroTrashSolid,
} from '@ng-icons/heroicons/solid';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog/blog.service';
import { Blog } from '../../../models/blog.model';
import { EditBlogComponent } from '../../dashboard/admin-blogs/edit-blog/edit-blog.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    ConfirmDialogModule,
    EditBlogComponent,
    DialogModule,
  ],
  viewProviders: [
    provideIcons({ heroEyeSolid, heroTrashSolid, heroPencilSolid }),
  ],
  providers: [ConfirmationService],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css',
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: Blog;
  @Input() adminMode: boolean = false;
  showEditModal = false;

  constructor(
    private messageService: MessageService,
    private blogService: BlogService,
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
      message: 'Are you sure that you want to delete this blog ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.blogService.deleteBlog(this.blog._id).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Blog deleted successfully',
            });
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete blog',
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
