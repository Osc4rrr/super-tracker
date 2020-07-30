//Variables

const campo_presupuesto = document.querySelector('.presupuesto');
const campo_dinero_entrante = document.querySelector('.dinero_entrante');
const campo_dinero_gastado = document.querySelector('.dinero_gastado');

const form_agregar_abono = document.getElementById('agregar_abono');
const form_descontar_abono = document.getElementById('descontar_abono');

const error = document.querySelector('#error small');
const error_descuento = document.querySelector('#error_descuento small');

const porcentaje = document.getElementById('porcentaje');

let presupuesto_tot;

//Clases

class Presupuesto {
    constructor(presupuesto, presupuesto_actual, dinero_gastado, porcentaje_disponible){
        this.presupuesto = Number(presupuesto),
        this.presupuesto_actual = Number(presupuesto_actual), 
        this.dinero_gastado = Number(dinero_gastado), 
        this.porcentaje_disponible = Number(porcentaje_disponible)
    }

    presupuestoTotal(cantidad_presupuesto){ 
        return this.presupuesto += Number(cantidad_presupuesto);
    }

    presupuestoGastado(cantidad_descuento){
        return this.dinero_gastado += Number(cantidad_descuento);
    }

    pres_actual(presupuesto, dinero_gastado){
        return this.presupuesto_actual = presupuesto - dinero_gastado
    }

    porc_actual(presupuesto, dinero_gastado){
        return this.porcentaje_disponible = (dinero_gastado*100) / presupuesto;
    }
}

//Clase interfaz usuario

class Interfaz{
    insertarAbonoDinero(dinero_abono){
        console.log(dinero_abono)
        campo_dinero_entrante.innerHTML = `$${dinero_abono}`;
    }

    insertarDescuento(dinero_descuento){
        campo_dinero_gastado.innerHTML = `$${dinero_descuento}`;
    }

    imprimirMensaje(mensaje, tipo){

        if(tipo == 'error_abono'){
            error.classList.add('error_abono'); 
            error.innerHTML = mensaje;
        }else{
            error.classList.add('correcto'); 
            error.innerHTML = mensaje
        }
    }

    agregarGastoListado(nombre_abono, cantidad_abono, clase){ 
        const abonos = document.querySelector('.cont-historial ul'); 

        const li = document.createElement('li');

        li.innerHTML = `
            ${nombre_abono}<span class="${clase}">$${cantidad_abono}</span>
        `; 

        abonos.appendChild(li);
    }

    presupuestoActual(valor_abono){
        presupuesto = new Presupuesto();
        const pres_total = presupuesto.presupuestoTotal(valor_abono);
        console.log(pres_total);
        console.log(presupuesto);
    }
}

//Event Listeners

document.addEventListener('DOMContentLoaded', function(){
    console.log(campo_dinero_gastado);

    campo_presupuesto.innerHTML = 0;
    campo_dinero_entrante.innerHTML = 0;
    campo_dinero_gastado.innerHTML = 0;
    let porc; 
    porc = 0; 
    porcentaje.innerHTML = `${porc}%`;

    presupuesto_tot = new Presupuesto(0,0,0);
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

form_agregar_abono.addEventListener('submit', function(e){
    e.preventDefault();

    const nombre_abono = document.getElementById('txtNombreAbono').value; 
    const valor_abono = document.getElementById('txtValorAbono').value;

    if (nombre_abono == '' || valor_abono == ''){

        const ui = new Interfaz();

        ui.imprimirMensaje('Por Favor Completa Ambos Campos', 'error_abono');

        setTimeout(() => {
            error.innerHTML = ``;
        }, 1000);

        return;
    }else{
        presupuesto = new Presupuesto();
        const ui = new Interfaz();

        //ui.insertarAbonoDinero(presupuesto.presupuesto, presupuesto.presupuesto_actual)

        ui.imprimirMensaje('Dinero Agregado Correctamente', 'correcto');

        setTimeout(() => {
            error.innerHTML = ``;
        }, 1000);

        presupuesto_total = presupuesto_tot.presupuestoTotal(Number(valor_abono)); 

        new_presupuesto_total = numberWithCommas(presupuesto_total);
        console.log(presupuesto_total)

        new_abono = numberWithCommas(valor_abono);

        //agregar Gastos a la lista

        ui.agregarGastoListado(nombre_abono, new_abono, 'correcto')
        ui.insertarAbonoDinero(new_presupuesto_total);

        presu = presupuesto_tot.presupuesto;
        presu_gastado = presupuesto_tot.dinero_gastado; 

        presupuesto_actual = presupuesto_tot.pres_actual(Number(presu), Number(presu_gastado))

        new_presupuesto = numberWithCommas(presupuesto_actual);
        campo_presupuesto.innerHTML = `$${new_presupuesto}`;

        porc_actual = presupuesto_tot.porc_actual(Number(presu), Number(presu_gastado))

        porcentaje.innerHTML = `${porc_actual.toFixed(1)}%`;

        form_agregar_abono.reset();
        console.log(porc_actual)
    }
    

}); 

form_descontar_abono.addEventListener('submit', function(e){
    e.preventDefault();
    const nombre_Descuento = document.getElementById('txtDescuento').value; 
    const valor_descuento = document.getElementById('txtValorDescuento').value;

    if(nombre_Descuento == '' || valor_descuento == ''){

        error_descuento.classList.add('error_abono'); 
        error_descuento.innerHTML = `Por Favor Completa Ambos Campos`;

        setTimeout(() => {
            error_descuento.innerHTML = ``;
        }, 1000);

        return;
    } else{
        const ui = new Interfaz();

        error_descuento.classList.add('correcto'); 
        error_descuento.innerHTML = `Descuento Agregado Correctamente`;

        setTimeout(() => {
            error_descuento.innerHTML = ``;
        }, 1000);

        new_descuento = numberWithCommas(valor_descuento);

        ui.agregarGastoListado(nombre_Descuento, new_descuento, 'error')
    
        presupuesto_gastado = presupuesto_tot.presupuestoGastado(Number(valor_descuento)); 
        new_descuento_presupuesto = numberWithCommas(presupuesto_gastado);
        ui.insertarDescuento(new_descuento_presupuesto)
    
        console.log(presupuesto_tot)
    
        presu = presupuesto_tot.presupuesto;
        presu_gastado = presupuesto_tot.dinero_gastado; 
    
        presupuesto_actual = presupuesto_tot.pres_actual(Number(presu), Number(presu_gastado))

        porc_actual = presupuesto_tot.porc_actual(Number(presu), Number(presu_gastado))
        
        new_presupuesto_total = numberWithCommas(presupuesto_actual);
        campo_presupuesto.innerHTML = `$${new_presupuesto_total}`;
    
        console.log(porc_actual)

        porcentaje.innerHTML = `${porc_actual.toFixed(1)}%`;

        form_descontar_abono.reset();
    }
}); 

