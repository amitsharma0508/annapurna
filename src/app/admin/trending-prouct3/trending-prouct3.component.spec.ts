import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingProuct3Component } from './trending-prouct3.component';

describe('TrendingProuct3Component', () => {
  let component: TrendingProuct3Component;
  let fixture: ComponentFixture<TrendingProuct3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingProuct3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingProuct3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
