import { Component } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Blog } from '../../../models/blog.model';
import { ImageService } from '../../../services/image/image.service';
import { MessageService } from 'primeng/api';
import { BlogCardComponent } from '../../blogs/blog-card/blog-card.component';

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    BlogCardComponent,
  ],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.css',
})
export class AdminBlogsComponent {
  loading = false;
  image: File | undefined;
  blogs: Blog[] | undefined;

  showBlogModal = false;

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
    this.blogService.getAllBlogs().subscribe((response) => {
      this.blogs = response.data;
    });
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
            .createBlog({
              title: formData.title,
              content: formData.content,
              imageUrl: response.imageUrl,
              author: formData.author,
              tags: [],
            })
            .subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Blog Created Successfully',
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
                  detail: 'Failed to create a new blog. Invalid data',
                });
                this.loading = false;
              }
            );
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Empty Image',
          detail: 'Please upload your blog image',
        });
        this.loading = false;
      }
    }
  }
}
