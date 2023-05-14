import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationOfVacencyComponent } from './application-of-vacency.component';

describe('ApplicationOfVacencyComponent', () => {
  let component: ApplicationOfVacencyComponent;
  let fixture: ComponentFixture<ApplicationOfVacencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationOfVacencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationOfVacencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
