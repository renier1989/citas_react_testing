import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("<App/> Aplicacion Carga bien la primera vez", () => {
    // const wrapper = render(<App/>);
    // wrapper.debug();
    render(<App />);

    expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
    expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes');
    expect(screen.getByTestId('nombre-app').tagName).toBe('H1');

    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
    expect(screen.getByText('No hay citas')).toBeInTheDocument();
    
});

test('<App /> Aplicacion validando que al crear una cita el nombre dinamico haya cambiado', () => { 
    // renderizamos la aplicacion
    render(<App/>);

    // cargamos el formulario
    userEvent.type(screen.getByTestId('mascota'),'nombre de la mascota');
    userEvent.type(screen.getByTestId('propietario'),'nombre del  propietario');
    userEvent.type(screen.getByTestId('fecha'),'2020-10-10');
    userEvent.type(screen.getByTestId('hora'),'10:10');
    userEvent.type(screen.getByTestId('sintomas'),'Sintomas de la mascota');

    // simulamos el click del formulario
    const buttonSubmit = (screen.getByTestId('btn-submit'))
    userEvent.click(buttonSubmit);

    // compruebo que no este la alerta , la alerta puede o no existir en el documento por lo que se debe usar el query
    expect(screen.queryByTestId('alerta')).not.toBeInTheDocument();

    // compruebo que el nombre dinamico de la cita haya cambiado, indicando que si se añadio una cita nueva
    expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas');


})
