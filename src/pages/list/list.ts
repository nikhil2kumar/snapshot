import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  slider1:number;
  slider2:number;
  slider3:number;
  slider4:number;
  slider5:number;

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
  //private dimensionRatings: number[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.slider1 = 0.2;
    this.slider2 = 0.2;
    this.slider3 = 0.2;
    this.slider4 = 0.2;
    this.slider5 = 0.2;

    this.DEG_RAD = Math.PI / 180;
    this.ratings = [];
    //this.dimensionRatings = [];
  }

  ngOnInit(){
    this.setRatings();
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerWidth;
    //this.canvas.nativeElement.height = document.getElementsByTagName("canvas")[0].getBoundingClientRect().width;
    this.calcConstant();
    this.createPolygon();
  }

  setRatings = () => {
    this.ratings= [];
    this.ratings.push(this.slider1, this.slider2, this.slider3, this.slider4, this.slider5);

    for(let i = 0 ; i < 5 ; i++){
      if(this.ratings[i] == 0){
        this.ratings[i] = 0.2;
      }
    }
  }

  modifySliders = () => {
    this.slider1 = this.ratings[0];
    this.slider2 = this.ratings[1];
    this.slider3 = this.ratings[2];
    this.slider4 = this.ratings[3];
    this.slider5 = this.ratings[4];
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

      this.calcCoordinates();
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

  calcCoordinates = () => {
    this.xPos1 = (this.ratings[0] * this.X1CONST + this.x).toFixed(2);
    this.yPos1 = (this.ratings[0] * this.Y1CONST + this.y).toFixed(2);

    this.xPos2 = (this.ratings[1] * this.X2CONST + this.x).toFixed(2);
    this.yPos2 = (this.ratings[1] * this.Y2CONST + this.y).toFixed(2);

    this.xPos3 = (this.ratings[2] * this.X3CONST + this.x).toFixed(2);
    this.yPos3 = (this.ratings[2] * this.Y3CONST + this.y).toFixed(2);

    this.xPos4 = (this.ratings[3] * this.X4CONST + this.x).toFixed(2);
    this.yPos4 = (this.ratings[3] * this.Y4CONST + this.y).toFixed(2);

    this.xPos5 = (this.ratings[4] * this.X5CONST + this.x).toFixed(2);
    this.yPos5 = (this.ratings[4] * this.Y5CONST + this.y).toFixed(2);

  }

  OnChange = (ev) => {
    this.setRatings();
    this.createPolygon();
  }

  changeCanvasRating = (event) => {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
    
    // Canvas element and bitmap are of different size hence getting the scale ratio
    let scaleX = this.canvas.nativeElement.width / rect.width;
    let scaleY = this.canvas.nativeElement.height / rect.height;
    let x0 = ((event.center.x - rect.left) * scaleX) - this.x;
    let y0 = ((event.center.y - rect.top) * scaleY) - this.y;

    let angle = Math.atan2(-y0, x0)*180 / Math.PI;

    angle < 0 ? angle+=360 : angle;

    if(angle < 54 || angle > 342){
      let i1 = x0 / this.X1CONST;
      if(i1 < 0.25){
        i1 = 0;
      } else if(i1 > 5){
        i1 = 5;
      } else{
        i1 = Math.ceil(i1);
      }
      this.ratings[0] != i1 ? this.ratings[0] = i1 : this.ratings[0];

    } else if(angle < 126 && angle > 54){
      let i2 = y0 / this.Y2CONST;
      if(i2 < 0.25){
        i2 = 0;
      } else if(i2 > 5){
        i2 = 5;
      } else{
        i2 = Math.ceil(i2);
      }
      this.ratings[1] != i2 ? this.ratings[1] = i2 : this.ratings[1];

    } else if(angle < 198 && angle > 126){
      let i3 = x0 / this.X3CONST;
      if(i3 < 0.25){
        i3 = 0;
      } else if(i3 > 5){
        i3 = 5;
      } else{
        i3 = Math.ceil(i3);
      }
      this.ratings[2] != i3 ? this.ratings[2] = i3 : this.ratings[2];

    } else if(angle < 270 && angle > 198){
      let i4 = y0 / this.Y4CONST;
      if(i4 < 0.25){
        i4 = 0;
      } else if(i4 > 5){
        i4 = 5;
      } else{
        i4 = Math.ceil(i4);
      }
      this.ratings[3] != i4 ? this.ratings[3] = i4 : this.ratings[3];

    } else if(angle < 342 && angle > 270){
      let i5 = y0 / this.Y5CONST;
      if(i5 < 0.25){
        i5 = 0;
      } else if(i5 > 5){
        i5 = 5;
      } else{
        i5 = Math.ceil(i5);
      }
      this.ratings[4] != i5 ? this.ratings[4] = i5 : this.ratings[4];
    }

    this.modifySliders();
    this.createPolygon();
  }

  touchEv = (event) =>{
    //console.log(event);
  }

  touchEv1 = (event) =>{
    //console.log(event);
  }

}
