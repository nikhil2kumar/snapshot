import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('myCanvas') canvas: ElementRef;
  private DEG_RAD: number;
  private x: number;
  private y: number;
  private X1CONST: number;
  private X2CONST: number;
  private X3CONST: number;
  private X4CONST: number;
  private X5CONST: number;
  private Y1CONST: number;
  private Y2CONST: number;
  private Y3CONST: number;
  private Y4CONST: number;
  private Y5CONST: number;
  private xPos1: any;
  private xPos2: any;
  private xPos3: any;
  private xPos4: any;
  private xPos5: any;
  private yPos1: any;
  private yPos2: any;
  private yPos3: any;
  private yPos4: any;
  private yPos5: any;
  // private opacityTable: number[];
  private ratings: any[];
  private ratings1: number[];
  private ratings2: number[];
  private ratings3: number[];
  private ratings4: number[];
  private ratings5: number[];
  private ratings6: number[];
  private ratings7: number[];
  private ratings8: number[];
  private ratings9: number[];
  private ratings10: number[];

  constructor(public navCtrl: NavController) {
  this.DEG_RAD = Math.PI / 180;
  this.ratings1 = [5,1,4,2,2];
  this.ratings2 = [2,2,4,4,2];
  this.ratings3 = [5,2,4,1,3];
  this.ratings4 = [2,1,4,2,2];
  this.ratings5 = [3,3,5,2,2];
  this.ratings6 = [2,4,5,1,2];
  this.ratings7 = [3,5,4,2,5];
  this.ratings8 = [5,1,4,3,2];
  this.ratings9 = [4,1,4,2,5];
  this.ratings10 = [4,4,1,5,3];
  this.ratings = [];
  this.ratings.push(this.ratings1, this.ratings2, this.ratings3, this.ratings4, this.ratings4, this.ratings5, this.ratings6, this.ratings7, this.ratings8, this.ratings9, this.ratings10);

  
  };

  ngOnInit(){
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerWidth;
    this.calcConstant();
    this.createPolygon();
  }

  calcConstant = () => {
    let polygonRadius = this.canvas.nativeElement.width  / 11;
    this.X1CONST = polygonRadius * Math.cos(-18 * this.DEG_RAD);
    this.X2CONST = polygonRadius * Math.cos(-90 * this.DEG_RAD);
    this.X3CONST = polygonRadius * Math.cos(-162 * this.DEG_RAD);
    this.X4CONST = polygonRadius * Math.cos(-234 * this.DEG_RAD);
    this.X5CONST = polygonRadius * Math.cos(-306 * this.DEG_RAD);

    this.Y1CONST = polygonRadius * Math.sin(-18 * this.DEG_RAD);
    this.Y2CONST = polygonRadius * Math.sin(-90 * this.DEG_RAD);
    this.Y3CONST = polygonRadius * Math.sin(-162 * this.DEG_RAD);
    this.Y4CONST = polygonRadius * Math.sin(-234 * this.DEG_RAD);
    this.Y5CONST = polygonRadius * Math.sin(-306 * this.DEG_RAD);

  };

  createPolygon = () => {
    let context = this.canvas.nativeElement.getContext('2d');
    context.globalCompositeOperation = 'multiply';
    this.x = this.canvas.nativeElement.width / 2;
    this.y = this.canvas.nativeElement.height / 2;
    // this.calcCoordinates();
    context.clearRect(0,0,this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    context.strokeStyle = "rgba(232,229,223,1)";
    context.lineWidth = 1;

    for(let i = 1; i<=5; i++){
      context.beginPath();
      context.moveTo(this.x,this.y);
      context.lineTo((i * this.X1CONST + this.x).toFixed(2),(i * this.Y1CONST + this.y).toFixed(2));
      context.lineTo((i * this.X2CONST + this.x).toFixed(2),(i * this.Y2CONST + this.y).toFixed(2));
      context.lineTo(this.x, this.y);
      context.moveTo((i * this.X2CONST + this.x).toFixed(2),(i * this.Y2CONST + this.y).toFixed(2));
      context.lineTo((i * this.X3CONST + this.x).toFixed(2),(i * this.Y3CONST + this.y).toFixed(2));
      context.lineTo(this.x, this.y);
      context.moveTo((i * this.X3CONST + this.x).toFixed(2),(i * this.Y3CONST + this.y).toFixed(2));
      context.lineTo((i * this.X4CONST + this.x).toFixed(2),(i * this.Y4CONST + this.y).toFixed(2));
      context.lineTo(this.x, this.y);
      context.moveTo((i * this.X4CONST + this.x).toFixed(2),(i * this.Y4CONST + this.y).toFixed(2));
      context.lineTo((i * this.X5CONST + this.x).toFixed(2),(i * this.Y5CONST + this.y).toFixed(2));
      context.lineTo(this.x, this.y);
      context.moveTo((i * this.X5CONST + this.x).toFixed(2),(i * this.Y5CONST + this.y).toFixed(2));
      context.lineTo((i * this.X1CONST + this.x).toFixed(2),(i * this.Y1CONST + this.y).toFixed(2));
      context.lineTo(this.x, this.y);
      context.stroke();
      context.closePath();
    }

    for(let i = 1; i <= 10 ; i++){
      this.calcCoordinates(this.ratings[i]);
      context.fillStyle = "rgba(255,182,0,1)";
      context.strokeStyle = "rgba(255,182,0,1)";
      context.beginPath();
      context.moveTo(this.x,this.y);
      context.moveTo(this.xPos1, this.yPos1);
      context.lineTo(this.xPos2, this.yPos2);
      context.lineTo(this.xPos3, this.yPos3);
      context.lineTo(this.xPos4, this.yPos4);
      context.lineTo(this.xPos5, this.yPos5);
      context.lineTo(this.xPos1, this.yPos1);
      context.fill();
      context.closePath();
    }    
  }

  calcCoordinates = (ratings) => {
    this.xPos1 = (ratings[0] * this.X1CONST + this.x).toFixed(2);
    this.yPos1 = (ratings[0] * this.Y1CONST + this.y).toFixed(2);

    this.xPos2 = (ratings[1] * this.X2CONST + this.x).toFixed(2);
    this.yPos2 = (ratings[1] * this.Y2CONST + this.y).toFixed(2);

    this.xPos3 = (ratings[2] * this.X3CONST + this.x).toFixed(2);
    this.yPos3 = (ratings[2] * this.Y3CONST + this.y).toFixed(2);

    this.xPos4 = (ratings[3] * this.X4CONST + this.x).toFixed(2);
    this.yPos4 = (ratings[3] * this.Y4CONST + this.y).toFixed(2);

    this.xPos5 = (ratings[4] * this.X5CONST + this.x).toFixed(2);
    this.yPos5 = (ratings[4] * this.Y5CONST + this.y).toFixed(2);

  }

}
