import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DryGroceryComponent } from './dry-grocery.component';

describe('DryGroceryComponent', () => {
  let component: DryGroceryComponent;
  let fixture: ComponentFixture<DryGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DryGroceryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DryGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
