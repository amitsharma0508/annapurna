import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigaretComponent } from './cigaret.component';

describe('CigaretComponent', () => {
  let component: CigaretComponent;
  let fixture: ComponentFixture<CigaretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CigaretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CigaretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
