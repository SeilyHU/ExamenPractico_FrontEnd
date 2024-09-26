import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  public title: string;
  public subtitle: string;

  public resultData = []

  constructor(private allService: AllService, private router: Router) {
    this.title = 'Gestión de empresas';
    this.subtitle = 'Agrega, edita o elimina número de usuarios';
  }

  async ngOnInit() {
    await this.allService.getAllData().toPromise().then((result: any) => {
      if (result.length != 0) {
        console.log(result);

        this.resultData = result;
      } else {
        this.resultData = [];
      }

    }).catch((err) => {
      console.log(err);

    });
  }

  redirectPages(namePage: string, idPage = 0) {
    if (idPage != 0) {
      this.router.navigate([`/${namePage}/` + idPage])
    } else {
      this.router.navigate([`/${namePage}`])
    }
  }

  eliminarRegistro(id: string, result: any) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este registro?",
      text: `ID:${id}, Nombre: ${result['NombreComercial']}`,
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true
    }).then(async result => {
      if (result.isConfirmed) {
        console.log('Se elimina el registro');
        await this.allService.deleteRegister(id).subscribe((result: any) => {
          Swal.fire({
            title: "Elimina Correctamente",
            text: result['message'],
            icon: "success",
            timer: 2500
          }).then(() => window.location.reload())
        },
          (err) => {
            console.log({ err });
            Swal.fire({
              title: "Error Eliminacion",
              text: err['message'],
              icon: "error",
              timer: 2500
            });
          })
        // this.router.navigate(['/'])
      }
    })
  }

}
