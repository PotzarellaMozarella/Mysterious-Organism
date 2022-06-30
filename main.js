// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// factory function to create multiple objects
function pAequorFactory (specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    //to simulate P. aequor‘s high rate of mutation (change in its DNA)
    mutate () {
      let i = Math.floor(Math.random() * 15) ;
      currentBase = this.dna[i];
      do 
      {
         mutateBase = returnRandBase();
      } while (mutateBase === currentBase);
      this.dna[i] = mutateBase;
      return this.dna;
    },
    // to compare the DNA sequences of different P. aequor & return the percentage of DNA the two objects have in common
    compareDNA (pAequor) {
      let counter =0; 
      //console.log(pAequor.dna);
      //console.log(this.dna);
      for (j=0; j< pAequor.dna.length ;j++)
      {
        if (pAequor.dna[j] === this.dna[j]) {
          counter++ ;
        }
      }
      const ident = (counter/pAequor.dna.length ) *100 ;
      let percent = ident.toFixed(2);
      //console.log(`specimen #${pAequor.specimenNum} and specimen #${this.specimenNum} have ${percent}% DNA in common`);
      return percent;
    },
//    
   willLikelySurvive () {
     let sum= 0;
     for (l=0; l<this.dna.length ; l++)
     {
       if ( this.dna[l]=== 'C' || this.dna[l]=== 'G') {
         sum++ ;
       }
     }
     let likely = (sum/this.dna.length ) *100 ;
    // console.log(likely);
     if (likely >= 60) {
       return true;
     } else {
       return false;
     }
   },

 complementStrand () {
   complDna =[];
   for (p=0; p<this.dna.length ; p++)
   {
     if ( this.dna[p] === 'A') {
       complDna.dna[p] = 'T'
     }
     else if ( this.dna[p] === 'T') {
       complDna.dna[p] = 'A'
     }
      else if ( this.dna[p] === 'C') {
       complDna.dna[p] = 'G'
     }
      else if ( this.dna[p] === 'G') {
       complDna.dna[p] = 'C'
     }
   }
   return complDna;
 }
//end of fatory function below
  }
};

/*print to check input dna and mutated dna
let ex1 = pAequorFactory(1, mockUpStrand());
console.log(ex1.dna);
console.log(ex1.mutate()); */

/*print to check identical bases
let ex1 = pAequorFactory(1, mockUpStrand());
let ex2 = pAequorFactory(2, mockUpStrand());
ex2.compareDNA(ex1); */

/*print to survival likelihood
let ex1 = pAequorFactory(1, mockUpStrand());
console.log(ex1.dna);
console.log(ex1.willLikelySurvive()); */


//to create 30 instances of  pAequor
createSurvivors = () => {
  let instances = [];
  let instance = [];
  let nums=1;
  do {
      instance = pAequorFactory(nums, mockUpStrand());
      if (instance.willLikelySurvive() === true) 
      {
        //console.log(instance);
        instances.push(instance);
        nums++;
        }
  } while (nums <=30);
  return instances;
  };

/*to print 30 instances of  pAequor
 console.log(createSurvivors()); */

//  to find the two most related instances of pAequor

relatedMost = arr => {
  let ex1, ex2;
  let percent =0;
  for (a=0 ; a<30 ; a++)
  { ex1= arr[a]; 
    for (b=a+1; b<30; b++)
    {  ex2 = arr[b] ; 
         if (ex1.compareDNA(ex2) > percent && a !== b) 
         {
          console.log(ex1.compareDNA(ex2));
          sNum1= a; console.log(a);
          sNum2=b; console.log(b);
          percent = ex1.compareDNA(ex2) ;
        }
      }
    }
    console.log(`The two most related instances are Specimen #${sNum1} and Specimen #${sNum2} `)
  };
  
  relatedMost(createSurvivors());

