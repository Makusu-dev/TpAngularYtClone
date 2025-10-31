import { Component, inject, Signal, signal } from '@angular/core';
import { User, UserToRegister } from '../../interfaces/user';
import { FormGroup, FormBuilder, Validator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {  
  registerForm: FormGroup;
  errorMessage = signal('');
  
  constructor(
    private readonly userService: Auth,
    private readonly router: Router,
    private fb: FormBuilder) {   
      this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pseudo:['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      passwordConfirm: ['', Validators.required],
      cityCode: ['', Validators.required],
      city:['',Validators.required],
      phone: ['',Validators.required]
    }); 
  }

  async OnSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage.set('Veuillez remplir tous les champs correctement.');
      return;
    }

    const user: UserToRegister = this.registerForm.value;    
    //appel au service register   
      try{
        const registerSuccess: boolean = await firstValueFrom(this.userService.register(user))
        if(registerSuccess){
          this.router.navigate(['/login']);
        }
        else{
          this.errorMessage.set('Une erreur est survenue');
        }
      }catch(error){
        console.error('Erreur lors de l\'inscription:', error);
        this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
      }; 
  }

   
}
