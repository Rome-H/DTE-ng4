import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App external modules
import {DragulaModule} from 'ng2-dragula';

// App internal components
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DsContainerComponent } from './components/ds-container/ds-container.component';
import { DsListComponent } from './components/ds-container/ds-list/ds-list.component';
import { DsItemComponent } from './components/ds-container/ds-item/ds-item.component';



@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    NavbarComponent,
    DsContainerComponent,
    DsListComponent,
    DsItemComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
