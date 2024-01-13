import React from 'react';
import {fireEvent, getByTestId, render, screen} from '@testing-library/react'
import Formulario from '../components/Formulario'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn();

test("<Formulario/> Carga del formulario y revisando funcionamiento", () => {
    //  // esto es para ver que el componente se monto de forma correcta 
    // const wrapper = render(<Formulario />);
    // // con esto muestro en la consola todo el codigo HTML
    // wrapper.debug();

    // // esto es un metodo mas viejo que comprobar que algo esta en la pantalla
    // const {getByText} = render(<Formulario />)
    // expect( getByText('Crear Cita') ).toBeInTheDocument();

    // aqui el componente de Formulario espera una propiedad que es crearCita, se pueden crear funcion Spy con Jest. para simular esa funcionalidad 

    render(<Formulario crearCita={crearCita} />)

    // Heading
    const title =  screen.getByTestId('titulo');
    expect( screen.getByText('Crear Cita') ).toBeInTheDocument(); // para buscar algo por texto en el documento
    expect( title.tagName).toBe('H2'); // para evaluar el tag que tengo el identificador en el Html data-testid
    expect( title.tagName).not.toBe('H1'); // para evaluar que no sea algo con un identificador
    expect( title.textContent).toBe('Crear Cita'); // para evaluar el contenido de texto con un identificador

    // Button Submit
    expect( screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
    expect( screen.getByTestId('btn-submit').textContent).toBe('Agregar Cita');
    expect( screen.getByTestId('btn-submit').textContent).not.toBe('Agregar Nueva Cita');

});


test('<Formulario/> Validación del formulario con formulario Vacio', ()=>{

    render(<Formulario crearCita={crearCita} />);

    const buttonSubmit = screen.getByTestId('btn-submit');
    fireEvent.click(buttonSubmit); // dispara un evento en el formulario que es el de dar un click

    // reviso que al dar el click exista el mensaje de la alerta, asigno un identificador de prueba
    const alerta = screen.getByTestId('alerta');
    expect(alerta).toBeInTheDocument(); 
    // aqui como previamente se simulo un click al formulario , se espera la alerta
    expect(alerta.textContent).toBe('Todos los campos son obligatorios'); 
    expect(alerta.tagName).toBe('P'); 
    
})

test('<Formulario /> Validación del formulario con datos', ()=>{
    render(<Formulario crearCita={crearCita} />);

    // // esta es la forma en la que antes se podia escribir en los formularios
    // // simulacion de carga de un formulario
    // fireEvent.change(screen.getByTestId('mascota'),{
    //     target: {value: 'nombre de la mascota'}
    // })
    // fireEvent.change(screen.getByTestId('propietario'),{
    //     target: {value: 'nombre del propietario'}
    // })

    userEvent.type(screen.getByTestId('mascota'), 'Nombre de la mascota');
    userEvent.type(screen.getByTestId('propietario'), 'Nombre del Propietario');
    userEvent.type(screen.getByTestId('fecha'), '2024-01-01');
    userEvent.type(screen.getByTestId('hora'), '12:12');
    userEvent.type(screen.getByTestId('sintomas'), 'Sintomas de la mascota');

    // simulacion de un click en el formulario
    const buttonSubmit = screen.getByTestId('btn-submit');
    // fireEvent.click(buttonSubmit);
    userEvent.click(buttonSubmit);

    // si todo el formulario esta lleno no esperamos que la alerta este en el documento
    // cuanda sabemos que un elemento siempre va a existir en el documento usamos el inicio del metodo "get"
    // pero cuando es un elemento que esta condicionado y puede o no existir se usa el inicio del metodo con "query"
    const alerta = screen.queryByTestId('alerta');
    expect(alerta).not.toBeInTheDocument()

    //AQUI COMPROBAMOS QUE LA FUNCION DE CREAR CITA HAYA SIDO LLAMDADA
    expect(crearCita).toHaveBeenCalled(); // que haya sido llamada
    expect(crearCita).toHaveBeenCalledTimes(1); // que haya sido llamada


});