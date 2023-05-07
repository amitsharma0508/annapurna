import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAndBeautyComponent } from './health-and-beauty.component';

describe('HealthAndBeautyComponent', () => {
  let component: HealthAndBeautyComponent;
  let fixture: ComponentFixture<HealthAndBeautyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthAndBeautyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthAndBeautyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
