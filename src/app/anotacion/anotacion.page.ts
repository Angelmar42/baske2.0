import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


let alphas:string[];
let betas:string[];
let nombre1:any;
let nombre2:any;
let iniciales: string[];
iniciales=["warriors","pinguinos"]
@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.page.html',
  styleUrls: ['./anotacion.page.scss'],
})
export class AnotacionPage implements OnInit {
  a:any;
  local: number = 0;
  faltaslocal: number = 0;
  visitante: number = 0;
  faltasvisitante: number =0;
  equipo1: any;
  equipo2:any;
  nombre: any;
  tiempo: Date;
  maxTime: any=0;
  timer: any;

  
  b:any;
  
  c:any;
  d:any;
  auxiliar:any;
  elegido: number;
  cambio: number=0;
  z: any;
  Valor: string="1";
    
  constructor(public alertController: AlertController, public actionSheetController: ActionSheetController, public actionSheetController2: ActionSheetController) { }
  
  
  

  async presentActionSheet(equipo,jugador) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: '+1',
        icon: 'Basketball',
        id: 'delete-button',
        data: {
          txype: 'delete'
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
      },
      {
        text: 'Rebote',
        icon: 'Basketball',
        data: 'Data value',
        handler: () => {
          if (equipo==0) 
          {
            this.equipo1[jugador]['reb']+=1;
          }
          if (equipo==1) 
          {
            this.equipo2[jugador]['reb']+=1;
          }
          
        }
      },
      {
        text: 'Asistencia',
        icon: 'Basketball',
        data: 'Data value',
        handler: () => {
          if (equipo==0) 
          {
            this.equipo1[jugador]['ast']+=1;
          }
          if (equipo==1) 
          {
            this.equipo2[jugador]['ast']+=1;
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
          if(this.faltaslocal==4){this.acumulados(equipo);}
          if(this.faltaslocal>4){this.bonus(equipo);}
          if(this.equipo1[jugador]['faltas']==4){this.faltas(equipo,jugador);}
          if(this.equipo1[jugador]['faltas']==5){this.Expulsado(equipo,jugador);}
          }
          if (equipo==1) 
          {
            
            this.faltasvisitante +=1;
            this.equipo2[jugador]['faltas']+=1;
            if(this.faltasvisitante==4){this.acumulados(equipo);}
            if(this.faltasvisitante>4){this.bonus(equipo);}
            if(this.equipo2[jugador]['faltas']==4){this.faltas(equipo,jugador);}
            if(this.equipo2[jugador]['faltas']==5){this.Expulsado(equipo,jugador);}
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
    
    
    fetch('./assets/equipos/'+iniciales[0]+'.json').then(res => res.json())
    .then(json => {
      nombre1=json['Equipo']
      this.c = json['Jugadores']
      betas=[this.c[5],this.c[6],this.c[7],this.c[8],this.c[9]];
      this.d=[this.c[0],this.c[1],this.c[2],this.c[3],this.c[4]]
      this.equipo1 =this.d;


    });
    fetch('./assets/equipos/'+iniciales[1]+'.json').then(res => res.json())
    .then(json => {
      nombre2=json['Equipo']
      this.a=json['Jugadores']   
      alphas=[this.a[5],this.a[6],this.a[7],this.a[8],this.a[9]];
      this.b=[this.a[0],this.a[1],this.a[2],this.a[3],this.a[4]]
      this.equipo2 =this.b;


    });



  }
  segmentChanged(event:CustomEvent){
    this.Valor=event.detail.value;
  }

  tiempoTiro(a){

    this.maxTime=a;
    this.timer = setTimeout(x => 
      {
          
          if(this.maxTime>0){
            this.maxTime -= 1;
            this.tiempoTiro(this.maxTime);
          }

      }, 1000);

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

  async acumulados(equipo) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Acumulados',
      message: nombreequipo(equipo),
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
   
  }
  async bonus(equipo) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Tiros libres por acumulados',
      message: 'Hay tiros por acumulados',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
   
  }
  async faltas(equipo,jugador) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Faltas personales',
      message: "Jugador con 4 faltas",
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
   
  }
  async Expulsado(equipo,jugador) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Expulsado',
      message: "Jugador expulsado",
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
   
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



function nombreequipo(equipo) {
  if (equipo ==0){
    return (nombre1)

  }

  if (equipo ==1){
    return (nombre2)
  }

  


}



