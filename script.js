birthday = document.querySelector('#birthday-input');
btn = document.querySelector('#check');
palindromeOutput = document.querySelector('#palindrome');


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
  flag = true;
  nextDateObject = {...dateObject,count:0};
  prevDateObject = {...dateObject,count:0};

  while(flag){
    nextDateObject = findNextDate(nextDateObject);
    if(isPalindrome(nextDateObject)){
      nearestDate = {...nextDateObject,tense:"future"};
      flag = false;
    }

    prevDateObject =  findPreviousDate(prevDateObject);
    if(isPalindrome(prevDateObject)){
      nearestDate = {...prevDateObject,tense:"past"};
      flag = false;
    }
  }
  return nearestDate;
}

function findNextDate(nextDateObject){
  let vday = parseInt(nextDateObject.day);
  let vmonth = parseInt(nextDateObject.month);
  let vyear = parseInt(nextDateObject.year);

  const daysInMonth = isLeapYear(vyear)
  if(vday <= daysInMonth[vmonth-1]){
    vday ++;
  }
  else {
    vmonth++;
    vday = 1;
  }
  if(vmonth > 12){vyear++; vmonth=1; vday=1}
  nextDateObject.day = vday;
  nextDateObject.month = vmonth;
  nextDateObject.year = vyear;
  nextDateObject.count ++;
  return nextDateObject;
}
function findPreviousDate(prevDateObject){
  let vday = parseInt(prevDateObject.day);
  let vmonth = parseInt(prevDateObject.month);
  let vyear = parseInt(prevDateObject.year);

  const daysInMonth = isLeapYear(vyear)
  if(vday > 0){
    vday --;
  }
  else {
    vmonth--;
    vday = daysInMonth[vmonth-2];
  }
  if(vmonth < 1){vyear--; vmonth=12; vday=31}
  prevDateObject.day = vday;
  prevDateObject.month = vmonth;
  prevDateObject.year = vyear;
  prevDateObject.count ++;
  return prevDateObject;
}
  
function createObject(date){
  date = date.split('-');
  let dateObject = {
    year : date[0],
    month : date[1],
    day : date[2]
  };
  return dateObject;
};

function run(){
  let date = birthday.value;
  let dateObject = createObject(date);

  if (isPalindrome(dateObject)) console.log('your birthday is a palindrome !!!\n',dateObject)
  else {
    nearestDate = findNearest(dateObject);
    
    
    palindromeOutput.innerText = nearestDate.count + `${ nearestDate.tense=="future"?" days to go for the nearest palindrome": " days before was the nearest palindrome"}`;


  }

}

btn.addEventListener("click",run);