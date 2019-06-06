import { Component, OnInit } from '@angular/core';
import { ServiceUserService } from 'src/app/service/service-user.service';
import { UserModel } from 'src/app/model/userModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {
  user: UserModel[] = [];
  constructor( private _service: ServiceUserService) { }

  ngOnInit() {
    this.listarUser();
  }

  listarUser(){
    this._service.consultarTodas().subscribe( resp => {
      this.user = resp;
    });

  }

  eliminarUser(user: UserModel){
    this._service.deletePorId(user).subscribe(resp =>{
      console.log('elimin');
      this.listarUser();
    })
  }

}
