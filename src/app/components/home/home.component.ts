import { Component, HostListener, OnInit } from '@angular/core';
import { converMS } from '../utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stopWatchStr = '00: 00: 00';
  stopWatchRunning = false;
  stopWatchStart = Date.now();
  stopWatchInterval;
  // sMatrixMapper = (v, idx)=> {if (idx %3 == 0) {return {fixed:true, val:0, sugg:[3,4,5,6,7,8]}} else {return {fixed:false, val:0, sugg:[5,7,8]}}};

  sMatrix;
  gStage = 1;
  gMode = 1; // or 2
  savedTimeMilli = 0;

  constructor() {
    this.sMatrix = this.getEmptyArray();
  }

  ngOnInit() {
  }

  getEmptyArray() {
    let sMatrixMapper = (v, idx)=> {return {fixed:false, val:0, sugg:new Set()}};
    return Array.apply(null,Array(9)).map(()=>Array.apply(null,Array(9)).map(sMatrixMapper));
  }

  resetWatch() {
    this.resetTimer();
    this.stopWatchStr = '00: 00: 00';
    this.savedTimeMilli = 0;
  }
  resetTimer() { //both pause and reset
      clearInterval(this.stopWatchInterval);
      this.stopWatchRunning = false;
      this.savedTimeMilli = this.savedTimeMilli + (Date.now() - this.stopWatchStart);
  }
  startStopWatch() {

    if (this.stopWatchRunning) {
      this.resetTimer();
    } else {
      this.stopWatchRunning = true;
      this.stopWatchStart = Date.now();
      this.stopWatchInterval  = setInterval(()=> {
        this.stopWatchRunning = true;
        this.stopWatchStr = this.elapsedTimeStrSince();
      }, 500)
    }
  }

  elapsedTimeStrSince() {
    let mills = Date.now() - this.stopWatchStart;
    mills = mills + this.savedTimeMilli;
    return Object.values(converMS(mills)).join(': ')
  }
  createOrSolve(){
    if(this.gStage == 1) {
      this.gStage = 2;
      alert('Starting puzzle');
      this.startStopWatch();
    } else {
      this.gStage = 1;
      this.resetBoard()
    }

  }

  swapMode() {
    if(this.gMode == 1) {
      this.gMode = 2;
    } else {
      this.gMode = 1;
    }
  }


  resetBoard() {
    this.sMatrix = this.getEmptyArray();
    this.resetWatch();
  }
  resetSolutionOnly() {
    this.sMatrix = this.sMatrix.map((val)=> {return val.map((v)=> {
      if(!v.fixed)  {v.val = 0;}
      return v;
    })})
  }
}
