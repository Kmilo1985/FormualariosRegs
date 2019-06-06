import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserModel} from '../../model/userModel';
// import { UserServicioService} from '../../service/user-servicio.service';
import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';
// import Swal from 'sweetalert2';

import { UserModel } from '../../model/userModel';
import { ServiceUserService } from 'src/app/service/service-user.service';
import { Subscriber, Observable } from 'rxjs';
import { reject } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  user = new UserModel();
  public form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _service : ServiceUserService,
    private route: ActivatedRoute


  ) {

    this.form = this.fb.group({
      id: new FormControl(null),
      name: ['', [
                  Validators.required,
                  Validators.pattern(/^[A-Za-z0-9]+$/g)
                ],
                [ ]
    ],
      lastname: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]+$/g)
      ],[]
    ],


      telefono: ['', [
        Validators.required,
        // Validators.pattern(/^(\+|\d)[0-9]{6,10}$/)
      ],
              [
                this.validartelefono
              ]
    ],


      email: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],



    });

   }

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id'); // leer id de el URL  PARA ESO SE USA ESTE METODO

    if (id !== 'nuevo') {
      this._service.consultarPorId(id).subscribe( resp =>{
        this.user = resp;
        console.log(resp);
      });
    }

  }

  guardarUser() {
    if (this.user.id) {

      console.log(this.user);
      this._service.updateServUser(this.user).subscribe(resp =>{
        console.log('actualizo');
      })
    } else {

      console.log(this.form);
      const user = new UserModel();
  
      user.name = this.form.get('name').value;
      user.lastname = this.form.get('lastname').value;
      user.telefono = this.form.get('telefono').value;
      user.email = this.form.get('email').value;
  
      this._service.crearServUsuario(user).subscribe(resp => {
        console.log('guardo');
      })
      
    }


  }

  validarName(control: FormControl): Promise<any>|Observable<any> {
    const regex_letras =/^[A-Za-z0-9]+$/g;
    const promesa1 = new Promise(
      (resolve, reject) => {
        
        setTimeout(() => {
        
            if((regex_letras).exec(control.value)){
             console.log('respuesta beuna');
             resolve({ existe: true});
            }else{
             console.log('respuesta mala');
             resolve(null);

            }
          
        }, 2500);
      }
    )
    return promesa1;
  }


  validartelefono(control: FormControl): Promise<any>|Observable<any> {
    let solonumero = /^([0-9])*$/;
    let tel = 7;
    let cel = 10;
    let cadena = control.value;

    const promesa3  = new Promise(
      (resolve, reject)=>{


          setTimeout(() => {

            if ((solonumero).exec(control.value)) {

              if (cadena.length === tel) {
                resolve({ valido: true});
                console.log('telefono correcto 7 numeros'+ cadena.length);

                  } else if (cadena.length === cel) {

                console.log('Celuar correcto'+ cadena.length);

                  }
                  if(cadena.length !== tel && cadena.length !== cel){
                  console.log('No cumple con el tamaño requerido'+ cadena.length);
                  resolve(null);

                  }

            } else {
              console.log('no son  numeros');
          resolve(null);

            }

          }, 2500);


      }
    )
    return promesa3;
  }

  validarEmail(){}


}
