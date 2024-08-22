let countryCount={}



fetch('http://universities.hipolabs.com/search ')  
.then(response => {console.log(response)
    return response.json();
}) 
.then(data =>{
    // console.log("Data", data);
    data.forEach(item=>{
        let country= item.country;
        if(countryCount[country]){
            countryCount[country]++;
        }else{
            countryCount[country]=1;
        }
    });
    console.log("University Count by country", countryCount)

let min=Infinity;
let max=0;
let minCountry='';
let maxCountry='';
let arr=[];

Object.keys(countryCount).forEach(
    country => {
        let count = countryCount[country];
        if(count<min){
            min=count;
            minCountry=country;
        }
        if(count>max){
            max=count;
            maxCountry=country;}
        });

        
        console.log("Country with Min count of uni", minCountry , min)
console.log("Country with Max Count of uni", maxCountry , max)
Object.keys(countryCount).forEach(
    country=>{
        if(minCountry[min]==min){
            arr.push(minCountry);
        }

    });
    console.log("Country with Min count of uni", arr , min)
})
.catch(error => { console.log("Error occured" , error) });
