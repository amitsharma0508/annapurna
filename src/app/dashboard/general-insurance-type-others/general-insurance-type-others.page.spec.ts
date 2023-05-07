import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralInsuranceTypeOthersPage } from './general-insurance-type-others.page';

describe('GeneralInsuranceTypeOthersPage', () => {
  let component: GeneralInsuranceTypeOthersPage;
  let fixture: ComponentFixture<GeneralInsuranceTypeOthersPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInsuranceTypeOthersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInsuranceTypeOthersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
