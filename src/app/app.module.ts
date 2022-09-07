import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CustomerComponent } from './customer-section/customer/customer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { AddCustomerDialogComponent } from './customer-section/add-customer-dialog/add-customer-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireModule } from '@angular/fire/compat';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { SetTerminationComponent } from './customer-section/set-termination/set-termination.component';
import { CustomersService } from './customer-section/customers.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DeletingCustomerDialogComponent } from './customer-section/deleting-customer-dialog/deleting-customer-dialog.component';
import { EditCustomerComponent } from './customer-section/edit-customer/edit-customer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CustomerDetailsComponent } from './customer-section/customer-details/customer-details.component';
import { HelpSectionComponent } from './help-section/help-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerComponent,
    AddCustomerDialogComponent,
    SetTerminationComponent,
    DeletingCustomerDialogComponent,
    EditCustomerComponent,
    CustomerDetailsComponent,
    HelpSectionComponent,

  ],

  imports: [
    MatSliderModule,
    MatSidenavModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    AngularFirestoreModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    Ng2SearchPipeModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase), // compat API
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],

  providers: [CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
