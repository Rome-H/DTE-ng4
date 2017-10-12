import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DataTableService } from '../../../services/data-table/data-table.service';
import { FormBuilderService } from '../../../services/form-builder/form-builder.service';

@Component({
  selector: 'q9-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  // array of items to drag
  public itemsToDrop: Array<Object>;
  editMode = false;

  constructor( private dragulaService: DragulaService,
               private dataTableService: DataTableService,
               private formBuilderService: FormBuilderService) {
    this.dataTableService.editMode()
    .subscribe((res) => {
      this.editMode = res;
    });
    this.editMode = this.dataTableService.edit;
    this.dragulaService.setOptions('form-builder-dnd', {
      // remove div when dragged off the container
      removeOnSpill: false,
      // copy the dragged items into drop model -
      // which prevents them from being removed from the left panel
      copy: function (el, source) {
        return source.className.indexOf('can_move') !== -1;
      },
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag'),
      accepts: function (el, source) {
        return source.className.indexOf('can_move') === -1;
      }
    });
  }

  ngOnInit() {
    this.itemsToDrop = this.formBuilderService.itemsToDrop;
  }
}
