import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingProuct2Component } from './trending-prouct2.component';

describe('TrendingProuct2Component', () => {
  let component: TrendingProuct2Component;
  let fixture: ComponentFixture<TrendingProuct2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingProuct2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingProuct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
