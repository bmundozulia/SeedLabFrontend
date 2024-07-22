import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../../servicios/alert.service';
import { AuthService } from '../../../servicios/auth.service';

import { Login } from '../../../Modelos/login.modelo';
import { User } from '../../../Modelos/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService, AlertService]
})
export class LoginComponent implements OnInit {
    hide = true;
    reply: Login | null = null;
    token: string | null = null;
    user: User | null = null;
    currentRolId: string | null = null;
    isSubmitting = false;

    loginForm = this.fb.group({
        email: '',
        password: '',
    });

    constructor(
        private loginService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private alertService: AlertService

    ) { }

    ngOnInit(): void {
        this.validateToken();
    }

    validateToken(): void {
        if (!this.token) {
            this.token = localStorage.getItem("token");
            let identityJSON = localStorage.getItem('identity');

            if (identityJSON) {
                let identity = JSON.parse(identityJSON);
                this.user = identity;
                this.currentRolId = this.user.id_rol?.toString();
            }
        }
        if (!this.token) {
            this.router.navigate(['/login']);
        } else {
            if (this.currentRolId) {
                switch (this.currentRolId) {
                    case '1':
                        this.router.navigate(['list-aliados']);
                        break;
                    case '2':
                        this.router.navigate(['home']);
                        break;
                    case '3':
                        this.router.navigate(['list-asesores']);
                        break;
                    case '4':
                        this.router.navigate(['home']);
                        break;
                    case '5':
                        this.router.navigate(['list-empresa/']);
                        break;
                    default:
                        this.router.navigate(['home']);
                        break;
                }
            } else {
                console.error('Id de rol no está definido.');
                this.router.navigate(['/home']);
            }
        }
    }

    login(): void {
        if (this.isSubmitting) {
            return;
        }
        this.isSubmitting = true;

        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password')?.value;

        if (!email) {
            this.alertService.errorAlert('Error', "El campo de usuario es requerido");
            this.isSubmitting = false;
            return;
        }
        if (!password) {
            this.alertService.errorAlert('Error', "el campo de contraseña es requerido");
            this.isSubmitting = false;
            return;
        }
        this.loginService.login(email, password).subscribe(
            (rs: any) => {
                this.reply = rs;
                if (this.reply) {
                    localStorage.setItem('token', this.reply.access_token);
                    localStorage.setItem('identity', JSON.stringify(this.reply.user));
                    localStorage.setItem('currentRolName', this.getRoleName(this.reply.user.id_rol));
                    this.token = this.reply.access_token;
                    console.log(this.token);
                    if (this.reply.user.emprendedor) {
                        localStorage.setItem('documento', this.reply.user.emprendedor.documento);
                    }
                    this.alertService.successAlert('Exito', 'Inicio de sesión exitoso');
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }
                this.isSubmitting = false;
            },
            err => {
                console.error(err);
                if (err.status === 401) {
                    this.alertService.errorAlert('Error', err.error.message);
                } else if (err.status === 404) {
                    this.alertService.errorAlert('Error', err.error.message);
                }
                if (err.status === 409) {
                    this.router.navigate(['/verification'], { queryParams: { email: email } });
                }
                setTimeout(() => {
                    this.isSubmitting = false;
                }, 2000);
            }
        );
    }

    getRoleName(rolId: number | undefined | null): string {
        switch (rolId) {
            case 1:
                return 'SuperAdministrador';
            case 2:
                return 'Orientador';
            case 3:
                return 'Aliado';
            case 4:
                return 'Asesor';
            default:
                return 'Emprendedor';
        }
    }
}
