import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeAwaysComponent } from './take-aways.component';

describe('TakeAwaysComponent', () => {
  let component: TakeAwaysComponent;
  let fixture: ComponentFixture<TakeAwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeAwaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeAwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
