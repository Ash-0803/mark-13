birthday = document.querySelector('#birthday-input');
btn = document.querySelector('#check');
palindromeOutput = document.querySelector('#palindrome');
nearestOutput = document.querySelector('#guess')


function isPalindrome(dateObject){
  const Formats = convertToAllFormats(dateObject);

  for(const format in Formats){
    str = Formats[format]
  
    if(str === str.split('').reverse().join('')){
      return true;
    }
  }
}
function convertToAllFormats(dateObject){
  if(typeof(dateObject.day)!= 'string'){
    dateObject = convertToString(dateObject);
  }
  const Formats = {
    yyyymmdd : dateObject.year + dateObject.month + dateObject.day, 
    mmddyyyy : dateObject.month + dateObject.day + dateObject.year,
    ddmmyyyy : dateObject.day + dateObject.month + dateObject.year,
    ddmmyy : dateObject.day + dateObject.month + dateObject.year.slice(-2),
    mmddyy : dateObject.month + dateObject.day + dateObject.year.slice(-2),
    yymmdd : dateObject.year.slice(-2) + dateObject.month + dateObject.day
  }
  return Formats
}

function convertToString(dateObject) {
    for(const key in dateObject ){
      dateObject[key] = dateObject[key].toString()
      if (dateObject[key]<10){
        dateObject[key] = '0' + dateObject[key];
      }
    }
  return dateObject;
}

function isLeapYear(year){
  if(year%4==0 && year%100!=0 || year%400==0){
    daysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31]
  }
  else daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  return daysInMonth;
}

function findNearest(dateObject){

  while(!isPalindrome(dateObject)){
    let vday = parseInt(dateObject.day);
    let vmonth = parseInt(dateObject.month);
    let vyear = parseInt(dateObject.year);

    const daysInMonth = isLeapYear(vyear)
    if(vday <= daysInMonth[vmonth-1]){
      vday ++;
    }
    else {
      vmonth++;
      vday = 1;
    }
    if(vmonth > 12){vyear++; vmonth=1; vday=1}
    dateObject.day = vday;
    dateObject.month = vmonth;
    dateObject.year = vyear;
  }
  return dateObject;
  }

function createObject(date){
  
  let dateObject = {
    year : date.slice(0,4),
    month : date.slice(5,7),
    day : date.slice(8,10)
  };
  return dateObject;
};


function run(){
  let date = birthday.value;
  let dateObject = createObject(date);

  if (isPalindrome(dateObject)) console.log('your birthday is a palindrome !!!\n',dateObject)
  else {console.log("the nearest birthday to that of yours is: ",findNearest(dateObject))}

}

btn.addEventListener("click",run);