import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderIntroComponent } from './reader-intro.component';

describe('ReaderIntroComponent', () => {
  let component: ReaderIntroComponent;
  let fixture: ComponentFixture<ReaderIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
