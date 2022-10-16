import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DexterityMouseComponent } from './dexterity-mouse.component';

describe('DexterityMouseComponent', () => {
  let component: DexterityMouseComponent;
  let fixture: ComponentFixture<DexterityMouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DexterityMouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DexterityMouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
