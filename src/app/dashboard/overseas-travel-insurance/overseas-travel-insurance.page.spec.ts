import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverseasTravelInsurancePage } from './overseas-travel-insurance.page';

describe('OverseasTravelInsurancePage', () => {
  let component: OverseasTravelInsurancePage;
  let fixture: ComponentFixture<OverseasTravelInsurancePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverseasTravelInsurancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OverseasTravelInsurancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
