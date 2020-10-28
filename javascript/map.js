function map(array, transform) {
   
    //Create an empty array - result
    let result = [];
    //Iterate and for each i, get the transformed = transform(i)
    for (let val of array) {
        result.push(transform(val));
    }
    //push the transformed to result
    return result; 

}

function transform(val) {
    return val * 2;
}

let a = [1, 2, 3];
console.log(a.map(transform));