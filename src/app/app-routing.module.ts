import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from "./services/guards/auth-guard.service";

import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

const routes: Routes = [
    { path: "", component: LoginPageComponent },
    { path: "home", canActivate: [AuthGuard], component: HomePageComponent },
    { path: "not-found", component: NotFoundPageComponent },
    { path: "**", redirectTo: "/not-found" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
