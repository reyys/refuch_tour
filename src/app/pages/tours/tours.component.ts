import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TourCardComponent } from './tour-card/tour-card.component';
import { TourService } from '../../services/tour/tour.service';
import { InputTextModule } from 'primeng/inputtext';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [
    TourCardComponent,
    CommonModule,
    SkeletonModule,
    InputTextModule,
    NgIconComponent,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  viewProviders: [provideIcons({ heroMagnifyingGlass })],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css',
})
export class ToursComponent implements OnInit {
  loading: boolean = false;
  tours: Tour[] = [];

  searchForm = new FormGroup({
    query: new FormControl('', [Validators.required]),
  });

  selectedSort = 'createdAt';
  selectedPrice = '<999999999';
  selectedDuration = '<365';

  filterOptions = [
    {
      label: 'Select Sort Option',
      options: [
        {
          label: 'Created At',
          value: 'createdAt',
        },
        {
          label: 'Alphabet',
          value: 'Alphabet',
        },
      ],
    },
    {
      label: 'Select Price Option',
      options: [
        {
          label: 'Less then Rp 500.000',
          value: '<500000',
        },
        {
          label: 'Less then Rp 1.000.000',
          value: '<1000000',
        },
        {
          label: 'Less then Rp 5.000.000',
          value: '<5000000',
        },
        {
          label: 'No Limit',
          value: '<999999999',
        },
      ],
    },
    {
      label: 'Select Duration Option',
      options: [
        {
          label: 'Less than 3 days',
          value: '<3',
        },
        {
          label: 'Less than 7 days',
          value: '<7',
        },
        {
          label: 'Less than 1 months',
          value: '<30',
        },
      ],
    },
  ];

  constructor(
    private tourService: TourService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.tourService.getAllTours().subscribe(
      (response) => {
        this.tours = response.data;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      this.router.navigate([`/tours/search/${formData.query}`]);
    }
  }

  filterTours(): Observable<any> {
    return this.http.get(
      `api/tours?sortBy=${this.selectedSort}&price=${this.selectedPrice}&duration=${this.selectedDuration}`
    );
  }

  onSelectChange(label: string, value: string) {
    if (label === 'Select Sort Option') {
      this.selectedSort = value;
    } else if (label === 'Select Price Option') {
      this.selectedPrice = value;
    } else if (label === 'Select Duration Option') {
      this.selectedDuration = value;
    }
    this.loading = true;
    this.filterTours().subscribe(
      (res) => {
        this.tours = res.data;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
