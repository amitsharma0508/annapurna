import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingProuct1Component } from './trending-prouct1.component';

describe('TrendingProuct1Component', () => {
  let component: TrendingProuct1Component;
  let fixture: ComponentFixture<TrendingProuct1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingProuct1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingProuct1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
