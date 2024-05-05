import { Component } from '@angular/core';
import { Service } from '../../../models/service.model';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service/service.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroChevronLeft } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ heroArrowLeft, heroChevronLeft })],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent {
  slug: string | undefined | null;
  serviceData: Service | undefined | null;
  parsedContent: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('slug') !== null) {
        this.slug = params.get('slug');
        if (this.slug) {
          this.serviceService
            .getServiceBySlug(this.slug)
            .subscribe((response) => {
              this.serviceData = response.data;
              this.parsedContent = response.data.content.replaceAll(
                /\n/g,
                '<br />'
              );
            });
        }
      }
    });
  }
}
