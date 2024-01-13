import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import Formulario from '../components/Formulario'
import '@testing-library/jest-dom/extend-expect'

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


test('<Formulario/> Validación del formulario', ()=>{

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