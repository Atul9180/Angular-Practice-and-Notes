import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormArrayComponent } from './reactive-form-array.component';

describe('ReactiveFormArrayComponent', () => {
  let component: ReactiveFormArrayComponent;
  let fixture: ComponentFixture<ReactiveFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactiveFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
