import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanPage } from './edit-plan.page';

describe('EditPlanPage', () => {
  let component: EditPlanPage;
  let fixture: ComponentFixture<EditPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
