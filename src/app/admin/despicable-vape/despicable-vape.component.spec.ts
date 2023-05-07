import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespicableVapeComponent } from './despicable-vape.component';

describe('DespicableVapeComponent', () => {
  let component: DespicableVapeComponent;
  let fixture: ComponentFixture<DespicableVapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespicableVapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespicableVapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
