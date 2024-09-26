import { Component, OnInit } from '@angular/core';
import { AllService } from '../all.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent  {
  empresa = {
    NombreComercial: '',
    RazonSocial: '',
    Telefono: '',
    Email: '',
    NIT: '',
    Estado: '',
    Direccion: '',

  }
  id = 0

  responseData = []

  constructor(
    private allService: AllService,
    private router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];

      this.getProject(this.id);
    })
  }

  getProject(id: any) {
    this.allService.getProject(id).subscribe(
      (Response: any) => {
        this.empresa = Response[0]
      },
      err => {
        console.log({ err });
        Swal.fire({
          title: "Error",
          text: err['message'],
          icon: "error",
          timer: 2500
        })
      }
    )
  }
}
