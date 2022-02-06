
const d = document,
    numbers = [],
    euroNumbers=[];

let dato,odds ={},
   dateDrawin = '';

const match = ['5 numbers + 2 Euronumbers', '5 numbers + 1 Euronumbers','5 numbers + 0 Euronumbers', '4 numbers + 2 Euronumbers',
               '4 numbers + 1 Euronumbers', '4 numbers + 0 Euronumbers','3 numbers + 2 Euronumbers', '2 numbers + 2 Euronumbers',
               '3 numbers + 1 Euronumbers', '3 numbers + 0 Euronumbers','1 numbers + 2 Euronumbers', '2 numbers + 1 Euronumbers'];

const roman = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

const params = {'HTTP_CONTENT_LANGUAGE': self.language};
 let config = { headers: { 'Access-Control-Allow-Origin: ': '',
                           'Access-Control-Allow-Credentials:': true,
                           'Access-Control-Max-Age': '86400',
                           'Access-Control-Allow-Methods': 'GET, POST' } } ;

d.addEventListener("DOMContentLoaded",(e) => {

    ( async()=> {
        
            //  *****************  CON AJAX *****************
            // const xhr = new XMLHttpRequest();
            // xhr.addEventListener('readystatechange',e=>{
            //     if(xhr.readyState !== 4) return;

            //     if(xhr.status >= 200 && xhr.status <300){
            //         let json =  JSON.parse(xhr.responseText);
            //         console.log(json);
            //
            //         // codigo para llenar el html
            //     }

            // })

            // xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
            // xhr.send();

            // -----------------------------------------------------------------------
                // ***************** CON FETCH JS   *****************

               // const api =  () => {
            //     try {
            //        // const res = await fetch('http://www.lottoland.com/api/drawings/euroJackpot')
            //        // const data = await res.json();
            //         console.log(data);
            //     } catch (err) {
            //         let message = err.statusText || "Ocurrio un error";
            //     }
            // }

            // *****************  CON AXIOS *****************

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
     //       console.log(year, month, day)
      //      console.log(dateDrawin)

            // ------------------------------------------------------ extract win person

            odds = dato.last.odds;
 //           console.log('Cant ganadores :',odds);

        })
        .catch(function (error) {
            console.log(error.response);
        })
        
    })();
    


    d.addEventListener("click", (e) =>{
        if(e.target.matches('#results') ){
            upNumberTime('#results', '.drawinDate', '.numbersWin', numbers, euroNumbers, dateDrawin);
    //        const grillDrawin = fillTable(odds);
            paintDrawin(fillTable(odds),'tBodyDrawin');
                
        }
    });



    function upNumberTime(btn, clsTime, clsNumbers, array1, array2, dateDrawin){

        d.querySelector(clsTime).innerHTML += dateDrawin;

        let len = array1.length;
        let firts = 1;
        let separador = '-';

        d.querySelector(clsNumbers).innerHTML = '';
        
        array1.forEach(el=> {
            if(firts===len) separador = '' ;
            d.querySelector(clsNumbers).innerHTML += ` ${el} ${separador}`;
            firts++
        })
        d.querySelector(clsNumbers).innerHTML +=' +';

        firts = 1;
        len = array2.length;
        separador = '-';

        array2.forEach( el=>{
            if(firts===len) separador = '';
            d.querySelector(clsNumbers).innerHTML += ` ${el} ` + separador;
            firts++
        })
      //  d.querySelector(clsNumbers).innerHTML = array1 + ' + ' + array2;
    }

           
    function fillTable(odds){
        let newOdds = [];
        
        for (const key in odds) {
            if (Object.hasOwnProperty.call(odds, key)) {
                newOdds.push( odds[key]);
            }
        }
        
      //  console.log('New ',newOdds);
        const result = newOdds.filter(el=> el.prize !== 0);
        
        result.sort(function (a, b) {
            if (a.prize > b.prize) {
                return -1;
            }
            if (a.prize < b.prize) {
                return 1;
            }
            return 0;
        });

       // console.log('sorted ',result);

        return result;
    }

    const paintDrawin = ((obj, idTable) => {
        const config = { style: 'currency', currency: 'EUR' };

        const $fragment = d.createDocumentFragment();
        const $tbody = d.getElementById(idTable);
        let kont = 0;

        obj.forEach(el =>{
            const prize = el.prize /100 ;
            const $tr = d.createElement("tr");
            const $tdTier = d.createElement("td");
            const $tdMatch = d.createElement("td");
            const $tdWin = d.createElement("td");
            const $tdAmo = d.createElement("td");

            $tdTier.innerHTML = roman[kont];
            $tdMatch.innerHTML = match[kont];
            $tdWin.innerHTML = el.winners;
            $tdAmo.innerHTML = prize.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });

            // console.log($tdTier);
            // console.log($tdMatch);
            // console.log($tdWin);
            // console.log($tdAmo);
            
            $tr.appendChild($tdTier);
            $tr.appendChild($tdMatch);
            $tr.appendChild($tdWin);
            $tr.appendChild($tdAmo);
            $fragment.appendChild($tr);
                      
            kont++
        })

        $tbody.appendChild($fragment);
    });



    const options2 = { style: 'currency', currency: 'EUR' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);
    
        
 
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