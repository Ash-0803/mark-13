birthday = document.querySelector('#birthday-input');
btn = document.querySelector('#check');
palindromeOutput = document.querySelector('#palindrome');
nearestOutput = document.querySelector('#guess')


function isPalindrome(dateObject){
  const Formats = convertToAllFormats(dateObject);
  let flag = false;

  for(const format in Formats){
    str = Formats[format]
  
    if(str === str.split('').reverse().join('')){
      flag = true;
      return flag;
    }
  }
  if(flag!=true) findNearest(dateObject)
}
function convertToAllFormats(dateObject){
  dateObject = convertToString(dateObject);
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
  if(typeof(dateObject)!= 'string'){
    for(const key in dateObject ){
      if (dateObject[key]<10){
        dateObject[key] = '0' + dateObject[key];
      }
    }
  }
  return dateObject;
}

function findNearest(dateObject){
  day = parseInt(dateObject.day);
  month = parseInt(dateObject.month);
  year = parseInt(dateObject.year);
  
  function isLeapYear(year){
    if(year%4==0 && year%100!=0 || year%400==0){
      days = [31,29,31,30,31,30,31,31,30,31,30,31]
    }
    else daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
  }

  while(!isPalindrome(dateObject)){
    isLeapYear(year)
    if(daysInMonth[parseInt(month)-1]!=day){
      day ++;
    }
    else month++; day = 1;
    if(month > 12){year++; month=1; day=1}
    dateObject.day = day;
    dateObject.month = month;
    dateObject.year = year;
  }
  console.log(isPalindrome(dateObject),dateObject)
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
  const dateObject = createObject(date);

  if (isPalindrome(dateObject)) console.log('it is a palindrome')
}

btn.addEventListener("click",run);