import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

/* Feature Modules */
import { ProductsModule } from './products/products.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    // HttpClientModule,
    HttpModule,
    ProductsModule,
    UserModule,
    AppRoutingModule,
    MessagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
