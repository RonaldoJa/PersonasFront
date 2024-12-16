import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HomeService]
})
export default class HomeComponent implements OnInit{

  personsUser: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  addPersonForm: FormGroup; 
  isLoading = false;
  isModalOpen = false;

  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addPersonForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoIdentificacion: ['', Validators.required],
      usuario: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.getDataPersonUser();
  }

  getDataPersonUser() {
    this.homeService.getPersonUser().subscribe({
      next: (response) => {
        this.personsUser = response.data;
        console.log(this.personsUser);
        this.updatePagination();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.personsUser.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.personsUser.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.personsUser.length / this.itemsPerPage);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleDateString('es-ES', options).replace(',', '');
  }

  addPersonUser(): void {
    if (this.addPersonForm.valid) {
      const newPersonUser = this.addPersonForm.value;
      this.homeService.addPersonUser(newPersonUser).subscribe({
        next: (response) => {
          this.addPersonForm.reset(); 
          this.closeModal();
          alert('Persona agregada con éxito');
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al agregar persona:', error);
          alert('Hubo un error al agregar la persona');
        },
      });
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
