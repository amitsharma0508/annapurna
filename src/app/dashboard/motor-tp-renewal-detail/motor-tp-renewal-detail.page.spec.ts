import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MotorTpRenewalDetailPage } from './motor-tp-renewal-detail.page';

describe('MotorTpRenewalDetailPage', () => {
  let component: MotorTpRenewalDetailPage;
  let fixture: ComponentFixture<MotorTpRenewalDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorTpRenewalDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MotorTpRenewalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
