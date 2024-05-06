import { Component } from '@angular/core';
import { Service } from '../../models/service.model';
import { ServiceService } from '../../services/service/service.service';
import { ServiceCardComponent } from './service-card/service-card.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [ServiceCardComponent, SkeletonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {
  services: Service[] = [];

  constructor(private serviceService: ServiceService) {}
  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe((response) => {
      this.services = response.data;
    });
  }
}
