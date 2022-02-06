
const d = document,
    numbers = [],
    euroNumbers=[];

let dato,odds ={},
   dateDrawin = '';


const params = {'HTTP_CONTENT_LANGUAGE': self.language};
 let config = { headers: { 'Access-Control-Allow-Origin: ': '',
                           'Access-Control-Allow-Credentials:': true,
                           'Access-Control-Max-Age': '86400',
                           'Access-Control-Allow-Methods': 'GET, POST' } } ;

d.addEventListener("DOMContentLoaded",(e) => {

    ( async()=> {
        
        //   await axios.get('http://www.lottoland.com/api/drawings/euroJackpot',params, config)              
        await axios.get('http://127.0.0.1:5500/assets/js/api.json')
            .then(response=>{
            dato = response.data;
             })
             .then( ()=> {
            // --------------------------------------------- numbers drawin

            for (let index = 0; index <10; index++) {
        
                if(dato.last.numbers[index] !== undefined){
                    numbers.push(dato.last.numbers[index])
                }else{
                    break
                }
            }  	

            // ---------------------------------------------- eruro Number drawin
            for (let index = 0; index <10; index++) {
            
                if(dato.last.euroNumbers[index] !== undefined){
                  euroNumbers.push(dato.last.euroNumbers[index])
                }else{
                  break
                }
            }  	


            // ------------------------------------------------------ date drawin
            const year =  dato.last.date.year,
                 month =   dato.last.date.month === 0 ? 0 : dato.last.date.month -1 ,
                 day =  dato.last.date.day ;
            dateDrawin = new Date( year, month, day).toDateString();
            console.log(year, month, day)
            console.log(dateDrawin)

            // ------------------------------------------------------ extract win person

            odds = dato.last.odds;
            console.log('Cant ganadores :',odds);

        })
        .catch(function (error) {
            console.log(error.response);
        })
        
    })();
    


    d.addEventListener("click", (e) =>{
        if(e.target.matches('#results') ){
            upNumberTime('#results', '.drawinDate', '.numbersWin', numbers, euroNumbers, dateDrawin);
    //        const grillDrawin = fillTable(odds);
            paintDrawin(fillTable(odds),'#tBodyDrawin');
                
        }
    });



    function upNumberTime(btn, clsTime, clsNumbers, array1, array2, dateDrawin){

        d.querySelector(clsTime).innerHTML += dateDrawin;
        d.querySelector(clsNumbers).innerHTML = array1 + ' + ' + array2;
    }

           
    function fillTable(odds){
        newOdds = [];

        for (const key in odds) {
            if (Object.hasOwnProperty.call(odds, key)) {
                newOdds.push( odds[key]);
            }
        }
        
        console.log('New ',newOdds);
        const result = newOdds.filter(el=> el.prize !== 0);
        
        result.sort(function (a, b) {
        if (a.winners > b.winners) {
            return 1;
        }
        if (a.winners < b.winners) {
            return -1;
        }
        return 0;
        });

        console.log('Ordenado ',result);

        return result;
    }



    const paintDrawin = ((obj, idTable) => {


    });

/* 
            {"rank5": {
                "winners": 858,
                "specialPrize": 0,
                "prize": 22530
                }
            }  
             */
            // Desactiva el Reloj
            // if(e.target.matches(btnStop) ){

            //     clearInterval(reloj);
            //     d.querySelector(clock).innerHTML ='';
            //     d.querySelector(btnPlay).disabled = false;
            // }

            // if(e.target.matches(boton) ||  e.target.matches(`${menuLink} *`)){
            //     d.querySelector(panel).classList.remove('is-active');   // tambien se puede usar toggle
            //     d.querySelector(panelBtn).classList.remove('is-active');
            // }
 


    /*  save to localstoracge */

    if (localStorage.getItem('darkTheme')) {
        let darkTheme = JSON.parse(localStorage.getItem('darkTheme'))
        
        console.log('LOCAL ENCONTRADO',darkTheme)
        const $themeBtn = d.querySelector(".dark-theme-btn"),
            $selectors=d.querySelectorAll("[data-dark]");

        if(darkTheme === "🌙"){
            $selectors.forEach(el => el.classList.add("dark-mode"));
            $themeBtn.textContent = "☀️";
        }else {
            $selectors.forEach(el => el.classList.remove("dark-mode"));
            $themeBtn.textContent =  "🌙";
            
        }
        
    }



})