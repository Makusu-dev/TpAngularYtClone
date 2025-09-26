import { Component, inject, signal } from '@angular/core';
import { NAPOD } from '../../services/napod';
import { Picture } from '../../interfaces/picture';

@Component({
  selector: 'app-potd',
  imports: [],
  templateUrl: './potd.html',
  styleUrl: './potd.css'
})
export class POTD {

  private nasaApi = inject(NAPOD)
  nasaPOTD = signal< Picture | null >(null)
  
  constructor(){
    this.nasaApi.getPicOfToday().subscribe({
      next: (data)=>{
        console.log(data)
        this.nasaPOTD.set(data)
      },
      error: error =>{
        console.log(error);        
      }
    }      
  )
  }

}
