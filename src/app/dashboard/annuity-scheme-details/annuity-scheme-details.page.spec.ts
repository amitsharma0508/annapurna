import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnnuitySchemeDetailsPage } from './annuity-scheme-details.page';

describe('AnnuitySchemeDetailsPage', () => {
  let component: AnnuitySchemeDetailsPage;
  let fixture: ComponentFixture<AnnuitySchemeDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnuitySchemeDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnuitySchemeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
