import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorExploreComponent } from './color-explore.component';

describe('ColorExploreComponent', () => {
  let component: ColorExploreComponent;
  let fixture: ComponentFixture<ColorExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorExploreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
