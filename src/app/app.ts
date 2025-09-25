import { Component, computed, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tpAngularFinal');
   isLoggedIn: Signal<Boolean> = signal(false);

  connectedUserEmail = computed(()=>{
    const user=this.userService.connectedUser();
    return user ? user.email : null; 
  }) 


  constructor(private readonly userService: Auth){
    console.log(this.isLoggedIn());    
  }    
}
