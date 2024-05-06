import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursComponent } from './tours.component';
import { CommonModule } from '@angular/common';

describe('ToursComponent', () => {
  let component: ToursComponent;
  let fixture: ComponentFixture<ToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
