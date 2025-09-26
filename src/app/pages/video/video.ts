import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '../../interfaces/nasa-api';
import { NAPOD } from '../../services/napod';

@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.html',
  styleUrl: './video.css'
})
export class Video {
  private route = inject(ActivatedRoute)
  asset=signal<Collection|null>(null);
  //TODO: nom de merde pour le service a changer
  private nasaApi: NAPOD = inject(NAPOD)
  
  ngOnInit(){
    const nasaId=this.route.snapshot.params['id'];

    this.nasaApi.getAssetDetail(nasaId).subscribe({
      next: (data)=>{
        this.asset.set(data.collection);
        console.log(this.asset());
        
      },
      error: error =>{
        console.log(error);        
      }
    })
  }



}
