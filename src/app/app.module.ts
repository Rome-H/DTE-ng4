import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { routing } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// External libs
import { DragulaModule } from 'ng2-dragula';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// App internal components
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './components/ds-container/form-builder/form-builder.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DsContainerComponent } from './components/ds-container/ds-container.component';
import { DsListComponent } from './components/ds-container/ds-list/ds-list.component';
import { DsItemComponent } from './components/ds-container/ds-item/ds-item.component';

// App internal services
import { DataTableService } from './services/data-table/data-table.service';
import { AuthService } from './services/auth/auth.service';
import { InterceptorService } from './services/interceptors/interceptor.service';
import { FirebaseService } from './services/firebase/firebase.service';
import { UserService } from './services/user-service/user.service';

// Environment variables
import { firebaseConfig } from '../environments/environment';

import { AppInitResolve } from './services/resolvers/app-init.resolve';
import { EditResolve } from './services/resolvers/edit.resolve';

import { LockGuard } from './services/guards/lock.guard';




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
    FormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing
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
    },
    FirebaseService,
    UserService,
    AppInitResolve,
    EditResolve,
    LockGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
