import { element } from 'protractor';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsItemComponent } from './ds-item.component';

describe('DsItemComponent', () => {
  let component: DsItemComponent;
  let fixture: ComponentFixture<DsItemComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsItemComponent ]
    })
    .compileComponents();
  }));

  /**
   *    class ComponentFixture {
   *        debugElement;       // test helper
   *        componentInstance;  // to access properties and methods
   *        nativeElement;      // to access DOM element
   *        detectChanges();    // trigger component change detection
   *   }
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(DsItemComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should accept and render name', () => {
    component.name = 'SpongeBob';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect(element.querySelector('.ds-item-container').innerText).toEqual('Hello ' + component.name);
    });
  });

});
