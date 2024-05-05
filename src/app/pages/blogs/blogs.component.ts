import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../models/blog.model';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    BlogCardComponent,
    SkeletonModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  loading: boolean = false;
  blogs: Blog[] = [];

  searchForm = new FormGroup({
    query: new FormControl('', [Validators.required]),
  });

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((response) => {
      this.blogs = response.data;
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      this.router.navigate([`/blogs/search/${formData.query}`]);
    }
  }
}
