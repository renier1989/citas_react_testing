import React from 'react';
import {render, screen} from '@testing-library/react'
import Formulario from '../components/Formulario'
import '@testing-library/jest-dom/extend-expect'

test("<Formulario/> Carga del formulario y revisando funcionamiento", () => {
    //  // esto es para ver que el componente se monto de forma correcta 
    // const wrapper = render(<Formulario />);
    // // con esto muestro en la consola todo el codigo HTML
    // wrapper.debug();

    // // esto es un metodo mas viejo que comprobar que algo esta en la pantalla
    // const {getByText} = render(<Formulario />)
    // expect( getByText('Crear Cita') ).toBeInTheDocument();

    
    render(<Formulario />)

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
