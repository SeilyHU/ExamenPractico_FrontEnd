import { Component } from '@angular/core';
import { AllService } from '../all.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Importar SweetAlert2


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  empresa = {
    NombreComercial: '',
    RazonSocial: '',
    Telefono: '',
    Email: '',
    NIT: '',
    Estado: '',
    Direccion: '',
  }

  constructor(private allService: AllService, private router: Router) { }

  onCrear() {
    this.allService.crearEmpresa(this.empresa)
      .subscribe(
        (result: any) => {
          Swal.fire({
            title: "Creado Correctamente",
            text: result['message'],
            icon: "success",
            timer: 2500
          }).then(() => this.router.navigate(['/']))

        },
        (err) => {
          console.log({ err });
          Swal.fire({
            title: "Error Creacion",
            text: err['message'],
            icon: "error",
            timer: 2500
          });
        }
      )
  }

}
