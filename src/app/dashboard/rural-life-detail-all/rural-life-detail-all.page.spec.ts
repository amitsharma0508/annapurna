import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RuralLifeDetailAllPage } from './rural-life-detail-all.page';

describe('RuralLifeDetailAllPage', () => {
  let component: RuralLifeDetailAllPage;
  let fixture: ComponentFixture<RuralLifeDetailAllPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RuralLifeDetailAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RuralLifeDetailAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
