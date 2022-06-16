import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { MatTabsModule } from "@angular/material/tabs";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./services/guards/auth-guard.service";
import { HttpHeadersInterceptor } from "./interceptors/http-headers.interceptors";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

import { HeaderComponent } from "./components/header/header.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, LoginPageComponent, NotFoundPageComponent],
    imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, MatTabsModule],
    providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
