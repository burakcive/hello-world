var inputArray = [1,2,3];

var outputObj = {
   value : null,
   rest : null
}

function traverseArray(outputObj)
{
    var firstElement = inputArray.length > 0 ? inputArray[0] : null;
    outputObj.value = firstElement;
    outputObj.rest =  firstElement? tempoutputObj : null;

    inputArray.shift();
    outputObj.rest ? traverseArray(outputObj.rest) : console.log(outputObj);
}

traverseArray(outputObj);

/*

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};


*/ 