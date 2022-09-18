import { SignIn, SignUp } from './../../store/actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, OnDestroy {
  isSignIn: boolean;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loading: boolean = false;
  paramSub: Subscription;
  constructor(
    private readonly fb: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private readonly store:Store
  ) {
    this.isSignIn = true;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      mail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
    this.signupForm = this.fb.group(
      {
        mail: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        name: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        isAdmin: [false, [Validators.required]],
      },
      {
        validator: this.confirmedValidator('password', 'confirmPassword'),
      }
    );
    this.paramSub = this.activeRoute.params.subscribe((params) => {
      this.isSignIn = params.type === 'signin';
    });
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  doSignIn() {
    const {mail,password} = this.loginForm.value;
    this.store.dispatch(SignIn({mail,password}));
  }

  doSignup() {
    const {mail,password,confirmPassword,isAdmin} = this.signupForm.value;
    this.store.dispatch(SignUp({mail,password,confirmPassword,isAdmin}));
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }
}
