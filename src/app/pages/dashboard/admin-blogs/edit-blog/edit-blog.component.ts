import { Component, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Blog } from '../../../../models/blog.model';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { BlogService } from '../../../../services/blog/blog.service';
import { ImageService } from '../../../../services/image/image.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  viewProviders: [provideIcons({ heroXMark })],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css',
})
export class EditBlogComponent {
  @Input({ required: true }) blog!: Blog;

  loading = false;
  imageUrl: string = '';
  image: File | undefined;

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.min(10)]),
    content: new FormControl('', [Validators.required, Validators.min(100)]),
    author: new FormControl('', [Validators.required]),
  });

  constructor(
    private blogService: BlogService,
    private imageService: ImageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.blogForm.patchValue({
      title: this.blog.title,
      content: this.blog.content,
      author: this.blog.author,
    });
    this.imageUrl = this.blog.imageUrl;
  }

  onFileChange(e: any) {
    if (e.target.files) {
      this.image = e.target.files[0];
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = this.blogForm.value;
      if (this.image) {
        this.loading = true;
        this.imageService.uploadImage(this.image).subscribe((response) => {
          this.blogService
            .updateBlog(this.blog._id, {
              title: formData.title,
              content: formData.content,
              imageUrl: response.imageUrl,
              tags: ['Test'],
              author: formData.author,
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Blog Updated Successfully',
                });
                this.loading = false;
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to update blog. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.blogService
          .updateBlog(this.blog._id, {
            title: formData.title,
            content: formData.content,
            imageUrl: this.blog.imageUrl,
            tags: ['Test'],
            author: formData.author,
          })
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Blog Updated Successfully',
              });
              this.loading = false;
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update blog. Invalid data',
              });
              this.loading = false;
            }
          );
      }
    }
  }
}
