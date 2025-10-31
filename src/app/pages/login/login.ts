import { Component, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = signal('');
  password = signal('');
  errorMessage = signal('');
  // userToConnect: Signal<User>=signal<User>({email:"",password:""});
  // private readonly userService: Userlogin = inject(Userlogin);

  constructor(private readonly userService: Auth, private readonly router: Router){
  }

  async login() {
    const userToConnect : User = {email: this.email(), password: this.password(),roles: []}
    try{
        const loginSuccess =await firstValueFrom(this.userService.login(userToConnect));
        if(loginSuccess){
      this.router.navigate(['/profile']);
    }
    else {
      this.errorMessage.set('Email ou mot de passe incorrect');
    }
    }catch (error) {
    console.error('Erreur lors du login:', error);
    this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
  }
    
  }

  updateEmail(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email.set(target.value);
  }

  updatePassword(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password.set(target.value);
  }

}
