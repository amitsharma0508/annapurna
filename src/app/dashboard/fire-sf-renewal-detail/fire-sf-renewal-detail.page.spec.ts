import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FireSfRenewalDetailPage } from './fire-sf-renewal-detail.page';

describe('FireSfRenewalDetailPage', () => {
  let component: FireSfRenewalDetailPage;
  let fixture: ComponentFixture<FireSfRenewalDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FireSfRenewalDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FireSfRenewalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
