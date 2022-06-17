import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserService } from "../../services/user.service";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    hide = true;
    constructor(private formBuilder: FormBuilder, private userService: UserService) {
        this.loginForm = this.formBuilder.group({
            login: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    ngOnInit(): void {
        return;
    }

    onSubmitLoginForm() {
        const { login, password } = this.loginForm.value;
        // TODO: hash password and login to be decrypted by backend
        this.userService.loginCall(login, password);
    }
}

