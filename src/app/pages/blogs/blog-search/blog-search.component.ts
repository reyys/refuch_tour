import { Component } from '@angular/core';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { Blog } from '../../../models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-search',
  standalone: true,
  imports: [BlogCardComponent, FormsModule, SkeletonModule],
  templateUrl: './blog-search.component.html',
  styleUrl: './blog-search.component.css',
})
export class BlogSearchComponent {
  loading = true;
  query: string | undefined | null;
  blogs: Blog[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('query') !== null) {
        this.query = params.get('query');
        if (this.query) {
          this.blogService.searchBlog(this.query).subscribe(
            (response) => {
              this.blogs = response.data;
              this.loading = false;
            },
            (err) => {
              this.loading = false;
            }
          );
        }
      }
    });
  }
}
