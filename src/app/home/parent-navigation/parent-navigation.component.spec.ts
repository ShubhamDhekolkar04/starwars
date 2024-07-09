import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentNavigationComponent } from './parent-navigation.component';

describe('ParentNavigationComponent', () => {
  let component: ParentNavigationComponent;
  let fixture: ComponentFixture<ParentNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentNavigationComponent]
    });
    fixture = TestBed.createComponent(ParentNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
