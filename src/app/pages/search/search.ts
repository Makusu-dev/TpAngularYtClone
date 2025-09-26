import { Component, inject, signal } from '@angular/core';
import { NAPOD } from '../../services/napod';
import { NasaApi } from '../../interfaces/nasa-api';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  private nasaApi = inject(NAPOD)
  searchResults = signal<NasaApi | null>(null)
}
