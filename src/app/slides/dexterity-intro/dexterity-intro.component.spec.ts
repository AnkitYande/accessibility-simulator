import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DexterityIntroComponent } from './dexterity-intro.component';

describe('DexterityIntroComponent', () => {
  let component: DexterityIntroComponent;
  let fixture: ComponentFixture<DexterityIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DexterityIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DexterityIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
