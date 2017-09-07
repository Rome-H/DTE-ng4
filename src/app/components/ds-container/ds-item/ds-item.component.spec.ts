import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsItemComponent } from './ds-item.component';

describe('DsItemComponent', () => {
  let component: DsItemComponent;
  let fixture: ComponentFixture<DsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
