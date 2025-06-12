class Cell {
    constructor(value,possibleValues=null, i, j){
        this.value = value;
        this.possibleValues = possibleValues;
        this.i = i;
        this.j = j;
    }

    findPossibleValues(sudokuGrid) {
        if (this.value != "") {
            return null;
        }
        let possibleValues = ["1","2","3","4","5","6","7","8","9"];
        //PART ONE (Row and Column Check)
        for (let k = 0; k<9; k++) {
            let self=this;
            if (k!=this.j && possibleValues.includes(sudokuGrid[self.i][k].value)) {
                possibleValues = possibleValues.filter(function (element) {
                    return element != sudokuGrid[self.i][k].value;
                });
            }
            if (k!=this.i && possibleValues.includes(sudokuGrid[k][self.j].value)) {
                possibleValues = possibleValues.filter(function (element) {
                    return element != sudokuGrid[k][self.j].value;
                });
            }
        }
        //PART TWO (Quadrant Check)
        let boxQuadrants = locateQuadrantBounds(this.i,this.j);
        for (let m=boxQuadrants[0]; m<boxQuadrants[1]; m++) {
            for (let n=boxQuadrants[2]; n<boxQuadrants[3]; n++) {
                let self=this;
                if (sudokuGrid[m][n].value != "" && !(m==self.i && n==self.j)) {
                    if (possibleValues.includes(sudokuGrid[m][n].value)) {
                        possibleValues = possibleValues.filter(function (element) {
                            return element != sudokuGrid[m][n].value;
                        });
                    }
                }
            }
        }
        return possibleValues;
    }
}

class SodukoGrid {
    constructor(cellsArray){
        this.cellsGrid = cellsArray;
    }

    initializePossibilities(){
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                this.cellsGrid[i][j].possibleValues = this.cellsGrid[i][j].findPossibleValues(this.cellsGrid);
            }
        }
    }

    updatePossibilities () {
        let self = this;
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                if (self.cellsGrid[i][j].possibleValues != null) {
                    let possibleValues = ["1","2","3","4","5","6","7","8","9"];
                    for (let m=0; m<9; m++) {
                        //Row Section
                        if (m!=j && self.cellsGrid[i][m].value != "") {
                            possibleValues = possibleValues.filter(function (element) {
                                return element != self.cellsGrid[i][m].value;
                            });
                        }
                        //Col Section
                        if (m!=i && self.cellsGrid[m][j].value != "") {
                            possibleValues = possibleValues.filter(function (element) {
                                return element != self.cellsGrid[m][j].value;
                            });
                        }
                    }
                    //Quadrant section
                    let quadrantBounds = locateQuadrantBounds(i,j);
                    for (let x=quadrantBounds[0]; x<quadrantBounds[1]; x++) {
                        for (let y=quadrantBounds[2]; y<quadrantBounds[3]; y++) {
                            if (!(x==i && y==j) && self.cellsGrid[x][y].value != "") {
                                possibleValues = possibleValues.filter(function (element) {
                                    return element != self.cellsGrid[x][y].value;
                                });
                            }
                        }
                    }
                    //Updating Values
                    self.cellsGrid[i][j].possibleValues.forEach(function (possibility) {
                        if (!possibleValues.includes(possibility)) {
                            self.cellsGrid[i][j].possibleValues = self.cellsGrid[i][j].possibleValues.filter(function (element) {
                                return element != possibility;
                            });
                        }
                    });
                }
            }
        }
    }

    checkIfSolved(){
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                if (this.cellsGrid[i][j].value != "") {
                    continue;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    //Naked Singles Method
    method1(){
        console.log("Method 1 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                if (this.cellsGrid[i][j].value == "") {
                    if (this.cellsGrid[i][j].possibleValues.length == 1) {
                        this.cellsGrid[i][j].value = this.cellsGrid[i][j].possibleValues[0];
                        this.cellsGrid[i][j].possibleValues = null;
                        console.log(`Setting cell ${i},${j} to ${this.cellsGrid[i][j].value} by Naked Singles`);
                    }
                }
            }
        }
        self.updatePossibilities();
    }

    //Hidden Singles Method
    method2(){
        console.log("Method 2 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            let rowPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            let colPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let j=0; j<9; j++) {
                if (self.cellsGrid[j][i].possibleValues != null) {
                    self.cellsGrid[j][i].possibleValues.forEach(function (entry) {
                        colPartPossibilities[entry][0]++;
                        colPartPossibilities[entry][1].push(self.cellsGrid[j][i]);
                    });
                }
                if (self.cellsGrid[i][j].possibleValues != null) {
                    self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                        rowPartPossibilities[entry][0]++;
                        rowPartPossibilities[entry][1].push(self.cellsGrid[i][j]);
                    });
                }
            }
            for (let key in rowPartPossibilities) {
                if (rowPartPossibilities[key][0] == 1) {
                    rowPartPossibilities[key][1][0].value = key;
                    rowPartPossibilities[key][1][0].possibleValues = null;
                    console.log(`ROW : Setting cell ${rowPartPossibilities[key][1][0].i},${rowPartPossibilities[key][1][0].j} to ${key} by Hidden Singles`);
                }
                if (colPartPossibilities[key][0] == 1) {
                    colPartPossibilities[key][1][0].value = key;
                    colPartPossibilities[key][1][0].possibleValues = null;
                    console.log(`COL : Setting cell ${colPartPossibilities[key][1][0].i},${colPartPossibilities[key][1][0].j} to ${key} by Hidden Singles`);
                }
            }
            self.updatePossibilities();
        }
        [1,2,3,4,5,6,7,8,9].forEach(function (quadrant) {
            let quadrantPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            let quadrantBounds = locateQuadrantBoundsFromQuadrant(quadrant);
            for (let i=quadrantBounds[0]; i<quadrantBounds[1]; i++) {
                for (let j=quadrantBounds[2]; j<quadrantBounds[3]; j++) {
                    if (self.cellsGrid[i][j].possibleValues != null) {
                        self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                            quadrantPossibilities[entry][0]++;
                            quadrantPossibilities[entry][1].push(self.cellsGrid[i][j]);
                        });
                    }
                }
            }
            for (let key in quadrantPossibilities) {
                if (quadrantPossibilities[key][0] == 1) {
                    quadrantPossibilities[key][1][0].value = key;
                    quadrantPossibilities[key][1][0].possibleValues = null;
                    console.log(`BOX : Setting cell ${quadrantPossibilities[key][1][0].i},${quadrantPossibilities[key][1][0].j} to ${key} by Hidden Singles`);
                }
            }
            self.updatePossibilities();
        });
    }

    //Naked Pairs Method
    method3 () {
        console.log("Method 3 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                if (self.cellsGrid[i][j].possibleValues != null && self.cellsGrid[i][j].possibleValues.length == 2) {
                    //Column Section
                    for (let m=0; m<9; m++) {
                        if (m!=i && self.cellsGrid[m][j].possibleValues != null) {
                            if (arrayEqualWithoutOrder(self.cellsGrid[i][j].possibleValues, self.cellsGrid[m][j].possibleValues)) {
                                for (let n=0; n<9; n++) {
                                    if (n!=i && n!=m && self.cellsGrid[n][j].possibleValues != null) {
                                        self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                                            if (self.cellsGrid[n][j].possibleValues.includes(entry)) {
                                                self.cellsGrid[n][j].possibleValues = self.cellsGrid[n][j].possibleValues.filter(function (element) {
                                                    if (element == entry) {
                                                        console.log(`COL : Removing ${entry} from cell ${n},${j} by Naked Pairs by pair ${self.cellsGrid[i][j].possibleValues}`);
                                                    }
                                                    return element != entry;
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                    //Row Section
                    for (let m=0; m<9; m++) {
                        if (m!=j && self.cellsGrid[i][m].possibleValues != null) {
                            if (arrayEqualWithoutOrder(self.cellsGrid[i][j].possibleValues, self.cellsGrid[i][m].possibleValues)) {
                                for (let n=0; n<9; n++) {
                                    if (n!=j && n!=m && self.cellsGrid[i][n].possibleValues != null) {
                                        self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                                            if (self.cellsGrid[i][n].possibleValues.includes(entry)) {
                                                self.cellsGrid[i][n].possibleValues = self.cellsGrid[i][n].possibleValues.filter(function (element) {
                                                    if (element == entry) {
                                                        console.log(`ROW : Removing ${entry} from cell ${i},${n} by Naked Pairs by pair ${self.cellsGrid[i][j].possibleValues}`);
                                                    }
                                                    return element != entry;
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                    //Box Section
                    let boxQuadrants = locateQuadrantBounds(i,j);
                    for (let m=boxQuadrants[0]; m<boxQuadrants[1]; m++) {
                        for (let n=boxQuadrants[2]; n<boxQuadrants[3]; n++) {
                            if (!(m==i && n==j) && self.cellsGrid[m][n].possibleValues != null) {
                                if (arrayEqualWithoutOrder(self.cellsGrid[i][j].possibleValues, self.cellsGrid[m][n].possibleValues)) {
                                    for (let x=boxQuadrants[0]; x<boxQuadrants[1]; x++) {
                                        for (let y=boxQuadrants[2]; y<boxQuadrants[3]; y++) {
                                            if (!(x==i && y==j) && !(x==m && y==n) && self.cellsGrid[x][y].possibleValues != null ) {
                                                self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                                                    if (self.cellsGrid[x][y].possibleValues.includes(entry)) {
                                                        self.cellsGrid[x][y].possibleValues = self.cellsGrid[x][y].possibleValues.filter(function (element) {
                                                            if (element == entry) {
                                                                console.log(`BOX : Removing ${entry} from cell ${x},${y} by Naked Pairs by pair ${self.cellsGrid[i][j].possibleValues}`);
                                                            }
                                                            return element != entry;
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        self.updatePossibilities();
    }

    //Hidden Pairs
    method4() {
        console.log("Method 4 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            let rowPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            let colPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let j=0; j<9; j++) {
                if (self.cellsGrid[j][i].possibleValues != null) {
                    self.cellsGrid[j][i].possibleValues.forEach(function (entry) {
                        colPartPossibilities[entry][0]++;
                        colPartPossibilities[entry][1].push(self.cellsGrid[j][i]);
                    });
                }
                if (self.cellsGrid[i][j].possibleValues != null) {
                    self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                        rowPartPossibilities[entry][0]++;
                        rowPartPossibilities[entry][1].push(self.cellsGrid[i][j]);
                    });
                }
            }
            for (let key1 in colPartPossibilities) {
                if (colPartPossibilities[key1][0] == 2) {
                    for (let key2 in colPartPossibilities) {
                        if (key1 != key2 && colPartPossibilities[key2][0] == 2) {
                            if (arrayEqualWithoutOrder(colPartPossibilities[key1][1], colPartPossibilities[key2][1])) {
                                colPartPossibilities[key1][1].forEach(function (cell) {
                                    cell.possibleValues = cell.possibleValues.filter(function (element) {
                                        if (element != key1 && element != key2) {
                                            console.log(`COL : Removing ${element} from cell ${cell.i},${cell.j} by Hidden Pairs by pair ${key1},${key2}`);
                                        }
                                        return (element == key1 || element == key2)
                                    });
                                });
                            }
                        }
                    }
                }
            }
            for (let key1 in rowPartPossibilities) {
                if (rowPartPossibilities[key1][0] == 2) {
                    for (let key2 in rowPartPossibilities) {
                        if (key1 != key2 && rowPartPossibilities[key2][0] == 2) {
                            if (arrayEqualWithoutOrder(rowPartPossibilities[key1][1], rowPartPossibilities[key2][1])) {
                                rowPartPossibilities[key1][1].forEach(function (cell) {
                                    cell.possibleValues = cell.possibleValues.filter(function (element) {
                                        if (element != key1 && element != key2) {
                                            console.log(`ROW : Removing ${element} from cell ${cell.i},${cell.j} by Hidden Pairs by pair ${key1},${key2}`);
                                        }
                                        return (element == key1 || element == key2)
                                    });
                                });
                            }
                        }
                    }
                }
            }
        }
        
        //Box Section
        [1,2,3,4,5,6,7,8,9].forEach(function (quadrant) {
            let quadrantBounds = locateQuadrantBoundsFromQuadrant(quadrant);
            let quadrantPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let i=quadrantBounds[0]; i<quadrantBounds[1]; i++) {
                for (let j=quadrantBounds[2]; j<quadrantBounds[3]; j++) {
                    if (self.cellsGrid[i][j].possibleValues != null) {
                        self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                            quadrantPossibilities[entry][0]++;
                            quadrantPossibilities[entry][1].push(self.cellsGrid[i][j]);
                        });
                    }
                }
            }
            for (let key1 in quadrantPossibilities) {
                if (quadrantPossibilities[key1][0] == 2) {
                    for (let key2 in quadrantPossibilities) {
                        if (key1 != key2 && quadrantPossibilities[key2][0] == 2) {
                            if (arrayEqualWithoutOrder(quadrantPossibilities[key1][1], quadrantPossibilities[key2][1])) {
                                quadrantPossibilities[key1][1].forEach(function (cell) {
                                    cell.possibleValues = cell.possibleValues.filter(function (element) {
                                        if (element != key1 && element != key2) {
                                            console.log(`BOX : Removing ${element} from cell ${cell.i},${cell.j} by Hidden Pairs by pair ${key1},${key2}`);
                                        }
                                        return (element == key1 || element == key2)
                                    });
                                });
                            }
                        }
                    }
                }
            }
        });
    }

    //Naked Triplets
    method5() {
        let self = this;
        console.log("Method 5 Run");
        for (let i=0; i<9; i++) {
            let rowCombinationsTested = [];
            let colCombinationsTested = [];
            let rowSet = new Set();
            let colSet = new Set();
            for (let j=0; j<9; j++) {
                for (let k=0; k<9; k++) {
                    for (let l=0; l<9; l++) {
                        if (j!=k && j!=l && l!=k) {
                            //Row Section
                            if (!checkIfTripleTested(rowCombinationsTested,j,k,l)) {
                                rowCombinationsTested.push([j,k,l]);
                                if (self.cellsGrid[i][j].possibleValues != null && self.cellsGrid[i][k].possibleValues != null && self.cellsGrid[i][l].possibleValues != null) {
                                    self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                                        rowSet.add(entry);
                                    });
                                    self.cellsGrid[i][k].possibleValues.forEach(function (entry) {
                                        rowSet.add(entry);
                                    });
                                    self.cellsGrid[i][l].possibleValues.forEach(function (entry) {
                                        rowSet.add(entry);
                                    });
                                }
                                if (rowSet.size==3) {
                                    for (let m=0; m<9; m++) {
                                        if (m!=j && m!=k && m!=l) {
                                            if (self.cellsGrid[i][m].possibleValues != null) {
                                                rowSet.forEach(function (entry) {
                                                    self.cellsGrid[i][m].possibleValues = self.cellsGrid[i][m].possibleValues.filter(function (element) {
                                                        if (element == entry) {
                                                            console.log(`ROW : Removing ${element} from cell ${i},${m} by Naked Triplets by triplets ${Array.from(rowSet)}`);
                                                        }
                                                        return element != entry;
                                                    });
                                                });
                                            }
                                        }
                                    }
                                }
                                rowSet = new Set();
                            }
                            //Col Section
                            if (!checkIfTripleTested(colCombinationsTested,j,k,l)) {
                                colCombinationsTested.push([j,k,l]);
                                if (self.cellsGrid[j][i].possibleValues != null && self.cellsGrid[k][i].possibleValues != null && self.cellsGrid[l][i].possibleValues != null) {
                                    self.cellsGrid[j][i].possibleValues.forEach(function (entry) {
                                        colSet.add(entry);
                                    });
                                    self.cellsGrid[k][i].possibleValues.forEach(function (entry) {
                                        colSet.add(entry);
                                    });
                                    self.cellsGrid[l][i].possibleValues.forEach(function (entry) {
                                        colSet.add(entry);
                                    });
                                }
                                if (colSet.size==3) {
                                    for (let m=0; m<9; m++) {
                                        if (m!=j && m!=k && m!=l) {
                                            if (self.cellsGrid[m][i].possibleValues != null) {
                                                colSet.forEach(function (entry) {
                                                    self.cellsGrid[m][i].possibleValues = self.cellsGrid[m][i].possibleValues.filter(function (element) {
                                                        if (element == entry) {
                                                            console.log(`COL : Removing ${element} from cell ${m},${i} by Naked Triplets by triplets ${Array.from(colSet)}`);
                                                        }
                                                        return element != entry;
                                                    });
                                                });
                                            }
                                        }
                                    }
                                }
                                colSet = new Set();
                            }
                        }
                    }
                }
            }
        }
        //Box Section
        [1,2,3,4,5,6,7,8,9].forEach(function (quadrant) {
            let quadrantBounds = locateQuadrantBoundsFromQuadrant(quadrant);
            let quadrantSet = new Set();
            let quadrantCombinationsTested = [];
            let cellsArray = [];
            for (let i=quadrantBounds[0]; i<quadrantBounds[1]; i++) {
                for (let j=quadrantBounds[2]; j<quadrantBounds[3]; j++) {
                    cellsArray.push(self.cellsGrid[i][j]);
                }
            }
            for (let j=0; j<9; j++) {
                for (let k=0; k<9; k++) {
                    for (let l=0; l<9; l++) {
                        if (j!=k && j!=l && l!=k) {
                            if (!checkIfTripleTested(quadrantCombinationsTested,j,k,l)) {
                                quadrantCombinationsTested.push([j,k,l]);
                                if (cellsArray[j].possibleValues != null && cellsArray[k].possibleValues != null && cellsArray[l].possibleValues != null) {
                                    cellsArray[j].possibleValues.forEach(function (entry) {
                                        quadrantSet.add(entry);
                                    });
                                    cellsArray[k].possibleValues.forEach(function (entry) {
                                        quadrantSet.add(entry);
                                    });
                                    cellsArray[l].possibleValues.forEach(function (entry) {
                                        quadrantSet.add(entry);
                                    });
                                }
                                if (quadrantSet.size==3) {
                                    for (let m=0; m<9; m++) {
                                        if (m!=k && m!=j && m!=l) {
                                            if (cellsArray[m].possibleValues != null) {
                                                cellsArray[m].possibleValues = cellsArray[m].possibleValues.filter(function (element) {
                                                    if (quadrantSet.has(element)) {
                                                        console.log(`BOX : Removing ${element} from cell ${cellsArray[m].i},${cellsArray[m].j} by Naked Triplets by triplets ${Array.from(quadrantSet)}`);
                                                    }
                                                    return !quadrantSet.has(element);
                                                });
                                            }
                                        }
                                    }
                                }
                                quadrantSet = new Set();
                            }
                        }
                    }
                }
            }
            cellsArray = [];
        });
    }

    //Hidden Triplets
    method6() {
        console.log("Method 6 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            let rowPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            let colPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let j=0; j<9; j++) {
                if (self.cellsGrid[j][i].possibleValues != null) {
                    self.cellsGrid[j][i].possibleValues.forEach(function (entry) {
                        colPartPossibilities[entry][0]++;
                        colPartPossibilities[entry][1].push(self.cellsGrid[j][i]);
                    });
                }
                if (self.cellsGrid[i][j].possibleValues != null) {
                    self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                        rowPartPossibilities[entry][0]++;
                        rowPartPossibilities[entry][1].push(self.cellsGrid[i][j]);
                    });
                }
            }
            let possibleRowTriplets = [];
            for (let key in rowPartPossibilities) {
                if (rowPartPossibilities[key][0] == 2 || rowPartPossibilities[key][0] == 3) {
                    possibleRowTriplets.push([key, rowPartPossibilities[key]]);
                }
            }
            let possibleColTriplets = [];
            for (let key in colPartPossibilities) {
                if (colPartPossibilities[key][0] == 2 || colPartPossibilities[key][0] == 3) {
                    possibleColTriplets.push([key, colPartPossibilities[key]]);
                }
            }
            let rowAlreadyTested = [];
            for (let n=0; n<possibleRowTriplets.length; n++) {
                for (let k=0; k<possibleRowTriplets.length; k++) {
                    for (let l=0; l<possibleRowTriplets.length; l++) {
                        if (n!=k && n!=l && k!=l) {
                            if (!checkIfTripleTested(rowAlreadyTested,n,k,l) && possibleRowTriplets[n][1][1].length!=0 && possibleRowTriplets[k][1][1].length!=0 && possibleRowTriplets[l][1][1].length!=0) {
                                rowAlreadyTested.push([n,k,l]);
                                let rowSet = new Set();
                                possibleRowTriplets[n][1][1].forEach(function (entry) {
                                    rowSet.add(entry);
                                });
                                possibleRowTriplets[k][1][1].forEach(function (entry) {
                                    rowSet.add(entry);
                                });
                                possibleRowTriplets[l][1][1].forEach(function (entry) {
                                    rowSet.add(entry);
                                });
                                if (rowSet.size == 3) {
                                    for (let cell of rowSet) {
                                        cell.possibleValues = cell.possibleValues.filter(function (element) {
                                            if (!(element == possibleRowTriplets[n][0] || element == possibleRowTriplets[k][0] || element == possibleRowTriplets[l][0])) {
                                                console.log(`ROW : Removing ${element} from ${cell.i},${cell.j} by Hidden Triplets by triplet ${Array.from(rowSet)}`);
                                            }
                                            return (element == possibleRowTriplets[n][0] || element == possibleRowTriplets[k][0] || element == possibleRowTriplets[l][0])
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            let colAlreadyTested = [];
            for (let n=0; n<possibleColTriplets.length; n++) {
                for (let k=0; k<possibleColTriplets.length; k++) {
                    for (let l=0; l<possibleColTriplets.length; l++) {
                        if (n!=k && n!=l && k!=l) {
                            if (!checkIfTripleTested(colAlreadyTested,n,k,l) && possibleColTriplets[n][1][1].length!=0 && possibleColTriplets[k][1][1].length!=0 && possibleColTriplets[l][1][1].length!=0) {
                                colAlreadyTested.push([n,k,l]);
                                let colSet = new Set();
                                possibleColTriplets[n][1][1].forEach(function (entry) {
                                    colSet.add(entry);
                                });
                                possibleColTriplets[k][1][1].forEach(function (entry) {
                                    colSet.add(entry);
                                });
                                possibleColTriplets[l][1][1].forEach(function (entry) {
                                    colSet.add(entry);
                                });
                                if (colSet.size == 3) {
                                    for (let cell of colSet) {
                                        cell.possibleValues = cell.possibleValues.filter(function (element) {
                                            if (!(element == possibleColTriplets[n][0] || element == possibleColTriplets[k][0] || element == possibleColTriplets[l][0])) {
                                                console.log(`COL : Removing ${element} from ${cell.i},${cell.j} by Hidden Triplets by triplet ${Array.from(colSet)}`);
                                            }
                                            return (element == possibleColTriplets[n][0] || element == possibleColTriplets[k][0] || element == possibleColTriplets[l][0])
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //Box Section
        [1,2,3,4,5,6,7,8,9].forEach(function (quadrant) {
            let quadrantBounds = locateQuadrantBoundsFromQuadrant(quadrant);
            let quadrantPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let i=quadrantBounds[0]; i<quadrantBounds[1]; i++) {
                for (let j=quadrantBounds[2]; j<quadrantBounds[3]; j++) {
                    if (self.cellsGrid[i][j].possibleValues != null) {
                        self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                            quadrantPossibilities[entry][0]++;
                            quadrantPossibilities[entry][1].push(self.cellsGrid[i][j]);
                        });
                    }
                }
            }
            let possibleBoxTriplets = [];
            for (let num in quadrantPossibilities) {
                if (quadrantPossibilities[num][0] == 2 || quadrantPossibilities[num][0] == 3) {
                    possibleBoxTriplets.push([num, quadrantPossibilities[num]]);
                }
            }
            let boxAlreadyTested = [];
            for (let n=0; n<possibleBoxTriplets.length; n++) {
                for (let k=0; k<possibleBoxTriplets.length; k++) {
                    for (let l=0; l<possibleBoxTriplets.length; l++) {
                        if (n!=k && n!=l && k!=l) {
                            if (!checkIfTripleTested(boxAlreadyTested,n,k,l) && possibleBoxTriplets[n][1][1].length!=0 && possibleBoxTriplets[k][1][1].length!=0 && possibleBoxTriplets[l][1][1].length!=0) {
                                boxAlreadyTested.push([n,k,l]);
                                let boxSet = new Set();
                                possibleBoxTriplets[n][1][1].forEach(function (entry) {
                                    boxSet.add(entry);
                                });
                                possibleBoxTriplets[k][1][1].forEach(function (entry) {
                                    boxSet.add(entry);
                                });
                                possibleBoxTriplets[l][1][1].forEach(function (entry) {
                                    boxSet.add(entry);
                                });
                                if (boxSet.size == 3) {
                                    for (let cell of boxSet) {
                                        cell.possibleValues = cell.possibleValues.filter(function (element) {
                                            if (!(element == possibleBoxTriplets[n][0] || element == possibleBoxTriplets[k][0] || element == possibleBoxTriplets[l][0])) {
                                                console.log(`BOX : Removing ${element} from ${cell.i},${cell.j} by Hidden Triplets by triplet ${Array.from(boxSet)}`);
                                            }
                                            return (element == possibleBoxTriplets[n][0] || element == possibleBoxTriplets[k][0] || element == possibleBoxTriplets[l][0])
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    //Pointing Pairs
    method7() {
        console.log("Method 7 Run");
        let self = this;
        [1,2,3,4,5,6,7,8,9].forEach(function (quadrant) {
            let quadrantBounds = locateQuadrantBoundsFromQuadrant(quadrant);
            let quadrantPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let i=quadrantBounds[0]; i<quadrantBounds[1]; i++) {
                for (let j=quadrantBounds[2]; j<quadrantBounds[3]; j++) {
                    if (self.cellsGrid[i][j].possibleValues != null) {
                        self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                            quadrantPossibilities[entry][0]++;
                            quadrantPossibilities[entry][1].push(self.cellsGrid[i][j]);
                        });
                    }
                }
            }
            for (let key in quadrantPossibilities) {
                if (quadrantPossibilities[key][0] == 2) {
                    //IF SAME COLUMN
                    if (inTheSameColumn(quadrantPossibilities[key][1][0],quadrantPossibilities[key][1][1])) {
                        let sharedCol = quadrantPossibilities[key][1][0].j;
                        for (let m=0; m<9; m++) {
                            if (m!=quadrantPossibilities[key][1][0].i && m!=quadrantPossibilities[key][1][1].i) {
                                if (self.cellsGrid[m][sharedCol].possibleValues != null) {
                                    self.cellsGrid[m][sharedCol].possibleValues = self.cellsGrid[m][sharedCol].possibleValues.filter(function (element) {
                                        if (element == key) {
                                            console.log(`COL : Removing ${element} from ${m},${sharedCol} by Pointing Pairs due to pair in quadrant ${quadrant}`);
                                        }
                                        return element != key;
                                    });
                                }
                            }
                        }
                    }
                    //IF SAME ROW
                    if (inTheSameRow(quadrantPossibilities[key][1][0],quadrantPossibilities[key][1][1])) {
                        let sharedRow = quadrantPossibilities[key][1][0].i;
                        for (let m=0; m<9; m++) {
                            if (m!=quadrantPossibilities[key][1][0].j && m!=quadrantPossibilities[key][1][1].j) {
                                if (self.cellsGrid[sharedRow][m].possibleValues != null) {
                                    self.cellsGrid[sharedRow][m].possibleValues = self.cellsGrid[sharedRow][m].possibleValues.filter(function (element) {
                                        if (element == key) {
                                            console.log(`ROW : Removing ${element} from ${sharedRow},${m} by Pointing Pairs due to pair in quadrant ${quadrant}`);
                                        }
                                        return element != key;
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    //Pointing Triplets
    method8(){
        console.log("Method 8 Run");
        let self = this;
        [1,2,3,4,5,6,7,8,9].forEach(function (quadrant) {
            let quadrantBounds = locateQuadrantBoundsFromQuadrant(quadrant);
            let quadrantPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let i=quadrantBounds[0]; i<quadrantBounds[1]; i++) {
                for (let j=quadrantBounds[2]; j<quadrantBounds[3]; j++) {
                    if (self.cellsGrid[i][j].possibleValues != null) {
                        self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                            quadrantPossibilities[entry][0]++;
                            quadrantPossibilities[entry][1].push(self.cellsGrid[i][j]);
                        });
                    }
                }
            }
            for (let key in quadrantPossibilities) {
                if (quadrantPossibilities[key][0] == 3) {
                    //IF SAME COLUMN
                    if (inTheSameColumn(quadrantPossibilities[key][1][0], quadrantPossibilities[key][1][1], quadrantPossibilities[key][1][2])) {
                        let sharedCol = quadrantPossibilities[key][1][0].j;
                        for (let m=0; m<9; m++) {
                            if (m!=quadrantPossibilities[key][1][0].i && m!=quadrantPossibilities[key][1][1].i && m!=quadrantPossibilities[key][1][2].i) {
                                if (self.cellsGrid[m][sharedCol].possibleValues != null) {
                                    self.cellsGrid[m][sharedCol].possibleValues = self.cellsGrid[m][sharedCol].possibleValues.filter(function (element) {
                                        if (element == key) {
                                            console.log(`Removing ${element} from ${m},${sharedCol} by Pointing Triplets due to quadrant ${quadrant}`);
                                        }
                                        return element != key;
                                    });
                                }
                            }
                        }
                    }
                    //IF SAME ROW
                    if (inTheSameRow(quadrantPossibilities[key][1][0], quadrantPossibilities[key][1][1], quadrantPossibilities[key][1][2])) {
                        let sharedRow = quadrantPossibilities[key][1][0].i;
                        for (let m=0; m<9; m++) {
                            if (m!=quadrantPossibilities[key][1][0].j && m!=quadrantPossibilities[key][1][1].j && m!=quadrantPossibilities[key][1][2].j) {
                                if (self.cellsGrid[sharedRow][m].possibleValues != null) {
                                    self.cellsGrid[sharedRow][m].possibleValues = self.cellsGrid[sharedRow][m].possibleValues.filter(function (element) {
                                        if (element == key) {
                                            console.log(`Removing ${element} from ${sharedRow},${m} by Pointing Triplets due to quadrant ${quadrant}`);
                                        }
                                        return element != key;
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    //Claiming Pairs
    method9(){
        console.log("Method 9 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            let rowPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            let colPartPossibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let j=0; j<9; j++) {
                if (self.cellsGrid[j][i].possibleValues != null) {
                    self.cellsGrid[j][i].possibleValues.forEach(function (entry) {
                        colPartPossibilities[entry][0]++;
                        colPartPossibilities[entry][1].push(self.cellsGrid[j][i]);
                    });
                }
                if (self.cellsGrid[i][j].possibleValues != null) {
                    self.cellsGrid[i][j].possibleValues.forEach(function (entry) {
                        rowPartPossibilities[entry][0]++;
                        rowPartPossibilities[entry][1].push(self.cellsGrid[i][j]);
                    });
                }
            }
            for (let key in rowPartPossibilities) {
                if (rowPartPossibilities[key][0]==2) {
                    if (inTheSameQuadrant(rowPartPossibilities[key][1][0], rowPartPossibilities[key][1][1])) {
                        let boxQuadrants = locateQuadrantBounds(rowPartPossibilities[key][1][0].i, rowPartPossibilities[key][1][0].j);
                        for (let x=boxQuadrants[0]; x<boxQuadrants[1]; x++) {
                            for (let y=boxQuadrants[2]; y<boxQuadrants[3]; y++) {
                                if (!(x==rowPartPossibilities[key][1][0].i && y==rowPartPossibilities[key][1][0].j) && !(x==rowPartPossibilities[key][1][1].i && y==rowPartPossibilities[key][1][1].j) && self.cellsGrid[x][y].possibleValues!=null) {
                                    self.cellsGrid[x][y].possibleValues = self.cellsGrid[x][y].possibleValues.filter(function (element) {
                                        if (element == key) {
                                            console.log(`ROW: Removing ${key} from ${x},${y} by Claiming Pairs of row ${i}`);
                                        }
                                        return element != key;
                                    });
                                }
                            }
                        }
                    }
                }
                if (colPartPossibilities[key][0]==2) {
                    if (inTheSameQuadrant(colPartPossibilities[key][1][0], colPartPossibilities[key][1][1])) {
                        let boxQuadrants = locateQuadrantBounds(colPartPossibilities[key][1][0].i, colPartPossibilities[key][1][0].j);
                        for (let x=boxQuadrants[0]; x<boxQuadrants[1]; x++) {
                            for (let y=boxQuadrants[2]; y<boxQuadrants[3]; y++) {
                                if (!(x==colPartPossibilities[key][1][0].i && y==colPartPossibilities[key][1][0].j) && !(x==colPartPossibilities[key][1][1].i && y==colPartPossibilities[key][1][1].j) && self.cellsGrid[x][y].possibleValues!=null) {
                                    self.cellsGrid[x][y].possibleValues = self.cellsGrid[x][y].possibleValues.filter(function (element) {
                                        if (element == key) {
                                            console.log(`COL: Removing ${key} from ${x},${y} by Claiming Pairs of column ${i}`);
                                        }
                                        return element != key;
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //X-Wing
    method10(){
        console.log("Method 10 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            let row1Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            let col1Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let k=0; k<9; k++) {
                if (self.cellsGrid[i][k].possibleValues != null) {
                    self.cellsGrid[i][k].possibleValues.forEach(function (entry) {
                        row1Possibilities[entry][0]++;
                        row1Possibilities[entry][1].push(self.cellsGrid[i][k]);
                    });
                }
                if (self.cellsGrid[k][i].possibleValues != null) {
                    self.cellsGrid[k][i].possibleValues.forEach(function (entry) {
                        col1Possibilities[entry][0]++;
                        col1Possibilities[entry][1].push(self.cellsGrid[k][i]);
                    });
                }
            }
            for (let j=0; j<9; j++) {
                if (j!=i) {
                    let row2Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
                    let col2Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
                    for (let k=0; k<9; k++) {
                        if (self.cellsGrid[j][k].possibleValues != null) {
                            self.cellsGrid[j][k].possibleValues.forEach(function (entry) {
                                row2Possibilities[entry][0]++;
                                row2Possibilities[entry][1].push(self.cellsGrid[j][k]);
                            });
                        }
                        if (self.cellsGrid[k][j].possibleValues != null) {
                            self.cellsGrid[k][j].possibleValues.forEach(function (entry) {
                                col2Possibilities[entry][0]++;
                                col2Possibilities[entry][1].push(self.cellsGrid[k][j]);
                            });
                        }
                    }
                    for (let key in row1Possibilities) {
                        if (row1Possibilities[key][0] == 2 && row2Possibilities[key][0] == 2) {
                            if (inTheSameColumn(row1Possibilities[key][1][0], row2Possibilities[key][1][0]) && inTheSameColumn(row1Possibilities[key][1][1], row2Possibilities[key][1][1])) {
                                let columns = [row1Possibilities[key][1][0].j, row1Possibilities[key][1][1].j];
                                columns.forEach(function (column) {
                                    for (let y=0; y<9; y++) {
                                        if (y!=i && y!=j) {
                                            if (self.cellsGrid[y][column].possibleValues != null && self.cellsGrid[y][column].possibleValues.includes(key)) {
                                                self.cellsGrid[y][column].possibleValues = self.cellsGrid[y][column].possibleValues.filter(function (element) {
                                                    if (element == key) {
                                                        console.log(`ROW : Removing ${key} from ${y},${column} due to rows ${i} and ${j}`);
                                                    }
                                                    return element != key;
                                                })
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        if (col1Possibilities[key][0] == 2 && col2Possibilities[key][0] == 2) {
                            if (inTheSameRow(col1Possibilities[key][1][0], col2Possibilities[key][1][0]) && inTheSameRow(col1Possibilities[key][1][1], col2Possibilities[key][1][1])) {
                                let rows = [col1Possibilities[key][1][0].i, col1Possibilities[key][1][1].i];
                                rows.forEach(function (row) {
                                    for (let x=0; x<9; x++) {
                                        if (x!=i && x!=j) {
                                            if (self.cellsGrid[row][x].possibleValues != null && self.cellsGrid[row][x].possibleValues.includes(key)) {
                                                self.cellsGrid[row][x].possibleValues = self.cellsGrid[row][x].possibleValues.filter(function (element) {
                                                    if (element == key) {
                                                        console.log(`COL : Removing ${key} from ${row},${x} due to columns ${i} and ${j}`);
                                                    }
                                                    return element != key;
                                                })
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    //Y-Wing
    method11(){
        console.log("Method 11 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            for (let j=0; j<9;j++) {
                if (this.cellsGrid[i][j].possibleValues != null && this.cellsGrid[i][j].possibleValues.length == 2) {
                    let pivot = this.cellsGrid[i][j];
                    let seeingCells = allSeenCells(pivot, self.cellsGrid);
                    for (let x=0; x<seeingCells.length; x++) {
                        for (let y=0; y<seeingCells.length; y++) {
                            if (x!=y && !(seeingCells[x].i==i && seeingCells[x].j==j) && !(seeingCells[y].i==i && seeingCells[y].j==j) && seeingCells[x].possibleValues != null && seeingCells[x].possibleValues.length == 2 && seeingCells[y].possibleValues != null && seeingCells[y].possibleValues.length == 2) {
                                if (!inTheSameColumn(seeingCells[x], seeingCells[y]) && !inTheSameRow(seeingCells[x], seeingCells[y])) {
                                    let xInclusions = [];
                                    let yInclusions = [];
                                    pivot.possibleValues.forEach(function (entry) {
                                        if (seeingCells[x].possibleValues.includes(entry)) {
                                            xInclusions.push(entry);
                                        }
                                        if (seeingCells[y].possibleValues.includes(entry)) {
                                            yInclusions.push(entry);
                                        }
                                    });
                                    if (xInclusions.length==1 && yInclusions.length==1 && xInclusions[0]!=yInclusions[0]) {
                                        let matchCounter = [];
                                        seeingCells[x].possibleValues.forEach(function (el) {
                                            if (seeingCells[y].possibleValues.includes(el) && !xInclusions.includes(el) && !yInclusions.includes(el)) {
                                                matchCounter.push(el);
                                            }
                                        })
                                        if (matchCounter.length == 1) {
                                            let pincer1 = seeingCells[x];
                                            let pincer2 = seeingCells[y];
                                            let pincer1Seeing = allSeenCells(pincer1, this.cellsGrid);
                                            pincer1Seeing.forEach(function (cell) {
                                                if (checkIfSeeing(pincer2, cell)) {
                                                   if (!(cell.i == pincer1.i && cell.j == pincer1.j) && !(cell.i == pincer2.i && cell.j == pincer2.j) && cell.possibleValues != null) {
                                                       cell.possibleValues = cell.possibleValues.filter(function (element) {
                                                           if (element == matchCounter[0]) {
                                                               console.log(`Removing ${element} from ${cell.i},${cell.j} due to Pivot ${i},${j} and Pincers ${seeingCells[x].i},${seeingCells[x].j} and ${seeingCells[y].i},${seeingCells[y].j}`)
                                                           }
                                                           return element != matchCounter[0];
                                                       })
                                                    }
                                                }
                                            });   
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //Swordfish
    method12(){
        console.log("Method 12 Run");
        let self = this;
        for (let i=0; i<9; i++) {
            let row1Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            let col1Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
            for (let k=0; k<9; k++) {
                if (self.cellsGrid[i][k].possibleValues != null) {
                    self.cellsGrid[i][k].possibleValues.forEach(function (entry) {
                        row1Possibilities[entry][0]++;
                        row1Possibilities[entry][1].push(self.cellsGrid[i][k]);
                    });
                }
                if (self.cellsGrid[k][i].possibleValues != null) {
                    self.cellsGrid[k][i].possibleValues.forEach(function (entry) {
                        col1Possibilities[entry][0]++;
                        col1Possibilities[entry][1].push(self.cellsGrid[k][i]);
                    });
                }
            }
            for (let j=0; j<9; j++) {
                if (j!=i) {
                    let row2Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
                    let col2Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
                    for (let k=0; k<9; k++) {
                        if (self.cellsGrid[j][k].possibleValues != null) {
                            self.cellsGrid[j][k].possibleValues.forEach(function (entry) {
                                row2Possibilities[entry][0]++;
                                row2Possibilities[entry][1].push(self.cellsGrid[j][k]);
                            });
                        }
                        if (self.cellsGrid[k][j].possibleValues != null) {
                            self.cellsGrid[k][j].possibleValues.forEach(function (entry) {
                                col2Possibilities[entry][0]++;
                                col2Possibilities[entry][1].push(self.cellsGrid[k][j]);
                            });
                        }
                    }
                    for (let m=0; m<9; m++) {
                        if (m!=i && m!=j) {
                            let row3Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
                            let col3Possibilities = {"1":[0,[]],"2":[0,[]],"3":[0,[]],"4":[0,[]],"5":[0,[]],"6":[0,[]],"7":[0,[]],"8":[0,[]],"9":[0,[]]};
                            for (let k=0; k<9; k++) {
                                if (self.cellsGrid[m][k].possibleValues != null) {
                                    self.cellsGrid[m][k].possibleValues.forEach(function (entry) {
                                        row3Possibilities[entry][0]++;
                                        row3Possibilities[entry][1].push(self.cellsGrid[m][k]);
                                    });
                                }
                                if (self.cellsGrid[k][m].possibleValues != null) {
                                    self.cellsGrid[k][m].possibleValues.forEach(function (entry) {
                                        col3Possibilities[entry][0]++;
                                        col3Possibilities[entry][1].push(self.cellsGrid[k][m]);
                                    });
                                }
                            }
                            // console.log(`Testing Rows ${i}, ${j}, ${m}`);
                            // console.dir(row1Possibilities);
                            // console.dir(row2Possibilities);
                            // console.dir(row3Possibilities);
                            for (let key in row1Possibilities) {
                                if ((row1Possibilities[key][0] == 2 || row1Possibilities[key][0] == 3) && (row2Possibilities[key][0] == 2 || row2Possibilities[key][0] == 3) && (row3Possibilities[key][0] == 2 || row3Possibilities[key][0] == 3)) {
                                    let cells = [row1Possibilities[key][1][0], row1Possibilities[key][1][1], (row1Possibilities[key][1][2] || null) , row2Possibilities[key][1][0], row2Possibilities[key][1][1], (row2Possibilities[key][1][2] || null), row3Possibilities[key][1][0], row3Possibilities[key][1][1], (row3Possibilities[key][1][2] || null)]
                                    let colDict = {};
                                    cells.forEach(function (cell) {
                                        if (cell != null) {
                                            if (colDict[cell.j] == null) {
                                                colDict[cell.j] = []
                                            }
                                            colDict[cell.j].push(cell.i);
                                        }
                                    })
                                    if (Object.keys(colDict).length == 3) {
                                        // console.log(`Rows ${i}, ${j}, ${m} Made it into 3 col check`);
                                        for (let col in colDict) {
                                            for (let y=0; y<9; y++) {
                                                if (y!=colDict[col][0] && y!=colDict[col][1] && (colDict[col][2] != null ? y!=colDict[col][2] : true)) {
                                                    if (self.cellsGrid[y][col].possibleValues != null) {
                                                        self.cellsGrid[y][col].possibleValues = self.cellsGrid[y][col].possibleValues.filter(function (element) {
                                                            if (element == key) {
                                                                console.log(`ROW : Removing ${key} from ${y}, ${col} by Swordfish of rows ${i},${j},${m}`)
                                                            }
                                                            return element != key;
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // console.log(`Testing Cols ${i}, ${j}, ${m}`);
                            // console.dir(col1Possibilities);
                            // console.dir(col2Possibilities);
                            // console.dir(col3Possibilities);
                            for (let key in col1Possibilities) {
                                if ((col1Possibilities[key][0] == 2 || col1Possibilities[key][0] == 3) && (col2Possibilities[key][0] == 2 || col2Possibilities[key][0] == 3) && (col3Possibilities[key][0] == 2 || col3Possibilities[key][0] == 3)) {
                                    let cells = [col1Possibilities[key][1][0], col1Possibilities[key][1][1], (col1Possibilities[key][1][2] || null), col2Possibilities[key][1][0], col2Possibilities[key][1][1],  (col2Possibilities[key][1][2] || null), col3Possibilities[key][1][0], col3Possibilities[key][1][1], (col3Possibilities[key][1][2] || null)]
                                    let rowDict = {};
                                    cells.forEach(function (cell) {
                                        if (cell != null) {
                                            if (rowDict[cell.i] == null) {
                                                rowDict[cell.i] = []
                                            }
                                            rowDict[cell.i].push(cell.j);
                                        }
                                    })
                                    if (Object.keys(rowDict).length == 3) {
                                        // console.log(`Cols ${i}, ${j}, ${m} Made it into 3 row check`);
                                        for (let row in rowDict) {
                                            for (let x=0; x<9; x++) {
                                                if (x!=rowDict[row][0] && x!=rowDict[row][1] && (rowDict[row][2] != null ? x!=rowDict[row][2] : true)) {
                                                    if (self.cellsGrid[row][x].possibleValues != null) {
                                                        self.cellsGrid[row][x].possibleValues = self.cellsGrid[row][x].possibleValues.filter(function (element) {
                                                            if (element == key) {
                                                                console.log(`COL : Removing ${key} from ${row}, ${x} by Swordfish of columns ${i},${j},${m}`)
                                                            }
                                                            return element != key;
                                                        })
                                                    }
                                                }
                                            }
                                        }   
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    solveGrid() {
        let originalGrid = JSON.parse(JSON.stringify(this.cellsGrid));
        this.method12();
        this.method11();
        this.method10();
        this.method9();
        this.method8();
        this.method7();
        this.method6();
        this.method5();
        this.method4();
        this.method3();
        this.method2();
        this.method1();
        if (JSON.stringify(this.cellsGrid) != JSON.stringify(originalGrid)) {
            this.solveGrid();
        } else {
            this.display();
        }
    }

    display(){
        let displayArray = [];
        for (let i=0; i<9; i++) {
            for (let j=0; j<9; j++) {
                displayArray.push(this.cellsGrid[i][j].value);
            }
        }
        let rows = document.querySelectorAll("table tbody tr");
        let displayIndex = 0;
        rows.forEach(function (row) {
            row.querySelectorAll("td").forEach(function (cell) {
                let field = cell.querySelector("input");
                if(field.value == ""){
                    field.value = displayArray[displayIndex];
                    if (displayArray[displayIndex]!="") {
                        field.style.color = "red";
                    }
                }
                displayIndex++;
            });
        });
    }
}

function locateQuadrantBounds(i,j){
    let quadrantX = Math.floor(i/3);
    let quadrantY = Math.floor(j/3);
    switch (true) {
        case (quadrantX == 0 && quadrantY == 0) :
            return [0,3,0,3];
        case (quadrantX == 1 && quadrantY == 0) :
            return [3,6,0,3];
        case (quadrantX == 2 && quadrantY == 0) :
            return [6,9,0,3];
        case (quadrantX == 0 && quadrantY == 1) :
            return [0,3,3,6];
        case (quadrantX == 1 && quadrantY == 1) :
            return [3,6,3,6];
        case (quadrantX == 2 && quadrantY == 1) :
            return [6,9,3,6];
        case (quadrantX == 0 && quadrantY == 2) :
            return [0,3,6,9];
        case (quadrantX == 1 && quadrantY == 2) :
            return [3,6,6,9];
        case (quadrantX == 2 && quadrantY == 2) :
            return [6,9,6,9];
        default:
            console.log("Quadrant Error");
    }
}

function locateQuadrantBoundsFromQuadrant (quadrant) {
    switch (quadrant) {
        case 1 :
            return [0,3,0,3];
        case 2 :
            return [3,6,0,3];
        case 3 :
            return [6,9,0,3];
        case 4 :
            return [0,3,3,6];
        case 5 :
            return [3,6,3,6];
        case 6 :
            return [6,9,3,6];
        case 7 :
            return [0,3,6,9];
        case 8 :
            return [3,6,6,9];
        case 9 :
            return [6,9,6,9];
        default:
            console.log("Quadrant Error");
    }
}

function inTheSameColumn(cellA, cellB, cellC=null) {
    if (cellC == null) {
        if (cellA.j == cellB.j) {
            return true;
        }
        else {
            return false;
        }
    } else {
        if (cellA.j == cellB.j && cellA.j == cellC.j) {
            return true;
        }
        else {
            return false;
        }
    }
}

function inTheSameRow(cellA, cellB, cellC=null) {
    if (cellC == null) {
        if (cellA.i == cellB.i) {
            return true;
        }
        else {
            return false;
        }
    } else {
        if (cellA.i == cellB.i && cellA.i == cellC.i) {
            return true;
        }
        else {
            return false;
        }
    }
}

function inTheSameQuadrant(cellA, cellB, cellC=null) {
    if (cellC == null) {
        let boundsA = locateQuadrantBounds(cellA.i, cellA.j);
        let boundsB = locateQuadrantBounds(cellB.i, cellB.j);
        if (arrayEqual(boundsA,boundsB)) {
            return true;
        } else {
            return false;
        }
    } else {
        let boundsA = locateQuadrantBounds(cellA.i, cellA.j);
        let boundsB = locateQuadrantBounds(cellB.i, cellB.j);
        let boundsC = locateQuadrantBounds(cellC.i, cellC.j);
        if (arrayEqual(boundsA,boundsB) && arrayEqual(boundsB, boundsC)) {
            return true;
        } else {
            return false;
        }
    }
}

function allSeenCells (cell, grid) { //INCLUDES SELF, MAYBE FIX LATER (And check uses to simplify that section from checking)
    let cells = [];
    for (let k=0; k<9; k++) {
        cells.push(grid[cell.i][k]);
        cells.push(grid[k][cell.j]);
    }
    let cellBounds = locateQuadrantBounds(cell.i, cell.j);
    for (let m=cellBounds[0]; m<cellBounds[1]; m++) {
        for (let n=cellBounds[2]; n<cellBounds[3]; n++) {
            cells.push(grid[m][n])
        }
    }
    return cells;
}

function checkIfSeeing(cell1,cell2,cell3=null) {
    return (inTheSameRow(cell1,cell2,cell3) || inTheSameColumn(cell1,cell2,cell3) || inTheSameQuadrant(cell1,cell2,cell3))
}

function arrayEqual(arr1,arr2) {
    if (arr1.length == arr2.length) {
        for (let i=0; i<arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

function arrayEqualWithoutOrder(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    let set1 = new Set(arr1);
    let set2 = new Set(arr2);

    return (set1.size == set2.size && arr1.every(function (item) {
        return set2.has(item);
    }));
}

function checkIfTripleTested (array,j,k,l) {
    let bool = false;
    array.forEach(function (el) {
        if (arrayEqualWithoutOrder(el, [j,k,l])) {
            bool = true;
        }
    });
    return bool;
}

function checkIfQuadTested (array, j, k, l, m) {
    let bool = false;
    array.forEach(function (el) {
        if (arrayEqualWithoutOrder(el, [j,k,l,m])) {
            bool = true;
        }
    });
    return bool;
}

let solveButton = document.getElementById("solve-button");
solveButton.addEventListener("click", function () {
    //Creating Grid Object
    let validTest = new RegExp("^[1-9]$");
    let cellsArray = [];
    for (let i=0; i<9; i++) {
        cellsArray.push([]);
        for (let j=0; j<9; j++) {
            let value = document.querySelector("table tbody").children[i].children[j].querySelector("input").value;
            if (value == "" || validTest.test(value)) {
                cellsArray[i].push(new Cell(value, null, i, j));
                document.getElementById("value-error").style.display = "none";
            } else {
                document.getElementById("value-error").style.display = "block";
                return;
            }
        }
    }
    let grid = new SodukoGrid(cellsArray);

    //Solving
    grid.initializePossibilities();
    grid.solveGrid();
});

let clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function () {
    document.getElementById("value-error").style.display = "none";
    let rows = document.querySelectorAll("table tbody tr");
    rows.forEach(function (row) {
        row.querySelectorAll("td").forEach(function (cell) {
            cell.querySelector("input").value = "";
            cell.querySelector("input").style.color = "black";
        });
    });
    console.clear();
});