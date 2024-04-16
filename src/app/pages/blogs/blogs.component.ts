import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../models/blog.model';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogCardComponent, SkeletonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((response) => {
      this.blogs = response.data;
    });
  }
}
