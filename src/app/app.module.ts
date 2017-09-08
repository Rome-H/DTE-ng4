import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

// App external modules
import {DragulaModule} from 'ng2-dragula';
import {HttpModule} from '@angular/http';

// App internal components
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DsContainerComponent } from './components/ds-container/ds-container.component';
import { DsListComponent } from './components/ds-container/ds-list/ds-list.component';
import { DsItemComponent } from './components/ds-container/ds-item/ds-item.component';

// App internal services
import { DataTableService } from './services/data-table/data-table.service';

import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './services/auth/auth.service';
import {InterceptorService} from './services/interceptors/interceptor/interceptor.service';




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
    DragulaModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    DataTableService,
    HttpClient,
    CookieService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
