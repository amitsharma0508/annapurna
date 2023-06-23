import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingProuct4Component } from './trending-prouct4.component';

describe('TrendingProuct4Component', () => {
  let component: TrendingProuct4Component;
  let fixture: ComponentFixture<TrendingProuct4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingProuct4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingProuct4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
