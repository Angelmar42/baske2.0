import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
let a:any;
let alphas:string[];
let betas:string[];


@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.page.html',
  styleUrls: ['./anotacion.page.scss'],
})
export class AnotacionPage implements OnInit {
  local: number = 0;
  faltaslocal: number = 0;
  visitante: number = 0;
  faltasvisitante: number =0;
  equipo1: any;
  equipo2:any;
  nombre: any;
 
  
  b:any;
  
  c:any;
  d:any;
  auxiliar:any;
  elegido: number;
  cambio: number=0;
  z: any;
  
  constructor(public actionSheetController: ActionSheetController, public actionSheetController2: ActionSheetController) { }
  
  
  async presentActionSheet(equipo,jugador) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: '+1',
        icon: 'Basketball',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          if (equipo==0) 
          {
            this.local += 1;
            this.equipo1[jugador]['pts']+=1;
          }
          if (equipo==1) 
          {
            this.visitante +=1;
            this.equipo2[jugador]['pts']+=1;
          }        
        }
      }, {
        text: '+2',
        icon: 'Basketball',
        data: 10,
        handler: () => {
          if (equipo==0) 
          {
            this.local += 2;
            this.equipo1[jugador]['pts']+=2;
          }
          if (equipo==1) 
          {
            this.visitante +=2;
            this.equipo2[jugador]['pts']+=2;
          }
        }
      }, {
        text: '+3',
        icon: 'Basketball',
        data: 'Data value',
        handler: () => {
          if (equipo==0) 
          {
            this.local += 3;
            this.equipo1[jugador]['pts']+=3;
          }
          if (equipo==1) 
          {
            this.visitante +=3;
            this.equipo2[jugador]['pts']+=3;
          }
          
        }
      }, {
        text: 'Falta',
        role: 'destructive',
        icon: 'Basketball',
        handler: () => {
          if (equipo==0) 
          {
            this.faltaslocal += 1;
            this.equipo1[jugador]['faltas']+=1;
          }
          if (equipo==1) 
          {
            this.faltasvisitante +=1;
            this.equipo2[jugador]['faltas']+=1;
          }
          
        }
      }, {
        text: 'Cambio',
        icon: 'infinite',
        handler: () => {

        this.cambios(equipo,jugador);
          
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }
    ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();

    
  }

  
  ngOnInit() {
    
    fetch('./assets/equipos/nets.json').then(res => res.json())
    .then(json => {
      this.c = json['Jugadores']
      betas=[this.c[5],this.c[6],this.c[7],this.c[8],this.c[9]];
      this.d=[this.c[0],this.c[1],this.c[2],this.c[3],this.c[4]]
      this.equipo1 =this.d;


    });
    fetch('./assets/equipos/warriors.json').then(res => res.json())
    .then(json => {
      a=json['Jugadores']   
      
      

      alphas=[a[5],a[6],a[7],a[8],a[9]];
      this.b=[a[0],a[1],a[2],a[3],a[4]]
      this.equipo2 =this.b;


    });


  }
  async cambios(equipo,jugador) {

    const actionSheet2 = await this.actionSheetController2.create(
    
      {
      header: 'Banca',
      cssClass: 'my-custom-class',
      buttons: [
      {
        
        text: name(equipo,0),
        icon: 'accessibility',
        handler: () => {
          this.elegido=0;
          if (equipo==0){ 
            this.auxiliar=[this.d[jugador],betas[this.elegido]];
            this.d[jugador]=this.auxiliar[1];
         
            if (this.elegido==0){
              betas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              betas[this.elegido]=this.auxiliar[0];
            }}
          if (equipo==1){ 
            this.auxiliar=[this.b[jugador],alphas[this.elegido]];
            this.b[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              alphas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              alphas[this.elegido]=this.auxiliar[0];
            }
            this.auxiliar=[];}
          
          
        }
        
      },
      {
        text: name(equipo, 1),
        icon: 'accessibility',
        handler: () => {
           
          this.elegido=1;
          if (equipo==0){ 
            this.auxiliar=[this.d[jugador],betas[this.elegido]];
            this.d[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              betas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              betas[this.elegido]=this.auxiliar[0];
            }}
          if (equipo==1){ 
            this.auxiliar=[this.b[jugador],alphas[this.elegido]];
            this.b[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              alphas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              alphas[this.elegido]=this.auxiliar[0];
            }
            this.auxiliar=[];}
          
          
        }
      },
      {
        
        text: name(equipo,2),
        icon: 'accessibility',
        handler: () => {
          this.elegido=2;
          if (equipo==0){ 
            this.auxiliar=[this.d[jugador],betas[this.elegido]];
            this.d[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              betas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              betas[this.elegido]=this.auxiliar[0];
            }}
          if (equipo==1){ 
            this.auxiliar=[this.b[jugador],alphas[this.elegido]];
            this.b[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              alphas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              alphas[this.elegido]=this.auxiliar[0];
            }
            this.auxiliar=[];}
          
          
        }
        
      },
      {
        
        text: name(equipo,3),
        icon: 'accessibility',
        handler: () => {
          this.elegido=3;
          if (equipo==0){ 
            this.auxiliar=[this.d[jugador],betas[this.elegido]];
            this.d[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              betas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              betas[this.elegido]=this.auxiliar[0];
            }}
          if (equipo==1){ 
            this.auxiliar=[this.b[jugador],alphas[this.elegido]];
            this.b[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              alphas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              alphas[this.elegido]=this.auxiliar[0];
            }
            this.auxiliar=[];}
          
          
        }
        
      },
      {
        
        text: name(equipo,4),
        icon: 'accessibility',
        handler: () => {
          this.elegido=4;
          if (equipo==0){ 
            this.auxiliar=[this.d[jugador],betas[this.elegido]];
            this.d[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              betas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              betas[this.elegido]=this.auxiliar[0];
            }}
          if (equipo==1){ 
            this.auxiliar=[this.b[jugador],alphas[this.elegido]];
            this.b[jugador]=this.auxiliar[1];
            if (this.elegido==0){
              alphas[0]=(this.auxiliar[0])  
            }
            if (this.elegido >0){
              alphas[this.elegido]=this.auxiliar[0];
            }
            this.auxiliar=[];}
          
          
        }
        
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }

    ]
    });


    await actionSheet2.present();

    const { role, data } = await actionSheet2.onDidDismiss();
    

    
}


}


function name(equipo, jugador) {
  if (equipo ==0){
    return ("#"+betas[jugador]['numero']+" "+betas[jugador]['name'])

  }

  if (equipo ==1){
    return ("#"+alphas[jugador]['numero']+" "+alphas[jugador]['name'])

  }

}


