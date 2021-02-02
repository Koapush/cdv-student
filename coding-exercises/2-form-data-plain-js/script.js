function averageData(data){
  let newData = [];
  let keys = Object.keys(data[0]);
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      if(key in datum){
        sum += datum[key];
        num++;
      }
    }
    let avg = sum/num;
    if(!isNaN(avg)){
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      newData.push(newDataPoint);
    }
  }
  return newData;
}

let transformedData = averageData(data);

console.log(transformedData);

let container = document.getElementById("container");

for(let i = transformedData.length - 1; i >= 0; i--){

  let datapoint = transformedData[i];
  let floor = datapoint.name;
  let popularity = datapoint.average;

  let bar = document.createElement("div");
  bar.className = "bar";
  barWidth = popularity * 85;
  bar.style.width = barWidth + "px";

  let barname = document.createElement("p");
  barname.innerHTML = floor;

  bar.appendChild(barname);
  container.appendChild(bar);


}
