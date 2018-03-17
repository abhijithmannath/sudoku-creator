import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku-view',
  templateUrl: './sudoku-view.component.html',
  styleUrls: ['./sudoku-view.component.scss']
})
export class SudokuViewComponent implements OnInit {
  @Input() sMatrix;
  @Input() gStage;
  @Input() gMode;

  errorSelected =  {r:-1, c:-1 };
  selected = {r:-1, c:-1 };




  constructor() { }

  ngOnInit() {
    console.log(this.sMatrix);
  }

  selectBox(i, j) {
    console.log(i,j);
    this.selected.r = i;
    this.selected.c = j;
  }
  enterNumber(val) {
    let ele = this.sMatrix[this.selected.r][this.selected.c];

    if(ele.fixed == false) {
      let ruleRowCol = this.checkInRowColumn(val);
      let ruleBox = this.checkInBox(val);
      if(ruleRowCol.length == 0){
        if(ruleBox.length == 0) {
          ele.val = val;
          ele.fixed = this.gStage == 1;
        } else {
          this.setError(ruleBox[0],ruleBox[1]);
        }
      }else {
        this.setError(ruleRowCol[0],ruleRowCol[1]);
      }
    }

  }

  @HostListener('document:keydown', ['$event'])
  keyPress(event: KeyboardEvent){
    const keyCode = event.keyCode;
    if(keyCode >=49 && keyCode<=57){
        this.errorSelected =  {r:-1, c:-1 };
        this.applyNumOnSelection(keyCode-48)
    }
    if(keyCode >= 37 && keyCode <=40) {
      this.transverse(keyCode)
    }

  }

  transverse(dir) {
    if (dir == 37 ) {
      this.selected.r-=1;
    } else if(dir == 39) {
      this.selected.r+=1;
    } else if(dir == 38) {
      this.selected.c-=1;
    } else if(dir == 40 ) {
      this.selected.c+=1;
    }
    this.selected.r%=9;
    this.selected.c%=9;
  }

  applyNumOnSelection(num) {
    if(this.gMode ==1 || this.gStage == 1) {
      this.enterNumber(num);
    } else {
      this.enterSugg(num)
    }

  }

  enterSugg(num) {
     let ele = this.sMatrix[this.selected.r][this.selected.c];
      if(ele.sugg.has(num)) {
        ele.sugg.delete(num)
      } else {
         ele.sugg.add(num)
      }
      ele.val = 0;

  }
  checkInRowColumn(val) {
    console.log(val);
    let found = false;
    let _loc = [-1,-1];
    for (let i=0;i<9;i++) {
      if(i != this.selected.c && this.sMatrix[this.selected.r][i].val == val) {
        _loc = [this.selected.r,i];
        found = true;
        break;

      }
      if(i != this.selected.r && this.sMatrix[i][this.selected.c].val == val) {
          _loc = [i,this.selected.c];
          found = true;
          break;
      }
    }
    console.log(found);
    if (found) {
      return _loc;
    } else {
      return []
    }


  }
  checkInBox(val) {
    let bRow = Math.floor(this.selected.r/3.0);
    let bCol = Math.floor(this.selected.c/3.0);

    let bBoundRowL = (bRow)*3;
    let bBoundRowU = (bRow+1) * 3 - 1;
    let bBoundColL = (bCol)*3;
    let bBoundColU = (bCol+1) * 3 - 1;
    // alert([bBoundRowL, bBoundRowU, bBoundColU, bBoundColL].join(','));
    for(let i=bBoundRowL ;i<=bBoundRowU; i++) {
      for(let j=bBoundColL ;j<=bBoundColU; j++) {
        if (this.sMatrix[i][j].val == val ){
            if(i!=this.selected.r || j!=this.selected.c ) {
                return [i,j]
            }
        }
      }
    }
    return [];
  }

  setError(r,c) {
      this.errorSelected.r = r;
      this.errorSelected.c = c;
  }
}
