import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsListDialogComponent } from './ds-list-dialog.component';

describe('DsListDialogComponent', () => {
  let component: DsListDialogComponent;
  let fixture: ComponentFixture<DsListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
