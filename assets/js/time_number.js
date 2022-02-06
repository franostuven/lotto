const d = document;

export  function upNumberTime(btn, clsTime, clsNumbers, array1, array2){
    let timeD ;
    d.addEventListener("click", (e) =>{

        console.log("Me diste click");
        console.log(array1);
        console.log(array2);

        return
        if(e.target.matches(btn) ){
            
            
            const d = new Date();
            let text = d.toDateString();
        }

        // Desactiva el Reloj
        if(e.target.matches(btnStop) ){

            clearInterval(reloj);
            d.querySelector(clock).innerHTML ='';
            d.querySelector(btnPlay).disabled = false;
        }

        // if(e.target.matches(boton) ||  e.target.matches(`${menuLink} *`)){
        //     d.querySelector(panel).classList.remove('is-active');   // tambien se puede usar toggle
        //     d.querySelector(panelBtn).classList.remove('is-active');
        // }
      
    });

}

export function alarma(sonido, btnPlay, btnStop){
    let alarmTiempo;
    const $alarm = d.createElement("audio");
    $alarm.src = sonido;
    d.addEventListener("click", e =>{

        if(e.target.matches(btnPlay) ){
            alarmTiempo = setTimeout( () =>{
                $alarm.play();
            },2000);
            e.target.disabled = true;
        }

        if(e.target.matches(btnStop) ){
            clearTimeout(alarmTiempo);
            $alarm.pause();
            $alarm.currentTime = 0;
            d.querySelector(btnPlay).disabled = false;
        }
    })

}
