import { Observable, Subject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../models/user";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private user: User = {};

    userSubject = new Subject<User>();
    constructor(private httpClient: HttpClient, private routeur: Router) {
        if (localStorage.getItem("token")) {
            this.getCurrentUser().subscribe({
                next: (user: User) => {
                    Object.assign(this.user, user);
                    console.log(this.user);
                    this.emitUser();
                    // this.tweetService.getAll();
                    this.routeur.navigate(["/home"]);
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }
    }

    emitUser() {
        this.userSubject.next(this.user);
    }

    getCurrentUser(): Observable<User> {
        return this.httpClient.get<User>(`${environment.BASE_URL}/user/`);
    }

    loginCall(pseudo: string, password: string) {
        this.httpClient
            .post<User & { token: string }>(`${environment.BASE_URL}/user/login`, { pseudo, password })
            .subscribe({
                next: (obj: User & { token: string }) => {
                    if (obj.token) {
                        localStorage.setItem("token", obj.token);
                    }
                    const { pseudo, firstName, lastName, id, role } = obj;
                    Object.assign(this.user, { pseudo, firstName, lastName, id, role });
                    console.log(this.user);
                    this.emitUser();
                    // this.tweetService.getAll();
                    this.routeur.navigate(["/home"]);
                },
                error: (error) => {
                    if (error.status === 429) {
                        alert("Trop de tentatives de connections, veuillez réessayer dans 15 min... ");
                    } else {
                        alert(
                            "Désolé nous avons une erreur innattendue, veuillez réessayer après avoir recharger la page svp"
                        );
                    }
                }
            });
    }
}

