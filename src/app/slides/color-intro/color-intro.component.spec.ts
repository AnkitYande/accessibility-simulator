import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorIntroComponent } from './color-intro.component';

describe('ColorIntroComponent', () => {
  let component: ColorIntroComponent;
  let fixture: ComponentFixture<ColorIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
